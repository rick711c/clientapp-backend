import { UUID } from 'crypto';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Token {
    @PrimaryGeneratedColumn('uuid')
    tokenId: number;

    @Column()
    userId: UUID;

    @Column()
    accessToken: string;

    @Column()
    refreshToken: string;

    @CreateDateColumn()
    accessTokenCreatedAt: Date;

    @Column()
    accessTokenExpiresAt: Date;

    @Column()
    refreshTokenExpiresAt: Date;
}
