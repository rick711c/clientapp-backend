import { Module } from "@nestjs/common";
import { Appointment } from "src/lib/entities/appointment.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Patient } from "src/lib/entities/patient.entity";
import { User } from "src/lib/entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { UserRoleModule } from "../userRole/userRole.module";
import { UtilService } from "src/lib/utils/util.service";
import { TokenModule } from "../authToken/token.module";
import { OTPModule } from "../otp/otp.module";
import { CommonUserModule } from "../shared/userCommon/user-common.module";

@Module({
    imports:[ TypeOrmModule.forFeature([User]),UserRoleModule,TokenModule,OTPModule,CommonUserModule],
    controllers:[UserController],
    providers:[UserService,UserRepository,UtilService]
})
export class UserModule {}