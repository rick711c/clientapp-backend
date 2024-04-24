import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AccessToken } from 'src/lib/entities/accessToken.entity';
import { Appointment } from 'src/lib/entities/appointment.entity';
import { CheckupDay } from 'src/lib/entities/checkupDay.entity';
import { CheckupHour } from 'src/lib/entities/checkupHours.entity';
import { Clinic } from 'src/lib/entities/clinic.entity';
import { OTP } from 'src/lib/entities/otp.entity';
import { Patient } from 'src/lib/entities/patient.entity';
import { RefreshToken } from 'src/lib/entities/refreshToken.entity';
import { Role } from 'src/lib/entities/role.entity';
import { User } from 'src/lib/entities/user.entity';
import { UserRole } from 'src/lib/entities/userRole.entity';
import { UserModule } from 'src/modules/auth/user/user.module';
import * as dotenv from 'dotenv';
import { Doctor } from 'src/lib/entities/doctor.entity';
dotenv.config({ path: './.env' });

export const dbConfig: TypeOrmModuleOptions = {
  type:'postgres',
  url:'postgres://saikatdb_user:7UydC7AnouZbFRBimeKAQRZ254Stx0x1@dpg-cohbg021hbls7399t7ig-a.oregon-postgres.render.com/saikatdb',
  ssl: true,
  entities: [
    Appointment,
    Patient,
    User,
    UserRole,
    Role,
    AccessToken,
    RefreshToken,
    OTP,
    Clinic,
    CheckupHour,
    CheckupDay,
    Doctor
  ],
  synchronize: true,
  logging: true,
};
