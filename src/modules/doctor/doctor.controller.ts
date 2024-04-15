import { AddDoctorDto } from './dto/addDoctor.dto';
import { Body, Controller, Get, Injectable, Post, Query } from '@nestjs/common';
import { DoctorService } from './doctor.service';

@Controller('/doctor')
export class DoctorController {
  constructor(private service: DoctorService) {}

  @Post()
  async addDoctor(@Body() addDoctorDto: AddDoctorDto) {
    try {
      return this.service.addDoctor(addDoctorDto);
    } catch (err) {
      throw err;
    }
  }

  @Get('/details')
  async getDoctorDetails(@Query('doctorId') doctorId: string) {
    try {
      return this.service.getDoctorDetails(doctorId);
    } catch (err) {
      throw err;
    }
  }
}
