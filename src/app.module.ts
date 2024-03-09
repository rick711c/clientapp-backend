import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentEntity } from './lib/entities/appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbconfig } from './config/dbconfig';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { PatinetModule } from './modules/paitent/paitent.module';

@Module({
  imports: [AppointmentModule,PatinetModule,
    TypeOrmModule.forRoot({...dbconfig}),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
