import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Appointment } from './lib/entities/appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/dbConfig';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { PatientModule } from './modules/patient/patient.module';
import { UserModule } from './modules/auth/user/user.module';
import { UserRoleModule } from './modules/auth/userRole/userRole.module';
import { RoleModule } from './modules/auth/role/role.module';
import { TokenModule } from './modules/auth/authToken/token.module';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AuthGuard } from './guards/authentication.guard';
import { OTPModule } from './modules/auth/otp/otp.module';
import { ClinicModule } from './modules/clinic/clinic.module';
import { ExceptionHandlerInterceptor } from './interceptors/exceptionHandle.interceptor';
import { DoctorModule } from './modules/doctor/doctor.module';
import { CommonModule } from './modules/common/common.module';


@Module({
  imports: [
    
    AppointmentModule,
    PatientModule,
    UserModule,
    UserRoleModule,
    RoleModule,
    TokenModule,
    OTPModule,
    ClinicModule,
    DoctorModule,
    CommonModule,
    TypeOrmModule.forRoot({ ...dbConfig }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard, 
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ExceptionHandlerInterceptor
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ],
})
export class AppModule {}
