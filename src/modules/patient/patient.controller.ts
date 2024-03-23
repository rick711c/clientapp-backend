import { Body, Controller, Post } from "@nestjs/common";
import { CreatePatientDto } from "./dto/createPatient.dto";
import { PatientService } from "./patient.service";

@Controller('/patient')
export class PatientController{
    constructor(private readonly patientService: PatientService) {}
  
    @Post('/')
    async createPa(@Body() createPatientDto: CreatePatientDto) {
      try {
        return this.patientService.createPatient(createPatientDto);
      } catch (e) {
        throw e;
      }
    }
  }