import { Module } from "@nestjs/common";
import { Appointment } from "src/lib/entities/appointment.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Patient } from "src/lib/entities/patient.entity";
import { User } from "src/lib/entities/user.entity";

import { UserRoleModule } from "../userRole/userRole.module";
import { UtilService } from "src/lib/utils/util.service";
import { TokenModule } from "../authToken/token.module";
import { OTP } from "src/lib/entities/otp.entity";
import { OTPRepository } from "./otp.repository";
import { OTPService } from "./otp.service";
import { OTPController } from "./otp.controller";

@Module({
    imports:[ TypeOrmModule.forFeature([OTP])],
    controllers:[OTPController],
    providers:[OTPRepository,OTPService,UtilService],
    exports:[OTPService],
})
export class OTPModule {}