import { Module } from "@nestjs/common";
import { AppointmentEntity } from "src/lib/entities/appointment.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PatientEntity } from "src/lib/entities/paitent.entity";
import { PatientController } from "./patient.controller";
import { PatientService } from "./patient.service";
import { PatientRepository } from "./patient.repository";

@Module({
    imports:[ TypeOrmModule.forFeature([PatientEntity])],
    controllers:[PatientController],
    providers:[PatientService,PatientRepository]
})
export class PatinetModule {}