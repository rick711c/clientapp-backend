import { Repository } from "typeorm";
import { CreatePatientDto } from "./dto/createpaitent.dto";
import { PatientEntity } from "src/lib/entities/paitent.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class PatientRepository {
    constructor(
        @InjectRepository(PatientEntity)
        private repository: Repository<PatientEntity>
    ){}

    async createPatient(createpatientDto: CreatePatientDto){
        try{
            const newPatient = this.repository.create(createpatientDto);
            const res = await this.repository.save(newPatient);
            return res;
        }
        catch(err){
            throw err;
        }
    }
}