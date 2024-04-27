import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/lib/entities/appointment.entity';
import { Clinic } from 'src/lib/entities/clinic.entity';
import { Doctor } from 'src/lib/entities/doctor.entity';
import { Patient } from 'src/lib/entities/patient.entity';
import { Repository } from 'typeorm';

export class CommonRepository {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
    @InjectRepository(Clinic)
    private readonly clinicRepo: Repository<Clinic>,
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,
  ) {}

  async getClinicAddress(clinicId: string) {
    try {
      return this.clinicRepo
        .createQueryBuilder()
        .select(`"address"`)
        .where('"clinicId" = :clinicId', { clinicId })
        .getRawOne();
    } catch (err) {
      throw err;
    }
  }


  async getPatientBasicInfo(patientId: string) {
    try {
      const res = await this.patientRepo
        .createQueryBuilder()
        .select(['"fullname"', '"age"', '"gender"'])
        .where('"patientId" = :patientId', { patientId })
        .getRawOne();
      return res;
    } catch (err) {
      throw err;
    }
  }

  async getDoctorBasicInfo(doctorId: string) {
    try {
      return this.doctorRepo.createQueryBuilder('d')
      .select(['d."fullname"','d."education"','d."specialization"'])
      .where('d."doctorId" = :doctorId', {doctorId})
      .getRawOne();
    } catch (err) {
      throw err;
    }
  }

}
