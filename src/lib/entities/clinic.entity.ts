import { UUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Clinic {
  @PrimaryGeneratedColumn('uuid', { name: 'clinicId' })
  clinicId: UUID;

  @Column({ name: 'clinicName' })
  clinicName: string;

  @Column('json', { name: 'address', nullable: true })
  address: JSON;

  @Column()
  doctorId: string;

}
