import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { 
  S3Client, 
  PutObjectCommand, 
  GetObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { promisify } from 'util';

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

@Injectable()
export class StorageService {
  private s3Client: S3Client;
  private bucket: string;
  private endpoint: string;
  private localStoragePath: string;
  private readonly logger = new Logger(StorageService.name);

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('DO_SPACES_REGION');
    this.endpoint = this.configService.get<string>('DO_SPACES_ENDPOINT');
    this.bucket = this.configService.get<string>('DO_SPACES_BUCKET');
    this.localStoragePath = this.configService.get<string>('LOCAL_STORAGE_PATH') || 'uploads';
    
    this.logger.log(`Initializing storage with: Region=${region}, Endpoint=${this.endpoint}, Bucket=${this.bucket}, LocalPath=${this.localStoragePath}`);

    try {
      this.s3Client = new S3Client({
        region,
        endpoint: `https://${this.endpoint}`,
        credentials: {
          accessKeyId: this.configService.get<string>('DO_SPACES_KEY'),
          secretAccessKey: this.configService.get<string>('DO_SPACES_SECRET'),
        },
      });
      this.logger.log('S3 client initialized successfully');
      
      // Ensure local storage directory exists
      this.ensureLocalStorageDirectory();
    } catch (error) {
      this.logger.error(`Failed to initialize storage: ${error.message}`);
      throw error;
    }
  }

  private async ensureLocalStorageDirectory(): Promise<void> {
    try {
      if (!fs.existsSync(this.localStoragePath)) {
        await mkdir(this.localStoragePath, { recursive: true });
        this.logger.log(`Created local storage directory: ${this.localStoragePath}`);
      }
    } catch (error) {
      this.logger.error(`Failed to create local storage directory: ${error.message}`);
    }
  }

  /**
   * Upload a file to both Digital Ocean Spaces and local storage
   */
  async uploadFile(file: Express.Multer.File, path: string): Promise<string> {
    if (!file) {
      throw new Error('No file provided');
    }

    const fileName = this.sanitizeFileName(file.originalname);
    const timestamp = Date.now();
    const key = `${path}/${timestamp}-${fileName}`;
    
    this.logger.log(`Uploading file: ${fileName} to path: ${key}`);

    try {
      // 1. Upload to Digital Ocean Spaces
      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype,
      });

      await this.s3Client.send(command);
      
      // 2. Save locally as backup
      await this.saveFileLocally(file.buffer, key);
      
      // Construct URL in DO Spaces format
      const fileUrl = `https://${this.bucket}.${this.endpoint}/${key}`;
      this.logger.log(`File uploaded successfully. URL: ${fileUrl}`);
      
      return fileUrl;
    } catch (error) {
      this.logger.error(`Error uploading file: ${error.message}`);
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  /**
   * Save file to local storage as backup
   */
  private async saveFileLocally(fileBuffer: Buffer, key: string): Promise<void> {
    try {
      // Create directory structure if it doesn't exist
      const filePath = path.join(this.localStoragePath, key);
      const directory = path.dirname(filePath);
      
      if (!fs.existsSync(directory)) {
        await mkdir(directory, { recursive: true });
      }
      
      // Write file to local storage
      await writeFile(filePath, fileBuffer);
      this.logger.log(`File saved locally at: ${filePath}`);
    } catch (error) {
      // Don't fail the whole operation if local storage fails
      this.logger.error(`Failed to save file locally: ${error.message}`);
    }
  }

  /**
   * Update an existing file - delete old one and upload new one
   */
  async updateFile(file: Express.Multer.File, oldKey: string): Promise<string> {
    if (!file) {
      throw new Error('No file provided');
    }

    this.logger.log(`Updating file with key: ${oldKey}`);

    // Try to delete the old file if it exists
    try {
      await this.deleteFile(oldKey);
      this.logger.log(`Old file deleted: ${oldKey}`);
    } catch (error) {
      this.logger.warn(`Could not delete old file (may not exist): ${error.message}`);
    }

    // Extract the path from the old key
    const pathParts = oldKey.split('/');
    pathParts.pop();
    const dirPath = pathParts.join('/');
    
    // Upload the new file
    return this.uploadFile(file, dirPath);
  }

  /**
   * Delete a file from both Digital Ocean Spaces and local storage
   */
  async deleteFile(key: string): Promise<void> {
    this.logger.log(`Deleting file: ${key}`);
    
    try {
      // 1. Delete from Digital Ocean Spaces
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      await this.s3Client.send(command);
      this.logger.log(`File deleted from Digital Ocean: ${key}`);
      
      // 2. Delete from local storage if it exists
      await this.deleteFileLocally(key);
    } catch (error) {
      this.logger.error(`Error deleting file: ${error.message}`);
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  /**
   * Delete file from local storage
   */
  private async deleteFileLocally(key: string): Promise<void> {
    try {
      const filePath = path.join(this.localStoragePath, key);
      
      if (fs.existsSync(filePath)) {
        await unlink(filePath);
        this.logger.log(`File deleted locally: ${filePath}`);
      }
    } catch (error) {
      // Don't fail the whole operation if local deletion fails
      this.logger.error(`Failed to delete file locally: ${error.message}`);
    }
  }

  /**
   * Generate a signed URL for temporary access
   */
  async getSignedUrl(key: string, expiresIn = 3600): Promise<string> {
    this.logger.log(`Generating signed URL for: ${key}`);
    
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      return getSignedUrl(this.s3Client, command, { expiresIn });
    } catch (error) {
      this.logger.error(`Error generating signed URL: ${error.message}`);
      throw new Error(`Failed to generate signed URL: ${error.message}`);
    }
  }
  
  /**
   * Extract the file key from a full URL
   */
  extractKeyFromUrl(url: string): string {
    this.logger.log(`Extracting key from URL: ${url}`);
    
    const baseUrl = `https://${this.bucket}.${this.endpoint}/`;
    
    if (url && url.startsWith(baseUrl)) {
      const key = url.substring(baseUrl.length);
      this.logger.log(`Extracted key: ${key}`);
      return key;
    }
    
    this.logger.warn('URL format does not match expected pattern, returning as-is');
    return url;
  }

  /**
   * Check if a file exists
   */
  async fileExists(key: string): Promise<boolean> {
    try {
      const command = new HeadObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });
      
      await this.s3Client.send(command);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  /**
   * Sanitize filename to prevent issues
   */
  private sanitizeFileName(fileName: string): string {
    return fileName
      .replace(/\s+/g, '-')           
      .replace(/[^a-zA-Z0-9-_.]/g, '')
      .toLowerCase();
  }
}


