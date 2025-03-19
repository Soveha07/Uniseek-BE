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

    try {
      this.s3Client = new S3Client({
        region,
        endpoint: `https://${this.endpoint}`,
        credentials: {
          accessKeyId: this.configService.get<string>('DO_SPACES_KEY'),
          secretAccessKey: this.configService.get<string>('DO_SPACES_SECRET'),
        },
      });
      
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
      }
    } catch (error) {
      this.logger.error(`Failed to create local storage directory: ${error.message}`);
    }
  }

  async uploadFile(file: Express.Multer.File, path: string): Promise<string> {
    if (!file) {
      throw new Error('No file provided');
    }

    const fileName = this.sanitizeFileName(file.originalname);
    const timestamp = Date.now();
    const key = `${path}/${timestamp}-${fileName}`;

    try {
      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype,
      });

      await this.s3Client.send(command);
      
      const fileUrl = `https://${this.bucket}.${this.endpoint}/${key}`;
      return fileUrl;
    } catch (error) {
      this.logger.error(`Error uploading file: ${error.message}`);
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  async updateFile(file: Express.Multer.File, oldKey: string): Promise<string> {
    if (!file) {
      throw new Error('No file provided');
    }

    try {
      await this.deleteFile(oldKey);
    } catch (error) {
      // Silently continue if old file doesn't exist
    }

    const pathParts = oldKey.split('/');
    pathParts.pop();
    const dirPath = pathParts.join('/');
    return this.uploadFile(file, dirPath);
  }

  async deleteFile(key: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      await this.s3Client.send(command);
    } catch (error) {
      this.logger.error(`Error deleting file: ${error.message}`);
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  async getSignedUrl(key: string, expiresIn = 3600): Promise<string> {
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

  extractKeyFromUrl(url: string): string {
    const baseUrl = `https://${this.bucket}.${this.endpoint}/`;
    
    if (url && url.startsWith(baseUrl)) {
      return url.substring(baseUrl.length);
    }
    
    return url;
  }

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
  
  private sanitizeFileName(fileName: string): string {
    return fileName
      .replace(/\s+/g, '-')           
      .replace(/[^a-zA-Z0-9-_.]/g, '')
      .toLowerCase();
  }
}


