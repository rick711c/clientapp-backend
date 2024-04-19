import { Module } from "@nestjs/common";
import { Appointment } from "src/lib/entities/appointment.entity";
import { AppointmentController } from "./appointment.controller";
import { AppointmentService } from "./appointment.service";
import { AppointmentRepository } from "./appointment.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PatientModule } from "../patient/patient.module";
import { ClinicModule } from "../clinic/clinic.module";
import { DoctorModule } from "../doctor/doctor.module";

@Module({
    imports:[ TypeOrmModule.forFeature([Appointment]), PatientModule,DoctorModule],
    controllers:[AppointmentController],
    providers:[AppointmentService,AppointmentRepository],
    exports:[AppointmentService]
})
export class AppointmentModule {}