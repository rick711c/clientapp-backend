
import { Body, Controller, Get, Header, Injectable, Post, Query } from '@nestjs/common';

import { OTPService } from './otp.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('/otp')
export class OTPController {
  constructor(private readonly otpService: OTPService) {}

    @Public()
    @Post('/')
    async sendOtp(@Body('phoneNo') phoneNumber: string): Promise<void> {
        try {
          return this.otpService.sendOtp(phoneNumber);
            
        } catch (error) {
          throw new Error(`Failed to send OTP via Twilio: ${error.message}`);
        }
      }
 
}
