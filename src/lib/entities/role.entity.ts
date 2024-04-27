import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid', { name: 'roleId' })
  roleId: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description' })
  description: string;
}
