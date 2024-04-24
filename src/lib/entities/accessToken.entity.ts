import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class AccessToken {
  @PrimaryGeneratedColumn('uuid', { name: "tokenId" })
  tokenId: string;

  @Column( 'uuid', { name: "userId" })
  userId: string;

  @CreateDateColumn({ name: "createdDate" })
  createdDate: Date;

  @Column({ name: "expireDate", type: 'timestamp' })
  expireDate: Date;
}
