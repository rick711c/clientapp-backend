import { Module } from "@nestjs/common";
import { Appointment } from "src/lib/entities/appointment.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PatientController } from "./patient.controller";
import { PatientService } from "./patient.service";
import { PatientRepository } from "./patient.repository";
import { Patient } from "src/lib/entities/patient.entity";

@Module({
    imports:[ TypeOrmModule.forFeature([Patient])],
    controllers:[PatientController],
    providers:[PatientService,PatientRepository],
    exports:[PatientService]
})
export class PatientModule {}