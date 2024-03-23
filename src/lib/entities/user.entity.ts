import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserRoles } from '../enums';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column()
    username: string;

    @Column()
    enPassword: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column()
    email: string;

    @Column({default:UserRoles.CUSTOMER})
    roles: string;

    @CreateDateColumn()
    createDate: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    modifyDate: Date;

    @Column({default:true})
    isActive: boolean;
}
 