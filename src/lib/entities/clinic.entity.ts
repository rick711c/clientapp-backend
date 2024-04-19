import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ClinicAddress } from '../interfaces/index.interface';

@Entity()
export class Clinic {
  @PrimaryGeneratedColumn('uuid')
  clinicId: string;

  @Column()
  clinicName: string;

}
