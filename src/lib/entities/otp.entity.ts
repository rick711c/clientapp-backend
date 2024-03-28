import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class OTP{
    @PrimaryColumn()
    phoneNo: string;

    @Column()
    enOTP: string;

    @Column()
    expiryTime: Date;

    @Column({type:"smallint", default:0})
    isUsed: number
}