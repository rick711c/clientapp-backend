import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn('uuid', { name: 'doctorId' })
  doctorId: string;

  @Column({ name: 'fullname' })
  fullname: string;

  @Column({ name: 'gender' })
  gender: string;

  @Column({ name: 'specialization' })
  specialization: string;

  @Column({ name: 'licenseNumber', nullable: true })
  licenseNumber: string;

  @Column({ name: 'phoneNumber', nullable: true })
  phoneNumber: string;

  @Column({ name: 'email', nullable: true })
  email: string;

  @Column({ name: 'address', nullable: true })
  address: string;

  @Column({ name: 'experience', nullable: true })
  experience: number;

  @Column({ name: 'education', nullable: true })
  education: string;

  @Column({ name: 'certifications', nullable: true })
  certifications: string;

  @Column({ name: 'languagesSpoken', nullable: true })
  languagesSpoken: string;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes: string;
}
