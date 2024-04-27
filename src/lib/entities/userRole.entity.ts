import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @PrimaryColumn('uuid', { name: 'userId' })
  userId: string;

  @PrimaryColumn('uuid', { name: 'roleId' })
  roleId: string;
}
