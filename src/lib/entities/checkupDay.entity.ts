import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CheckupDay {
    @PrimaryGeneratedColumn('uuid', { name: 'dayId' })
    dayId: string;

    @Column({ name: 'checkupDay' })
    checkupDay: string;

    @Column({ name: 'clinicId' })
    clinicId: string;
}
