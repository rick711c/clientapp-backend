import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CheckupDay{
    @PrimaryGeneratedColumn('uuid')
    dayId: string;

    @Column()
    checkupDay:string;

    @Column()
    clinicId:string;
}