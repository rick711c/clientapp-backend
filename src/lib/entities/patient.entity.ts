import { UUID } from 'crypto';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('patient')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  patientId: UUID;

  @Column()
  createdBy: UUID;

  @Column()
  fullname: string;

  @Column()
  gender: string;

  @Column()
  age: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  modifyDate: Date;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  email: string;

  @Column({ default: false })
  isDeleted: boolean;
}
