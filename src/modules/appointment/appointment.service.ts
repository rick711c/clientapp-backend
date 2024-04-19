import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { AppointmentRepository } from './appointment.repository';
import { Injectable } from '@nestjs/common';
import { UpdateAppointmentDto } from './dto/updateAppointment.dto';
import { create } from 'domain';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';
import { ClinicService } from '../clinic/clinic.service';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly repo: AppointmentRepository,
    private readonly doctorService: DoctorService,
    private readonly patientService: PatientService,
  ) {}

  async createAppointment(
    createAppointmentDto: CreateAppointmentDto,
    user: any,
  ) {
    try {
      createAppointmentDto.createdBy = user.userId;

      const doctorInfo = await this.doctorService.getDoctorBasicInfo(
        createAppointmentDto.doctorId,
      );
      const patientInfo = await this.patientService.getPatientBasicInfo(
        createAppointmentDto.patientId,
      );
     

      createAppointmentDto.doctorInfo = doctorInfo;
      createAppointmentDto.patientInfo = patientInfo;
      

      return this.repo.createAppointment(createAppointmentDto);
    } catch (e) {
      throw e;
    }
  }

  async getAppointmentList(userId: string) {
    try {
      const res = await this.repo.getAppointmentList(userId);
      return res;
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

  async getGroupedBookingData(clinicId: string, dayUpto: number) {
    try {
      const groupdata = await this.repo.getGroupedBookingData(
        clinicId,
        dayUpto,
      );
      return groupdata;
    } catch (err) {
      throw err;
    }
  }
}
