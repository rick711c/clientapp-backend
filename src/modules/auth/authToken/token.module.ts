import { Module } from "@nestjs/common";
import { TokenController } from "./token.controller";
import { TokenRepository } from "./token.repository";
import { TokenService } from "./token.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccessToken } from "src/lib/entities/accessToken.entity";
import { RefreshToken } from "src/lib/entities/refreshToken.entity";

@Module({
    imports:[ TypeOrmModule.forFeature([AccessToken,RefreshToken])],
    controllers:[TokenController],
    providers:[TokenRepository,TokenService],
    exports:[TokenService]
})
export class TokenModule{}