import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  doctorId: string;

  @Column()
  fullname: string;

  @Column()
  gender: string;

  @Column()
  specialization: string;

  @Column({ nullable: true })
  licenseNumber: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  experience: number;

  @Column({ nullable: true })
  education: string;

  @Column({ nullable: true })
  certifications: string;

  @Column({ nullable: true })
  languagesSpoken: string;

  @Column({ type: 'text', nullable: true })
  notes: string;
}
