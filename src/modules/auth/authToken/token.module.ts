import { Module } from "@nestjs/common";
import { TokenController } from "./token.controller";
import { TokenRepository } from "./token.repository";
import { TokenService } from "./token.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccessToken } from "src/lib/entities/accessToken.entity";
import { RefreshToken } from "src/lib/entities/refreshToken.entity";
import { CommonUserModule } from "../shared/userCommon/user-common.module";
import { CommonRoleModule } from "../shared/roleCommon/role-common.module.ts";
import { CommonUserRoleModule } from "../shared/userRoleCommon/userRole-common.module";

@Module({
    imports:[ TypeOrmModule.forFeature([AccessToken,RefreshToken]),CommonUserModule,CommonRoleModule,CommonUserRoleModule],
    controllers:[TokenController],
    providers:[TokenRepository,TokenService],
    exports:[TokenService]
})
export class TokenModule{}