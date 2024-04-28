import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { AppointmentRepository } from './appointment.repository';
import { Injectable } from '@nestjs/common';
import { UpdateAppointmentDto } from './dto/updateAppointment.dto';
import { CommonService } from '../common/common.service';

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

      const doctorInfo = await this.commonService.getDoctorBasicInfo(
        createAppointmentDto.doctorId,
      );
      const patientData = await this.commonService.getPatientBasicInfo(
        createAppointmentDto.patientId,
      );
      const clinicData = await this.commonService.getClinicAddress(
        createAppointmentDto.clinicId,
      );

      const newAppointment =
        await this.repo.createAppointment(createAppointmentDto);

      return{...newAppointment, patientData,clinicData,doctorInfo}
    } catch (e) {
      throw e;
    }
  }

  async getAppointmentList(userId: string) {
    try {
      let appointmentList:any[]=[];
      const appointmentIds = await this.repo.getAppointmentIdList(userId);
      for(let i = 0; i < appointmentIds.length; i++) {
        const appointmentDetails = await this.getAppointmentDetails(appointmentIds[i].appointmentId);
        appointmentDetails.createDate = appointmentDetails.createDate.toLocaleDateString();
        appointmentDetails.bookingDate = appointmentDetails.bookingDate.toLocaleDateString();
        appointmentList.push(appointmentDetails);
      }
      return appointmentList;
    } catch (e) {
      throw e;
    }
  }

  async getAppointmentDetails(appointmentId: string) {
    try {

      const appointmentDetails = await this.repo.getAppointmentDetails(appointmentId);
      // const doctorInfo = await this.commonService.getDoctorBasicInfo(
      //   appointmentDetails.doctorId,
      // );
      const patientData = await this.commonService.getPatientBasicInfo(
        appointmentDetails.patientId,
      );
      const clinicData = await this.commonService.getClinicDetails(
        appointmentDetails.clinicId,
      );

      return{...appointmentDetails, patientData,clinicData}
     
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
