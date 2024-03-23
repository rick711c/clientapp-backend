import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRole } from "src/lib/entities/userRole.entity";
import { AddUserRoleDto } from "./dto/addUserRole.dto";

export class UserRoleRepository {
    constructor(
        @InjectRepository(UserRole)
        private repository: Repository<UserRole>
    ){}

    async addUserRole(createUserRoleDto:AddUserRoleDto){
        try{
           const newUserRole = this.repository.create(createUserRoleDto);
           return this.repository.save(newUserRole); 
        }
        catch(err){
            throw err;
        }
    }
}