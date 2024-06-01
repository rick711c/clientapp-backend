import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'userId' })
  userId: string;

  @Column({ name: 'username', nullable: true })
  username: string;

  @Column({ name: 'enPassword', nullable: true })
  enPassword: string;

  @Column({ name: 'fullname', default:"Guest" })
  fullname: string;

  @Column({ name: 'phoneNumber', nullable: true })
  phoneNumber: string;

  @Column({ name: 'email', nullable: true })
  email: string;

  @CreateDateColumn({ name: 'createDate' })
  createDate: Date;

  @Column({ name: 'modifyDate', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  modifyDate: Date;

  @Column({ name: 'isActive', default: true })
  isActive: boolean;
}
