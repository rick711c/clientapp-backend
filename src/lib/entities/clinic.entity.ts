import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Clinic {
  @PrimaryGeneratedColumn('uuid', { name: 'clinicId' })
  clinicId: string;

  @Column({ name: 'clinicName' })
  clinicName: string;

  @Column('json', { name: 'address', nullable: true })
  address: JSON;
}
