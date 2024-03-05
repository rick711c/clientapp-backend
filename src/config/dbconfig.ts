import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AppointmentEntity } from "src/lib/entities/appointment.entity";

export const dbconfig:TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'db4free.net',
  port: 3306,
  username: 'scrum_management',
  password: 'reactgod@123',
  database: 'scrum_management',
  entities: [AppointmentEntity],
  synchronize: true,
};