import { CreateAppointmentDto } from "./dto/createAppoiment.dto";
import { AppointmentRepository } from "./appointment.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppointmentService{

    constructor(
        
        private readonly repo: AppointmentRepository
    ){}

    async createAppointment(createAppointmentDto:CreateAppointmentDto){
        try{
            return this.repo.createAppointment(createAppointmentDto);
        }catch(e){
            throw e;
        }
    }
}