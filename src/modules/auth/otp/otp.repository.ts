import { InjectRepository } from "@nestjs/typeorm";
import { OTP } from "src/lib/entities/otp.entity";
import { Repository } from "typeorm";
import { SaveOTPDto } from "./dto/saveOTP.dto";

export class OTPRepository{
    constructor(
        @InjectRepository(OTP)
        private readonly repository:Repository<OTP>
    ){}

    async saveOTP(saveOTPdto:SaveOTPDto){
        try{
            const newOTP = this.repository.create(saveOTPdto);
            return this.repository.save(newOTP);
        }catch(e){
            throw e;
        }
    }


    async getOTP(phoneNo:string,otp:string){
        try{
            const res = await this.repository
            .createQueryBuilder('o')
            .select('o.enOTP as enOTP')
            .where('o.phoneNo = :phoneNo',{phoneNo})
            .andWhere('o.expiryTime >= :currentDate', { currentDate: new Date() })
            .andWhere('o.isUsed = :isUsed', { isUsed:0})
            .getRawOne();
            return res?.enOTP;
        }catch(e){
            throw e;
        }
    }

    async updateUsedStatus(value:number)
    {
        try{
            const res = await this.repository
            .createQueryBuilder()
            .update(OTP)
            .set({isUsed:value})
            .execute();
            return res;
        }catch(e){
            throw e;
        }
    }
}