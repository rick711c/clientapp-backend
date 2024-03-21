import { PartialType } from "@nestjs/swagger";
import { CreateAppointmentDto } from "./createAppointment.dto";
import { IsInt } from "class-validator";
import { UUID } from "crypto";

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto){
    @IsInt()
    appointmentId: UUID
}