import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AppointmentEntity {
  @PrimaryGeneratedColumn()
  appointmentId: number;

  @Column()
  doctorId: number;

  @Column()
  patientId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  modifyDate: Date;

  @Column({ type: 'timestamp' })
  bookingDate: Date;

  @Column({ default: false })
  isDeleted: boolean;
}
