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
        .where('createdBy = :userId', { userId })
        .andWhere('isDeleted = :isDeleted', { isDeleted: 0 })
        .getRawMany();
      return res;
    } catch (e) {
      throw e;
    }
  }

  async getAppointmentDetails(appointmentId: string) {
    try {
      const res = await this.repo
        .createQueryBuilder('ap') // Main query table alias
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

  async getGroupedBookingData(clinicId: string, dayUpto: number) {
    const dateLowerRange: Date = new Date();
    const dateUpperRange: Date = new Date(
      dateLowerRange.getTime() + dayUpto * 24 * 60 * 60 * 1000,
    );
    dateLowerRange.setHours(0, 0, 0, 0); //beacuse we will not comare with the time stamp,
    dateUpperRange.setHours(0, 0, 0, 0);

    try {
      const query = this.repo
        .createQueryBuilder()
        .select([
          'COUNT(appointmentId) as appointmentCount',
          'bookingHourId',
          'DATE(bookingDate) AS bookingDate',
        ])
        .where('clinicId = :clinicId', { clinicId })
        .andWhere('DATE(bookingDate) >= :dateLowerRange', { dateLowerRange })
        .andWhere('DATE(bookingDate) <= :dateUpperRange', { dateUpperRange })
        .groupBy('bookingDate')
        .addGroupBy('bookingHourId');

      const res = await query.getRawMany();
      return res;
    } catch (err) {
      throw err;
    }
  }
}
