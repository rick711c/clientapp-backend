import { UUID } from 'crypto';

//from the currentUser () decorator , we will recive userInfo, which is same as an object of this class.
export interface CurrentUserInfo {
  userId: UUID;
  username: string;
  fullname: string;
  phoneNumber: string;
  email: string;
  roles: {
    roleId: string;
    name: string;
    description: string;
  }[];
}

export interface ClinicAddress {
  address: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  landmark: string;
}

export interface AvailableSlot {
  dayId: string;
  date: string;
  hourAndSlot: HourAndSlot[];
}

export interface HourAndSlot {
  hourId: string;
  hour: string;
  availableSlots: number;
}

export interface DateWithDayId {
  date: string;
  dayId: string;
}

export interface DoctorInfo {
  fullname: string;
  specialization: string;
  education: string;
}

export interface PatientInfo {
  fullname: string;
  age: number;
  gender: string;
}
