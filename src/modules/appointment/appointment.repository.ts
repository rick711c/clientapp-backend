import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/lib/entities/appointment.entity';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { UpdateAppointmentDto } from './dto/updateAppointment.dto';

export class AppointmentRepository {
  constructor(
    @InjectRepository(Appointment)
    private readonly repo: Repository<Appointment>,
  ) {}

  async createAppointment(createAppointmentDto: CreateAppointmentDto) {
    try {
      const newAppointment = this.repo.create(createAppointmentDto);
      const res = await this.repo.save(newAppointment);
      console.log('Appointment created successfully');
      return res;
    } catch (e) {
      console.log('appointment creating failed');
      throw e;
    }
  }

  async getAppointmentList(userId: string) {
    try {
      const res = await this.repo
        .createQueryBuilder()
        .select('*')
        .where('userId = :userId', { userId })
        .andWhere('isDeleted = :isDeleted', { isDeleted: 0 })
        .getRawMany();
    } catch (e) {
      throw e;
    }
  }

  async getAppointmentDetails(appointmentId: string) {
    try {
      const res = await this.repo
        .createQueryBuilder()
        .select('*')
        .where('appointmentId = :appointmentId', {
          appointmentId: appointmentId,
        })
        .getRawOne();
      return res;
    } catch (e) {
      throw e;
    }
  }

  async updateAppointment(updateAppointmentDto: UpdateAppointmentDto) {
    try {
      const appointmentDetails = await this.getAppointmentDetails(
        updateAppointmentDto.appointmentId,
      );
      const updateAppointment = {
        ...appointmentDetails,
        ...updateAppointmentDto,
      };
      return this.repo.save(updateAppointment);
    } catch (e) {
      throw e;
    }
  }
}
