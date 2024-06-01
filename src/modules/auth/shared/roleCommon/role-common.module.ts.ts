import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "src/lib/entities/role.entity";
import { CommonRoleRepository } from "./role-common.repository";
import { CommonRoleService } from "./role-common.service";


@Module({
    imports:[TypeOrmModule.forFeature([Role])],
    providers:[CommonRoleService,CommonRoleRepository],
    exports:[CommonRoleService]

})
export class CommonRoleModule{

}