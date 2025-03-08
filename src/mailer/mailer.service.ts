import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
    private transporter: nodemailer.Transporter;

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.configService.get<string>('EMAIL_USER'),
                pass: this.configService.get<string>('EMAIL_PASS'),
            },
        });
    }

    async sendBookingMailMentor(
        to: string,
        studentName: string,
        bookingDay: string,
        bookingTime: string,
        studentEmail: string,
        studentPhone: string,
        mentorName: string
    ) {
        try {
            const htmlContent = `
            <div
                style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                <h1 style="color: #333; text-align: center;">📅 New Booking Request!</h1>
            
                <p style="font-size: 16px; color: #555;">Hello <strong>${mentorName}</strong>,</p>
            
                <p style="font-size: 16px; color: #555;">
                    You have received a new mentorship booking request from <strong>${studentName}</strong>.
                </p>
            
                <div style="background-color: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
                    <p style="margin: 5px 0; font-size: 16px;"><strong>📆 Date:</strong> ${bookingDay}</p>
                    <p style="margin: 5px 0; font-size: 16px;"><strong>⏰ Time:</strong> ${bookingTime}</p>
                    <p style="margin: 5px 0; font-size: 16px;"><strong>📧 Student Email:</strong> ${studentEmail}</p>
                    <p style="margin: 5px 0; font-size: 16px;"><strong>📞 Contact Number:</strong> ${studentPhone}</p>
                </div>
            
                <h2 style="color: #007bff; text-align: center;">🔗 Confirm the Session</h2>
                <p style="font-size: 16px; text-align: center;">
                    Please log in to your account and review the booking details.
                </p>
            
                <div style="text-align: center; margin-top: 20px;">
                    <a href="http://localhost:3000"
                        style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #fff; background-color: #28a745; text-decoration: none; border-radius: 5px;">
                        ✅ Confirm Now
                    </a>
                </div>
            
                <p style="font-size: 14px; color: #777; text-align: center; margin-top: 20px;">
                    Thank you for being a valued mentor! 🚀
                </p>
            </div>
            `;


            const mailOptions = {
                from: `"UniSeek - No reply" <${this.configService.get<string>('EMAIL_USER')}>`,
                to,
                subject: 'New Booking Alert',
                html: htmlContent,
            };

            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent:', info.messageId);
            return info;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }

    async sendBookingMailStudent(
        to: string,
        mentorName: string,
        mentorEmail: string,
        mentorPhone: string,
        bookingDay: string,
        bookingTime: string,
        studentName: string
    ) {
        try {
            const htmlContent = `
            <div
                style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">

                <h1 style="color: #333; text-align: center;">📩 Booking Request Sent!</h1>

                <p style="font-size: 16px; color: #555;">Hello <strong>${studentName}</strong>,</p>

                <p style="font-size: 16px; color: #555;">
                    Your mentorship session request with <strong>${mentorName}</strong> has been submitted successfully.
                </p>

                <p style="font-size: 16px; color: #ff9800; text-align: center;">
                    🚨 Your mentor has not confirmed yet. Please wait for their acceptance.
                </p>

                <div style="background-color: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
                    <p style="margin: 5px 0; font-size: 16px;"><strong>📆 Date:</strong> ${bookingDay}</p>
                    <p style="margin: 5px 0; font-size: 16px;"><strong>⏰ Time:</strong> ${bookingTime}</p>
                </div>

                <h2 style="color: #007bff; text-align: center;">📩 Stay Tuned for Updates</h2>
                <p style="font-size: 16px; text-align: center;">
                    Your mentor will review your request. Once they confirm, you'll receive another email with further details.
                </p>

                <p style="font-size: 14px; color: #777; text-align: center; margin-top: 20px;">
                    Thank you for using UniSeek! 🚀
                </p>
            </div>
          `;

            const mailOptions = {
                from: `"UniSeek - No reply" <${this.configService.get<string>('EMAIL_USER')}>`,
                to,
                subject: 'Booking Request Sent - Pending Confirmation',
                html: htmlContent, // Fix: Use 'html' instead of 'htmlContent'
            };

            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent:', info.messageId);
            return info;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }

    async sendBookingConfirmationStudent(
        to: string,
        studentName: string,
        mentorName: string,
        bookingDay: string,
        bookingTime: string,
        mentorEmail: string,
        mentorPhone: string,
        mentorTelegram: string
    ) {
        try {
            const htmlContent = `
            <div
                style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                
                <h1 style="color: #28a745; text-align: center;">🎉 Booking Confirmed!</h1>
            
                <p style="font-size: 16px; color: #555;">Hello <strong>${studentName}</strong>,</p>
            
                <p style="font-size: 16px; color: #555;">
                    Great news! Your mentorship session request with <strong>${mentorName}</strong> has been <span style="color: #28a745; font-weight: bold;">accepted</span>.
                </p>
      
                <div style="background-color: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
                    <p style="margin: 5px 0; font-size: 16px;"><strong>📆 Date:</strong> ${bookingDay}</p>
                    <p style="margin: 5px 0; font-size: 16px;"><strong>⏰ Time:</strong> ${bookingTime}</p>
                </div>
      
                <h2 style="color: #007bff; text-align: center;">👨‍🏫 Mentor Details</h2>
                <div style="background-color: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
                    <p style="margin: 5px 0; font-size: 16px;"><strong>📛 Name:</strong> ${mentorName}</p>
                    <p style="margin: 5px 0; font-size: 16px;"><strong>📧 Email:</strong> ${mentorEmail}</p>
                    <p style="margin: 5px 0; font-size: 16px;"><strong>📞 Contact Number:</strong> ${mentorPhone}</p>
                    <p style="margin: 5px 0; font-size: 16px;"><strong>📩 Telegram:</strong> ${mentorTelegram}</p>
                </div>
            
                <h2 style="color: #007bff; text-align: center;">🗓️ What’s Next?</h2>
                <p style="font-size: 16px; text-align: center;">
                    Your mentorship session is now confirmed. Please contact your mentor for the session.
                </p>
        
            
                <p style="font-size: 14px; color: #777; text-align: center; margin-top: 20px;">
                    Thank you for using UniSeek! 🚀
                </p>
            </div>
          `;

            const mailOptions = {
                from: `"UniSeek - No reply" <${this.configService.get<string>('EMAIL_USER')}>`,
                to,
                subject: '🎉 Booking Confirmed - Your Mentor Session',
                html: htmlContent,
            };

            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent:', info.messageId);
            return info;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }


}
