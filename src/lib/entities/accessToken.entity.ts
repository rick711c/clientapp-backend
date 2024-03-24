import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class AccessToken {
  @PrimaryGeneratedColumn('uuid')
  tokenId: string;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdDate: Date;

  @Column({ type: 'datetime' })
  expireDate: Date;
}
