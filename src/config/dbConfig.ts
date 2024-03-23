import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Appointment } from "src/lib/entities/appointment.entity";
import { Patient } from "src/lib/entities/patient.entity";
import { User } from "src/lib/entities/user.entity";
import { UserModule } from "src/modules/auth/user/user.module";

export const dbConfig:TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'db4free.net',
  port: 3306,
  username: 'scrum_management',
  password: 'reactgod@123',
  database: 'scrum_management',
  entities: [Appointment,Patient,User],
  synchronize: true,
};