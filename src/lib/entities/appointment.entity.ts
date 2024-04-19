import { UUID } from 'crypto';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { DoctorInfo, PatientInfo } from '../interfaces/index.interface';

@Entity('appointment')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  appointmentId: UUID;

  @Column()
  createdBy:UUID;

  @Column()
  doctorId: UUID;

  @Column()
  patientId: UUID;

  @CreateDateColumn()
  createDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  modifyDate: Date;

  @Column({ type: 'timestamp'})
  bookingDate: Date;

  @Column()
  clinicId: UUID;

  @Column()
  bookingDayId: UUID;

  @Column()
  bookingHourId: UUID;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ default: false })
  isCompleted: boolean;

  // @Column('json', {nullable:true})
  // doctorInfo: DoctorInfo;

  // @Column('json', {nullable:true})
  // patientInfo: PatientInfo;

}
