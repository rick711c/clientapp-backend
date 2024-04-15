import { AddDoctorDto } from './dto/addDoctor.dto';
import { Injectable } from '@nestjs/common';
import { DoctorRepository } from './doctor.repository';

@Injectable()
export class DoctorService {
  constructor(private repository: DoctorRepository) {}

  async addDoctor(addDoctorDto: AddDoctorDto) {
    try {
      return this.repository.addDoctor(addDoctorDto);
    } catch (err) {
      throw err;
    }
  }

  async getDoctorDetails(doctorId: string) {
    try {
      return this.repository.getDoctorDetails(doctorId);
    } catch (err) {
      throw err;
    }
  }
}
