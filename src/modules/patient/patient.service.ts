import { Injectable } from '@nestjs/common';
import { PatientRepository } from './patient.repository';
import { CreatePatientDto } from './dto/createPatient.dto';
import { CurrentUserInfo } from 'src/lib/interfaces/index.interface';

@Injectable()
export class PatientService {
  constructor(private readonly patientRepository: PatientRepository) {}

  async createPatient(
    user: CurrentUserInfo,
    createPatientDto: CreatePatientDto,
  ) {
    try { 
      createPatientDto.createdBy = user.userId;
      return this.patientRepository.createPatient(createPatientDto);
    } catch (e) {
      throw e;
    }
  }

  async getPatientList(userId: string) {
    try {
      return this.patientRepository.getPatientList(userId);
    } catch (err) {
      throw err;
    }
  }
}
