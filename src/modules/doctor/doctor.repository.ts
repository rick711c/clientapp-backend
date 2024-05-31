import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/lib/entities/doctor.entity';
import { Repository } from 'typeorm';
import { AddDoctorDto } from './dto/addDoctor.dto';

export class DoctorRepository {
  constructor(
    @InjectRepository(Doctor)
    private repository: Repository<Doctor>,
  ) {}

  async addDoctor(addDoctorDto: AddDoctorDto) {
    try {
      const newDoctor = this.repository.create(addDoctorDto);
      return this.repository.save(newDoctor);
    } catch (err) {
      throw err;
    }
  }

  async getDoctorDetails(doctorId: string) {
    try {
      const doctorDetails = await this.repository
        .createQueryBuilder('d')
        .select([
          'd."doctorId"',
          'd."fullname"',
          'd."specialization"',
          'd."email"',
          'd."phoneNumber"',
          'd."experience"',
          'd."education"',
          'd."certifications"',
          'd."languagesSpoken"',

        ])
        .where('d."doctorId" = :doctorId', { doctorId })
        .getRawOne();
      return doctorDetails;
    } catch (err) {
      throw err;
    }
  }

  async getDoctorBasicInfo(doctorId: string) {
    try {
      return this.repository
        .createQueryBuilder('d')
        .select(['d."fullname"', 'd."education"', 'd."specialization"'])
        .where('doctorId = :doctorId', { doctorId })
        .getRawOne();
    } catch (err) {
      throw err;
    }
  }


  
}
