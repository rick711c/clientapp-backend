import { AddClinicDto } from './dto/addClinic.dto';
import { Injectable } from '@nestjs/common';
import { ClinicRepository } from './clinic.repository';
import { AddCheckupDayDto } from './dto/addCheckupDate.dto';
import { AddCheckupHourDto } from './dto/addCheckupHour.dto';
import { AppointmentService } from '../appointment/appointment.service';

@Injectable()
export class ClinicService {
  constructor(
    private repository: ClinicRepository,
    private appointmentService: AppointmentService
    ) {}

  async createClinic(addClinicDto: AddClinicDto) {
    try {
      return this.repository.createClinic(addClinicDto);
    } catch (err) {
      throw err;
    }
  }



  async getClinicList() {
    try {
      return this.repository.getClinicList();
    } catch (err) {
      throw err;
    }
  }

  async addCheckupDay(checkupDayDto:AddCheckupDayDto){
    try{
      return this.repository.addCheckupDay(checkupDayDto)
    }
    catch (err) {
      throw err;
    }
  }

  async addCheckupHour(checkupHourDto:AddCheckupHourDto){
    try{
     return this.repository. addCheckupHour(checkupHourDto);
    }
    catch (err) {
      throw err;
    }
  }


  async getCheckupDayHours(clinicId:string){
    try{
      return this.getCheckupDayHours(clinicId);
    }catch (err) {
      throw err;
    }
  }

  async getClinicDetails(clinicId:string){
    try{
      const clinicDetails = await this.repository.getClinicDetails(clinicId);
      const checkupDateTime = await this.repository.getCheckupDayAndHours(clinicId);
      return {...clinicDetails, checkupDateTime};
    }catch (err) {
      throw err;
    }
  }

  async getGroupedBookingData(clinicId:string,dayUpto: number){
    try{
      const groupdata = await this.appointmentService.getGroupedBookingData(clinicId,dayUpto);
      return groupdata;
    }catch (err) {
      throw err;
    }
  }
}
