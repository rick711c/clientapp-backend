import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRole } from "src/lib/entities/userRole.entity";
import { CommonUserRoleService } from "./userRole-common.service";
import { CommonUserRoleRepository } from "./userRole-common.repository";

@Module({
    imports:[TypeOrmModule.forFeature([UserRole])],
    providers:[CommonUserRoleService,CommonUserRoleRepository],
    exports:[CommonUserRoleService]

})
export class CommonUserRoleModule{

}