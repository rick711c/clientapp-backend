import { Injectable } from '@nestjs/common';
import { CommonRepository } from './common.repository';

@Injectable()
export class CommonService {
  constructor(private readonly commonRepo: CommonRepository) {}

  async getDoctorBasicInfo(doctorId: string) {
    try {
      return this.commonRepo.getDoctorBasicInfo(doctorId);
    } catch (err) {
      throw err;
    }
  }

  async getPatientBasicInfo(patientId: string) {
    try {
      return this.commonRepo.getPatientBasicInfo(patientId);
    } catch (err) {
      throw err;
    }
  }


  async getClinicAddress(clinicId:string) {
    try{
      const res = await this.commonRepo. getClinicAddress(clinicId);
      if(res)return res.address;
    }catch (err) {
      throw err;
    }
  }
}
