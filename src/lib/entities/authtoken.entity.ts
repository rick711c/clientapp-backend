import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn('uuid')
  tokenId: string;

  @Column()
  userId: string;

  @Column()
  token: string;

  @Column({ type: 'enum', enum: ['access', 'refresh'] })
  tokenType: string;

  @CreateDateColumn()
  createdDate: Date;

  @Column({ type: 'datetime' })
  expireDate: Date;
}
