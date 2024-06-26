import { AddClinicDto } from './dto/addClinic.dto';
import { Body, Controller, Get, Injectable, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { AddCheckupDayDto } from './dto/addCheckupDate.dto';
import { AddCheckupHourDto } from './dto/addCheckupHour.dto';

@Controller('/clinic')
export class ClinicController {
  constructor(private service: ClinicService) {}

  @Post()
  async createClinic(@Body() addClinicDto: AddClinicDto) {
    try {
      return this.service.createClinic(addClinicDto);
    } catch (err) {
      throw err;
    }
  }

  @Get('/list')
  async getClinicList(@Query('doctorId')doctorId: string) {
    try {
      return this.service.getClinicList(doctorId);
    } catch (err) {
      throw err;
    }
  }

  @Post('/addCheckupDay')
  async addCheckupDay(@Body() checkupDayDto: AddCheckupDayDto) {
    try {
      return this.service.addCheckupDay(checkupDayDto);
    } catch (err) {
      throw err;
    }
  }

  @Post('/addCheckupHour')
  async addCheckupHour(@Body() checkupHourDto: AddCheckupHourDto) {
    try {
      return this.service.addCheckupHour(checkupHourDto);
    } catch (err) {
      throw err;
    }
  }

  @Get('/clinicDetails')
  async getClinicDetails(@Query('clinicId') clinicId: string) {
    try {
      return this.service.getClinicDetails(clinicId);
    } catch (err) {
      throw err;
    }
  }

  @Get('/getAvailableClinic')
  async getGroupedBookingData(
    @Query('clinicId') clinicId: string,
    @Query('dayUpto') dayUpto: number,
  ) {
    try {
      return this.service.getGroupedBookingData(clinicId, dayUpto?dayUpto:7);
    } catch (err) {
      throw err;
    }
  }
}
