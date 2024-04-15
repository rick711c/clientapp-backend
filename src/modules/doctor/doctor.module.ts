import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Doctor } from "src/lib/entities/doctor.entity";
import { DoctorController } from "./doctor.controller";
import { DoctorRepository } from "./doctor.repository";
import { DoctorService } from "./doctor.service";

@Module({
    imports:[TypeOrmModule.forFeature([Doctor])],
    controllers:[DoctorController],
    providers:[DoctorService, DoctorRepository],
    exports:[DoctorService]
})
export class DoctorModule {}