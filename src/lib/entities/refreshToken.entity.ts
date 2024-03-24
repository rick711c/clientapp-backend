import { UUID } from "crypto";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RefreshToken{
    @PrimaryGeneratedColumn('uuid')
    tokenId: UUID;

    @Column()
    userId:UUID

    @Column()
    token:string

    @CreateDateColumn()
    createDate:Date

    @Column()
    expireDate:Date
}