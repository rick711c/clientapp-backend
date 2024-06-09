import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/lib/entities/appointment.entity';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { UpdateAppointmentDto } from './dto/updateAppointment.dto';
import { CheckupDay } from 'src/lib/entities/checkupDay.entity';
import { CheckupHour } from 'src/lib/entities/checkupHours.entity';

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

  async getAppointmentIdList(patientId: string, doctorId:string,clinicId:string,status:number) {
    try {
      const query =  this.repo
        .createQueryBuilder()
        .select('"appointmentId"')
        // .where('"createdBy" = :userId', { userId })
        .where('"isDeleted" = :isDeleted', { isDeleted: 0 });

        if(patientId){
          query.andWhere('"patientId" = :patientId', { patientId });
        }
        if(doctorId){
          query.andWhere('"doctorId" = :doctorId', { doctorId })
        }
        if(clinicId){
          query.andWhere('"clinicId" = :clinicId',{ clinicId})
        }
        if(status){
          query.andWhere('"status" = :status',{ status})
        }
        query.orderBy('"createDate"','DESC')
        const res = await query.getRawMany();
      return res;
    } catch (e) {
      throw e;
    }
  }

  async getAppointmentDetails(appointmentId: string) {
    try {
      const res = await this.repo
        .createQueryBuilder('ap') // Main query table alias
        .select([
          'ap.*',
          'cd."checkupDay" as "checkupDay"',
          'ch."checkupHour" as "checkupHour"',
        ])
        .where('"appointmentId" = :appointmentId', {
          appointmentId: appointmentId,
        })
        .innerJoin(CheckupDay, 'cd', 'ap."bookingDayId" = cd."dayId" ')
        .innerJoin(CheckupHour, 'ch', 'ap."bookingHourId" = ch."hourId" ')
        .getRawOne();
      return res;
    } catch (e) {
      throw e;
    }
  }

  async updateAppointment(updateAppointmentDto: UpdateAppointmentDto) {
    try {
      const appointmentId = updateAppointmentDto.appointmentId;
      delete updateAppointmentDto.appointmentId;

      const res = await this.repo
        .createQueryBuilder()
        .update(Appointment)
        .set({ ...updateAppointmentDto })
        .where('appointmentId = :appointmentId', { appointmentId })
        .execute();

      return res ? 1 : 0;
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
          'COUNT("appointmentId") as appointmentCount',
          '"bookingHourId"',
          'DATE("bookingDate") AS bookingDate',
        ])
        .where('"clinicId" = :clinicId', { clinicId })
        .andWhere('DATE("bookingDate") >= :dateLowerRange', { dateLowerRange })
        .andWhere('DATE("bookingDate") <= :dateUpperRange', { dateUpperRange })
        .groupBy('"bookingDate"')
        .addGroupBy('"bookingHourId"');

      const res = await query.getRawMany();
      return res;
    } catch (err) {
      throw err;
    }
  }
}
