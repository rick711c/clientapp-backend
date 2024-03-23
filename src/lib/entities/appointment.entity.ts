import { UUID } from 'crypto';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

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

  @Column({ type: 'timestamp' })
  bookingDate: Date;

  @Column({ default: false })
  isDeleted: boolean;
}
