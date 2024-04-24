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

  async getClinicList() {
    try {
      const res = await this.repository
        .createQueryBuilder()
        .select('*')
        //.where('createdBy = :createdBy',{createdBy: userId})
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
        .where('cd."clinicId" = :clinicId', { clinicId });

      return query.getRawMany();
    } catch (err) {
      throw err;
    }
  }

  async getClinicDetails(clinicId: string) {
    try {
      return this.repository
        .createQueryBuilder()
        .select('*')
        .where('clinicId = :clinicId', { clinicId: clinicId })
        .getRawOne();
    } catch (err) {
      throw err;
    }
  }
}
