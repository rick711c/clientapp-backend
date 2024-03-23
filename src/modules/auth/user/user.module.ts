import { Module } from "@nestjs/common";
import { Appointment } from "src/lib/entities/appointment.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Patient } from "src/lib/entities/patient.entity";
import { User } from "src/lib/entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";

@Module({
    imports:[ TypeOrmModule.forFeature([User])],
    controllers:[UserController],
    providers:[UserService,UserRepository]
})
export class UserModule {}