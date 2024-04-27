import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class OTP {
    @PrimaryColumn({ name: 'phoneNo' })
    phoneNo: string;

    @Column({ name: 'enOTP' })
    enOTP: string;

    @Column({ name: 'expiryTime' })
    expiryTime: Date;

    @Column({ name: 'isUsed', type: 'smallint', default: 0 })
    isUsed: number;
}
