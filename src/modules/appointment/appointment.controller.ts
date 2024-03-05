import { CreateAppointmentDto } from "./dto/createAppoiment.dto";
import { AppointmentRepository } from "./appointment.repository";
import { AppointmentService } from "./appointment.service";
import { Body, Controller, Post } from "@nestjs/common";

@Controller('/appointment')
export class AppointmentController{

    constructor(
        
        private readonly service: AppointmentService
    ){}

    @Post('/')
    async createAppointment(@Body() createAppointmentDto:CreateAppointmentDto){
        try{
            return this.service.createAppointment(createAppointmentDto);
        }catch(e){
            throw e;
        }
    }
}