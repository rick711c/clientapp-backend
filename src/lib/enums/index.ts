export enum UserRolesEnum {
  CUSTOMER = 'customer',
  DISTRIBUTOR = 'distributor',
  OWNER = 'owner',
}

export enum LoginMethod {
  OTP_BASED = 'otp_based',
  PASSWORD_BASED = 'password_based',
}

export enum DaysOfWeek {
  Sunday = 'Sunday',
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
}

export enum Gender{
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

export const daysOfWeekArray: string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export enum AppointmentStatus
{
  Upcoming = 0,
  Completed = 1,
  Cancelled = 2,
}

