import { PartialType } from "@nestjs/swagger";
import { CreateAppointmentDto } from "./createAppointment.dto";
import { IsInt, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto){
    @IsUUID()
    appointmentId: string
}