import { UUID } from 'crypto';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RefreshToken {
    @PrimaryGeneratedColumn('uuid', { name: 'tokenId' })
    tokenId: UUID;

    @Column({ name: 'userId' })
    userId: UUID;

    @Column({ name: 'token' })
    token: string;

    @CreateDateColumn({ name: 'createDate' })
    createDate: Date;

    @Column({ name: 'expireDate' })
    expireDate: Date;
}
