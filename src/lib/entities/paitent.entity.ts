import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PatientEntity {

    @PrimaryGeneratedColumn()
    patientId: number;

    @Column()
    name: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createDate: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    modifyDate: Date;

    @Column()
    phoneNumber: string;

    @Column({ nullable: true })
    email: string;

    @Column({ default: false })
    isDeleted: boolean;
}
