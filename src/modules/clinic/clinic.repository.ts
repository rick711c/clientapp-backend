import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinic } from 'src/lib/entities/clinic.entity';
import { AddClinicDto } from './dto/addClinic.dto';
import { CheckupDay } from 'src/lib/entities/checkupDay.entity';
import { CheckupHour } from 'src/lib/entities/checkupHours.entity';
import { AddCheckupDayDto } from './dto/addCheckupDate.dto';
import { AddCheckupHourDto } from './dto/addCheckupHour.dto';

export class ClinicRepository {
  constructor(
    @InjectRepository(Clinic)
    private repository: Repository<Clinic>,
    @InjectRepository(CheckupDay)
    private checkupDayRepo: Repository<CheckupDay>,
    @InjectRepository(CheckupHour)
    private checkupHourRepo: Repository<CheckupHour>,
  ) {}

  async createClinic(addClinicDto: AddClinicDto) {
    try {
      const newClinic = this.repository.create(addClinicDto);
      return this.repository.save(newClinic);
    } catch (err) {
      throw err;
    }
  }

  async getClinicList(doctorId:string) {
    try {
      const res = await this.repository
        .createQueryBuilder()
        .select('*')
        .where('"doctorId" = :doctorId',{doctorId})
        .getRawMany();
      return res;
    } catch (err) {
      throw err;
    }
  }

  async addCheckupDay(checkupDayDto: AddCheckupDayDto) {
    try {
      const newCheckupDay = this.checkupDayRepo.create(checkupDayDto);
      return this.checkupDayRepo.save(newCheckupDay);
    } catch (err) {
      throw err;
    }
  }

  async addCheckupHour(checkupHour: AddCheckupHourDto) {
    try {
      const newCheckupHour = this.checkupHourRepo.create(checkupHour);
      return this.checkupHourRepo.save(newCheckupHour);
    } catch (err) {
      throw err;
    }
  }

  async getCheckupDayAndHours(clinicId: string) {
    try {
      const query = this.checkupDayRepo
        .createQueryBuilder('cd')
        .select([
          'cd."dayId" as "dayId"',
          'cd."checkupDay" as "checkupDay"',
          'ch."checkupHour" as "checkupHour"',
          'ch.hourId as "hourId"',
          'ch."slots" as "slots"',
        ])
        .innerJoin(CheckupHour, 'ch', 'ch."dayId" = cd."dayId"')
        .where('cd."clinicId" = :clinicId', { clinicId })
        .andWhere('cd."isDisabled" = false',)
        .andWhere('ch."isDisabled" = false',)

      return query.getRawMany();
    } catch (err) {
      throw err;
    }
  }

  
}
