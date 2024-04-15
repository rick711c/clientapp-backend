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
        .createQueryBuilder()
        .select([
          'doctorId',
          'fullname',
          'specialization',
          'email',
          'experience',
          'education',
          'certifications',
          'languagesSpoken',
        ])
        .where('doctorId = :doctorId', { doctorId })
        .getRawOne();
      return doctorDetails;
    } catch (err) {
      throw err;
    }
  }
}
