import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/createPatient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/lib/entities/patient.entity';

export class PatientRepository {
  constructor(
    @InjectRepository(Patient)
    private repository: Repository<Patient>,
  ) {}

  async createPatient(createPatientDto: CreatePatientDto) {
    try {
      const newPatient = this.repository.create(createPatientDto);
      const res = await this.repository.save(newPatient);
      return res;
    } catch (err) {
      throw err;
    }
  }

  async getPatientList(userId: string) {
    try {
      const res = await this.repository
        .createQueryBuilder()
        .select('*')
        .where('createdBy = :createdBy', { createdBy: userId })
        .getRawMany();
      return res;
    } catch (err) {
      throw err;
    }
  }  
}
