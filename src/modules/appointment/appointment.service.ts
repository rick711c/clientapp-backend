import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { AppointmentRepository } from './appointment.repository';
import { Injectable } from '@nestjs/common';
import { UpdateAppointmentDto } from './dto/updateAppointment.dto';
import { UserInfo } from 'src/lib/interfaces/userInfo.interface';


@Injectable()
export class AppointmentService {
  constructor(private readonly repo: AppointmentRepository) {}

  async createAppointment(createAppointmentDto: CreateAppointmentDto, user:UserInfo) {
    try {
      createAppointmentDto.createdBy = user.userId;
      return this.repo.createAppointment(createAppointmentDto);
    } catch (e) {
      throw e;
    }
  }

  async getAppointmentList(userId: string) {
    try {
      const res = await this.repo.getAppointmentList(userId);
    } catch (e) {
      throw e;
    }
  }

  async getAppointmentDetails(appointmentId: string) {
    try {
        return this.repo.getAppointmentDetails(appointmentId);
    } catch (e) {
      throw e;
    }
  }

  async updateAppointment(updateAppointmentDto: UpdateAppointmentDto) {
    try {
        return this.repo.updateAppointment(updateAppointmentDto);
    } catch (e) {
      throw e;
    }
  }
}
