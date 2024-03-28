import { Body, Controller, Post } from '@nestjs/common';
import { CreatePatientDto } from './dto/createPatient.dto';
import { PatientService } from './patient.service';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { CurrentUserInfo } from 'src/lib/interfaces/userInfo.interface';

@Controller('/patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('/')
  async createPa(
    @CurrentUser() user: CurrentUserInfo,
    @Body() createPatientDto: CreatePatientDto,
  ) {
    try {
      return this.patientService.createPatient(user, createPatientDto);
    } catch (e) {
      throw e;
    }
  }
}
