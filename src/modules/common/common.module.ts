import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Appointment } from "src/lib/entities/appointment.entity";
import { Clinic } from "src/lib/entities/clinic.entity";
import { Doctor } from "src/lib/entities/doctor.entity";
import { Patient } from "src/lib/entities/patient.entity";
import { CommonService } from "./common.service";
import { CommonRepository } from "./common.repository";

@Module({
    imports:[TypeOrmModule.forFeature([Doctor,Patient,Clinic,Appointment])],
    providers:[CommonService,CommonRepository],
    exports:[CommonService]
})
export class CommonModule{}