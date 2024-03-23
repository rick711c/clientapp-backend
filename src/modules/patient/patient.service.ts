import { Injectable } from '@nestjs/common';
import { PatientRepository } from './patient.repository';
import { CreatePatientDto } from './dto/createPatient.dto';

@Injectable()
export class PatientService {
  constructor(private readonly patientRepository: PatientRepository) {}

  async createPatient(createPatientDto: CreatePatientDto) {
    try {
      return this.patientRepository.createPatient(createPatientDto);
    } catch (e) {
      throw e;
    }
  }
}
