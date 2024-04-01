import { AddClinicDto } from './dto/addClinic.dto';
import { Injectable } from '@nestjs/common';
import { ClinicRepository } from './clinic.repository';
import { AddCheckupDayDto } from './dto/addCheckupDate.dto';
import { AddCheckupHourDto } from './dto/addCheckupHour.dto';
import { AppointmentService } from '../appointment/appointment.service';
import { AvailableSlot } from 'src/lib/interfaces/index.interface';

@Injectable()
export class ClinicService {
  constructor(
    private repository: ClinicRepository,
    private appointmentService: AppointmentService,
  ) {}

  async createClinic(addClinicDto: AddClinicDto) {
    try {
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
      const clinicDetails = await this.repository.getClinicDetails(clinicId);
      // const checkupDateTime =
      //   await this.repository.getCheckupDayAndHours(clinicId);
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
      const dayAndHourInfo =
        await this.repository.getCheckupDayAndHours(clinicId);

      const dates: Date[] = this.generateNextDays(dayUpto, dayAndHourInfo);

      const availableSlots: AvailableSlot[] = [];

      for (let i: number = 0; i < dates.length; i++) {
        let slotInfo: AvailableSlot = {
          date: dates[i],
          hour: '',
          availableSlots: 0,
        };

        //finding out the data for a perticular date from dates array. how many booking done for that date
        const matchedDates = bookingData.filter((item) => {
          if (item.bookingDate === dates[i]) {
            return item;
          }
        });

        //use a map to find the count of booking per hourId
        let map = new Map();
        if (matchedDates.length > 0) {
          for (let j = 0; i < matchedDates.length; j++) {
            let key = matchedDates[j].bookingHourId;
            if (map.has(key)) {
              map.set(key, map.get(key) + 1);
            } else {
              // Key is not present in the map, so create a new entry with value 0
              map.set(key, 1);
            }
          }
        }
        //making entries for those hourId , for which no booking are done yet
        for (let j = 0; j < dayAndHourInfo.length; j++) {
          if (!map.has(dayAndHourInfo[j].hourId)) {
            map.set(dayAndHourInfo[j].hourId, 0);
          }
        }
       
        //now iterate throw the map to find how many remaining slots available for the perticular hourId
        map.forEach((value: number, key: string) => {
          const data = dayAndHourInfo.find((item) => item.hourId === key);

          const available = data.slots - value;
          slotInfo.availableSlots = available;
          slotInfo.hour = data.checkupHour;
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

  generateNextDays(daysUpto: number, dayAndHourInfo: any): Date[] {
    const currentDate = new Date(); // Get current date
    currentDate.setHours(0, 0, 0, 0);

    const daysOfWeek: string[] = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    let days: string = dayAndHourInfo.map(
      (appointment) => appointment.checkupDay,
    );

    const dates: Date[] = [];
    let count: number = 0;
    let i = 0;

    while (count < daysUpto) {
      const nextDate = new Date(
        currentDate.getTime() + i * 24 * 60 * 60 * 1000,
      ); // Add i days
      if (days.includes(daysOfWeek[nextDate.getDay()])) {
        dates.push(nextDate);
        count++;
      }
      i++;
    }

    return dates;
  }
}
