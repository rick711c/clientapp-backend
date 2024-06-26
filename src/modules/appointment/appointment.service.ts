import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { AppointmentRepository } from './appointment.repository';
import { Injectable } from '@nestjs/common';
import { UpdateAppointmentDto } from './dto/updateAppointment.dto';
import { CommonService } from '../common/common.service';
import { create } from 'domain';
import { AppointmentStatus } from 'src/lib/enums';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly repo: AppointmentRepository,
    private readonly commonService: CommonService,
  ) {}

  async createAppointment(
    createAppointmentDto: CreateAppointmentDto,
    user: any,
  ) {
    try {
      createAppointmentDto.createdBy = user.userId;
      createAppointmentDto.status = AppointmentStatus.Upcoming;
      createAppointmentDto.bookingDate = createAppointmentDto.bookingDate
        ? createAppointmentDto.bookingDate
        : new Date();
      createAppointmentDto.bookingDate.setHours(0, 0, 0, 0);

      const newAppointment =
        await this.repo.createAppointment(createAppointmentDto);
      return this.getAppointmentDetails(newAppointment.appointmentId);
    } catch (e) {
      throw e;
    }
  }

  async getAppointmentList(
    patientId: string,
    doctorId: string,
    clinicId: string,
    status:number
  ) {
    try {
      let appointmentList: any[] = [];

      const appointmentIds = await this.repo.getAppointmentIdList(
        patientId,
        doctorId,
        clinicId,
        status
      );
      for (let i = 0; i < appointmentIds.length; i++) {
        const appointmentDetails = await this.getAppointmentDetails(
          appointmentIds[i].appointmentId,
        );
        appointmentList.push(appointmentDetails);
      }
      return appointmentList;
    } catch (e) {
      throw e;
    }
  }

  async getAppointmentDetails(appointmentId: string) {
    try {
      const appointmentDetails =
        await this.repo.getAppointmentDetails(appointmentId);
      // const doctorInfo = await this.commonService.getDoctorBasicInfo(
      //   appointmentDetails.doctorId,
      // );
      const patientData = await this.commonService.getPatientBasicInfo(
        appointmentDetails.patientId,
      );
      const clinicData = await this.commonService.getClinicDetails(
        appointmentDetails.clinicId,
      );

      // appointmentDetails.createDate =
      //   appointmentDetails.createDate.toLocaleDateString();
      // appointmentDetails.bookingDate =
      //   appointmentDetails.bookingDate.toLocaleDateString();

      return { ...appointmentDetails, patientData, clinicData };
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
