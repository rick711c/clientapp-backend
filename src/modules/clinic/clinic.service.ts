import { AddClinicDto } from './dto/addClinic.dto';
import { Injectable } from '@nestjs/common';
import { ClinicRepository } from './clinic.repository';
import { AddCheckupDayDto } from './dto/addCheckupDate.dto';
import { AddCheckupHourDto } from './dto/addCheckupHour.dto';
import { AppointmentService } from '../appointment/appointment.service';
import { AvailableSlot, DateWithDayId, HourAndSlot } from 'src/lib/interfaces/index.interface';
import { UtilService } from 'src/lib/utils/util.service';
import { daysOfWeekArray } from 'src/lib/enums';
import { json } from 'stream/consumers';
import { CommonService } from '../common/common.service';

@Injectable()
export class ClinicService {
  constructor(
    private repository: ClinicRepository,
    private appointmentService: AppointmentService,
    private utilService: UtilService,
    private commonService: CommonService
  ) {}

  async createClinic(addClinicDto: AddClinicDto) {
    try {
      addClinicDto.address = JSON.parse( addClinicDto.address)
      return this.repository.createClinic(addClinicDto);
    } catch (err) {
      throw err;
    }
  }

  async getClinicList() {
    try {
      return this.repository.getClinicList();
    } catch (err) {
      throw err;
    }
  }

  async addCheckupDay(checkupDayDto: AddCheckupDayDto) {
    try {
      return this.repository.addCheckupDay(checkupDayDto);
    } catch (err) {
      throw err;
    }
  }

  async addCheckupHour(checkupHourDto: AddCheckupHourDto) {
    try {
      return this.repository.addCheckupHour(checkupHourDto);
    } catch (err) {
      throw err;
    }
  }

  async getCheckupDayHours(clinicId: string) {
    try {
      return this.getCheckupDayHours(clinicId);
    } catch (err) {
      throw err;
    }
  }

  async getClinicDetails(clinicId: string) {
    try {
      const clinicDetails = await this.commonService.getClinicDetails(clinicId);
     
      return clinicDetails;
    } catch (err) {
      throw err;
    }
  }


  async getGroupedBookingData(clinicId: string, dayUpto: number) {
    try {
      const bookingData = await this.appointmentService.getGroupedBookingData(
        clinicId,
        dayUpto,
      );
      const dayAndHourInfo: any =
        await this.repository.getCheckupDayAndHours(clinicId);
      console.log('dayAndHourInfo', dayAndHourInfo);

      const dates: DateWithDayId[] = this.generateNextDays(dayUpto, dayAndHourInfo);
      console.log(dates);
      const availableSlots: AvailableSlot[] = [];

      for (let i: number = 0; i < dates.length; i++) {
        let slotInfo: AvailableSlot = {
          dayId:dates[i].dayId,
          date: dates[i].date,
          hourAndSlot: [],
        };

        //finding out the data for a perticular date from dates array. how many booking done for that date
        const matchedDates = bookingData.filter((item) => {
          if (item.bookingDate === slotInfo.date) {
            return item;
          }
        });

        //use a map to find the count of booking per hourId for the current slotinfo date
        let map = new Map();

        for (let j = 0; j < matchedDates.length; j++) {
          let key = matchedDates[j].bookingHourId;
          if (map.has(key)) {
            map.set(key, map.get(key) + 1);
          } else {
            // Key is not present in the map, so create a new entry with value 0
            map.set(key, 1);
          }
        }

        //making entries for those hourId , for which no booking are done yet
        const day = daysOfWeekArray[new Date(slotInfo.date).getDay()];
        const dayAndHourInfoForCurrentDate = dayAndHourInfo.filter(
          (item) =>item.checkupDay === day 
        );
        console.log('dayAndHourInfoForCurrentDate', dayAndHourInfoForCurrentDate)
        for (let j = 0; j < dayAndHourInfoForCurrentDate.length; j++) {
          if (!map.has(dayAndHourInfoForCurrentDate[j].hourId)) {
            map.set(dayAndHourInfoForCurrentDate[j].hourId, 0);
          }
        }

        console.log('map', map);
        //now iterate throw the map to find how many remaining slots available for the perticular hourId
        map.forEach((value: number, key: string) => {

          const data = dayAndHourInfo.find((item) => item.hourId === key);
          let hourAndSlotInfo:HourAndSlot={
            hour: data.checkupHour,
            availableSlots: data.slots - value,
            hourId: data.hourId,
          }
          slotInfo.hourAndSlot.push(hourAndSlotInfo);
        });
        availableSlots.push(slotInfo);
      }

      // console.log(dates);
      // console.log(availableSlots);
      return availableSlots;
    } catch (err) {
      throw err;
    }
  }

  generateNextDays(daysUpto: number, dayAndHourInfo: any): DateWithDayId[] {
    const currentDate = new Date(); // Get current date
    currentDate.setHours(0, 0, 0, 0);

    let days: string[] = dayAndHourInfo.map(
      (appointment) => appointment.checkupDay,
    );
    let dayIds: string[] = dayAndHourInfo.map(
      (appointment) => appointment.dayId
    )

    const dates: DateWithDayId[] = [];
    let count: number = 0;
    let i = 0;

    while (count < daysUpto) {
      const nextDate = new Date(
        currentDate.getTime() + i * 24 * 60 * 60 * 1000,
      ); // Add i days
      const index = days.indexOf(daysOfWeekArray[nextDate.getDay()]);
      if (index !== -1) {
        
         {  this.utilService.formatDateToYYYYMMDD(nextDate.toLocaleDateString());}
        const obj:DateWithDayId={
          date:this.utilService.formatDateToYYYYMMDD(nextDate.toLocaleDateString()) ,
          dayId: dayIds[index]
        }
        dates.push(obj);
        count++;
      }
      i++;
    }
    console.log('dates from genaratir funtion', dates);
    return dates;
  }


}
