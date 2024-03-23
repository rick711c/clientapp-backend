import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/lib/entities/user.entity";
import { CreateUserDto } from "./dto/cerateUser.dto";

export class UserRepository {
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>
    ){}

    async registerUser(createUserDto:CreateUserDto){
        try{
           const newUser = this.repository.create(createUserDto);
           return this.repository.save(newUser); 
        }
        catch(err){
            throw err;
        }
    }
}