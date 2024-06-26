import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicController } from './clinic.controller';
import { ClinicService } from './clinic.service';
import { Clinic } from 'src/lib/entities/clinic.entity';
import { ClinicRepository } from './clinic.repository';
import { CheckupHour } from 'src/lib/entities/checkupHours.entity';
import { CheckupDay } from 'src/lib/entities/checkupDay.entity';
import { AppointmentModule } from '../appointment/appointment.module';
import { UtilService } from 'src/lib/utils/util.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([Clinic,CheckupHour,CheckupDay]),AppointmentModule,CommonModule],
  controllers: [ClinicController],
  providers: [ClinicService, ClinicRepository,UtilService],
})
export class ClinicModule {}
