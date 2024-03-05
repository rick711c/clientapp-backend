import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentEntity } from './lib/entities/appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbconfig } from './config/dbconfig';
import { AppointmentModule } from './modules/appointment/appointment.module';

@Module({
  imports: [AppointmentModule,
    TypeOrmModule.forRoot({...dbconfig}),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
