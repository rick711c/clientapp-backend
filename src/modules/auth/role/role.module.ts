import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "src/lib/entities/role.entity";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { RoleRepository } from "./role.repository";

@Module({
    imports:[ TypeOrmModule.forFeature([Role])],
    controllers:[RoleController],
    providers:[RoleService,RoleRepository],
    exports:[RoleService]
})
export class RoleModule {}