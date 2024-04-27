import { UUID } from 'crypto';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('patient')
export class Patient {
  @PrimaryGeneratedColumn('uuid', { name: 'patientId' })
  patientId: UUID;

  @Column({ name: 'createdBy' })
  createdBy: UUID;

  @Column({ name: 'fullname' })
  fullname: string;

  @Column({ name: 'gender' })
  gender: string;

  @Column({ name: 'age' })
  age: number;

  @Column({ name: 'modifyDate', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  modifyDate: Date;

  @Column({ name: 'phoneNumber' })
  phoneNumber: string;

  @Column({ name: 'email', nullable: true })
  email: string;

  @Column({ name: 'isDeleted', default: false })
  isDeleted: boolean;
}
