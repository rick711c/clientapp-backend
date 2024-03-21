import { UUID } from 'crypto';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('patient')
export class PatientEntity {
  @PrimaryGeneratedColumn('uuid')
  patientId: UUID;

  @Column()
  userId: UUID;

  @Column()
  name: string;

  @CreateDateColumn()
  accessTokenCreatedAt: Date;

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
