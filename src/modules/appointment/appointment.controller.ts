import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { AppointmentRepository } from './appointment.repository';
import { AppointmentService } from './appointment.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UpdateAppointmentDto } from './dto/updateAppointment.dto';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { CurrentUserInfo } from 'src/lib/interfaces/index.interface';
import { validate } from 'class-validator';

@Controller('/appointment')
export class AppointmentController {
  constructor(private readonly service: AppointmentService) {}

  @Post('/')
  async createAppointment(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @CurrentUser() user: CurrentUserInfo,
  ) {
    try {
      console.log(createAppointmentDto)
      return this.service.createAppointment(createAppointmentDto,user);
    } catch (e) {
      throw e;
    }
  }

  @Get('/list')
  async getAppointmentList(@Param('userId') userId: string) {
    try {
    } catch (e) {
      throw e;
    }
  }

  @Get('/details')
  async getAppointmentDetails(@Query('appointmentId') appointmentId: string) {
    try {
      return this.service.getAppointmentDetails(appointmentId);
    } catch (e) {
      throw e;
    }
  }

  @Patch('/')
  async updateAppointment(@Body() updateAppointmentDto: UpdateAppointmentDto) {
    try {
      return this.service.updateAppointment(updateAppointmentDto);
    } catch (e) {
      throw e;
    }
  }

  
}
