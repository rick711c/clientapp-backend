import { Injectable } from '@nestjs/common';
import { PatientRepository } from './patient.repository';
import { CreatePatientDto } from './dto/createpaitent.dto';

@Injectable()
export class PatientService {
  constructor(private readonly paitentrepository: PatientRepository) {}

  async createPatient(createPatientDto: CreatePatientDto) {
    try {
      return this.paitentrepository.createPatient(createPatientDto);
    } catch (e) {
      throw e;
    }
  }
}
