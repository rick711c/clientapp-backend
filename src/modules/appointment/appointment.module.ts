import { Module } from "@nestjs/common";
import { AppointmentEntity } from "src/lib/entities/appointment.entity";
import { AppointmentController } from "./appointment.controller";
import { AppointmentService } from "./appointment.service";
import { AppointmentRepository } from "./appointment.repository";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports:[ TypeOrmModule.forFeature([AppointmentEntity])],
    controllers:[AppointmentController],
    providers:[AppointmentService,AppointmentRepository]
})
export class AppointmentModule {}