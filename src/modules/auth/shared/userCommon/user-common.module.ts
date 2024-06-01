import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/lib/entities/user.entity";
import { CommonUserService } from "./user-common.service";
import { CommonUserRepository } from "./user-common.repository";

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    providers:[CommonUserService,CommonUserRepository],
    exports:[CommonUserService]

})
export class CommonUserModule{

}