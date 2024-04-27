// twilio-auth.service.ts

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import * as dotenv from 'dotenv';
import { SaveOTPDto } from './dto/saveOTP.dto';
import { OTPRepository } from './otp.repository';
import { UtilService } from 'src/lib/utils/util.service';
import { ErrorMessages } from 'src/lib/enums/errorMessages.enum';
dotenv.config({ path: './.env' });

@Injectable()
export class OTPService {
  private readonly twilioClient: Twilio;

  constructor(
    private readonly OTPrepo: OTPRepository,
    private utilService: UtilService,
  ) {
    // Initialize Twilio client with your Twilio Account SID and Auth Token
    // this.twilioClient = new Twilio(
    //   process.env.TWILIO_ACCOUNT_SID,
    //   process.env.TWILIO_AUTH_TOKEN,
    // );
  }

  async sendOtp(phoneNumber: string, otp: string = '1234'): Promise<any> {
    try {
      //generate the otp

      //save the otp
      let saveOtpDto = new SaveOTPDto();
      saveOtpDto.phoneNo = phoneNumber;
      saveOtpDto.otp = otp;

      await this.saveOTP(saveOtpDto);

      // Send OTP via SMS using Twilio
      // await this.twilioClient.messages.create({
      //   body: `Your OTP is: ${otp}`,
      //   to: phoneNumber,
      //   from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
      // });
      // await this.twilioClient.verify.v2
      //   .services(process.env.TWILIO_ACCOUNT_SID)
      //   .verifications.create({ to: phoneNumber, channel: 'sms' });
      return 'otp sent successfully';
    } catch (error) {
      throw error;
    }
  }

  async saveOTP(saveOTPdto: SaveOTPDto) {
    try {
      saveOTPdto.isUsed = 0;
      saveOTPdto.enOTP = await this.utilService.hashPassword(saveOTPdto.otp);
      return this.OTPrepo.saveOTP(saveOTPdto);
    } catch (e) {
      throw e;
    }
  }

  async verifyOTP(phoneNo: string, otp: string) {
    try {
      const enOTP = await this.OTPrepo.getOTP(phoneNo, otp);
      if(!enOTP) 
        {
          throw new HttpException(ErrorMessages.INVALID_OTP,HttpStatus.UNAUTHORIZED);
        }

      const isVerified = await this.utilService.comparePasswords(otp, enOTP);
      if (isVerified) {
        await this.OTPrepo.updateUsedStatus(1);
        return 1;
      } else {
        return 0;
      }
    } catch (e) {
      throw e;
    }
  }
}
