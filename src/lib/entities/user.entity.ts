import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column()
    username: string;

    @Column()
    encryptedPassword: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    phoneNumber: string;

    @Column()
    email: string;

    @CreateDateColumn()
    createDate: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    modifyDate: Date;
}
 