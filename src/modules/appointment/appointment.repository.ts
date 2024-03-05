import { InjectRepository } from "@nestjs/typeorm";
import { AppointmentEntity } from "src/lib/entities/appointment.entity";
import { Repository } from "typeorm";
import { CreateAppointmentDto } from "./dto/createAppoiment.dto";

export class AppointmentRepository{

    constructor(
        @InjectRepository(AppointmentEntity)
        private readonly repo: Repository<AppointmentEntity>
    ){}

    async createAppointment(createAppointmentDto:CreateAppointmentDto){
        try{
            const newAppointment = this.repo.create(createAppointmentDto);
            const res = await this.repo.save(newAppointment);
            console.log('Appointment created successfully')
            return res;
        }catch(e){
            console.log('appointment cerating failed');
            throw e;
        }
    }
}