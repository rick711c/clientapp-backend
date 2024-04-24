import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { DoctorInfo, PatientInfo } from '../interfaces/index.interface';

@Entity('appointment')
export class Appointment {
  @PrimaryGeneratedColumn('uuid', { name: 'appointmentId' })
  appointmentId: string;

  @Column('uuid', { name: 'createdBy' })
  createdBy: string;

  @Column('uuid', { name: 'doctorId' })
  doctorId: string;

  @Column('uuid', { name: 'patientId' })
  patientId: string;

  @CreateDateColumn({ name: 'createDate' })
  createDate: Date;

  @Column({
    name: 'modifyDate',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  modifyDate: Date;

  @Column({ name: 'bookingDate', type: 'timestamp' })
  bookingDate: Date;

  @Column('uuid', { name: 'clinicId' })
  clinicId: string;

  @Column('uuid', { name: 'bookingDayId' })
  bookingDayId: string;

  @Column('uuid', { name: 'bookingHourId' })
  bookingHourId: string;

  @Column({ name: 'isDeleted', default: false })
  isDeleted: boolean;

  @Column({ name: 'isCompleted', default: false })
  isCompleted: boolean;
}
