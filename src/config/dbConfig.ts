import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AccessToken } from 'src/lib/entities/accessToken.entity';
import { Appointment } from 'src/lib/entities/appointment.entity';
import { Patient } from 'src/lib/entities/patient.entity';
import { RefreshToken } from 'src/lib/entities/refreshToken.entity';
import { Role } from 'src/lib/entities/role.entity';
import { User } from 'src/lib/entities/user.entity';
import { UserRole } from 'src/lib/entities/userRole.entity';
import { UserModule } from 'src/modules/auth/user/user.module';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'db4free.net',
  port: 3306,
  username: 'scrum_management',
  password: 'reactgod@123',
  database: 'scrum_management',
  entities: [Appointment, Patient, User, UserRole, Role,AccessToken,RefreshToken],
  synchronize: false,
  logging: true
};
