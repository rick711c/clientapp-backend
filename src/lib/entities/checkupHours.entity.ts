import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CheckupHour{
    @PrimaryGeneratedColumn('uuid')
    hourId: string;

    @Column()
    checkupHour: string;
    
    @Column()
    dayId: string;

    @Column()
    slots: number
}