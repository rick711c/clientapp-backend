import { Module } from "@nestjs/common";
import { Appointment } from "src/lib/entities/appointment.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Patient } from "src/lib/entities/patient.entity";
import { UserRole } from "src/lib/entities/userRole.entity";
import { UserRoleController } from "./userRole.controller";
import { UserRoleService } from "./userRole.service";
import { UserRoleRepository } from "./userRole.repository";

@Module({
    imports:[ TypeOrmModule.forFeature([UserRole])],
    controllers:[UserRoleController],
    providers:[UserRoleService,UserRoleRepository]
})
export class UserRoleModule {}