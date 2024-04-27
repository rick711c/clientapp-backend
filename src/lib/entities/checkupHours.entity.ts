import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CheckupHour {
    @PrimaryGeneratedColumn('uuid', { name: 'hourId' })
    hourId: string;

    @Column({ name: 'checkupHour' })
    checkupHour: string;

    @Column('uuid', { name: 'dayId' })
    dayId: string;

    @Column({ name: 'slots' })
    slots: number;
}
