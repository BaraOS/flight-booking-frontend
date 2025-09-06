import { Name } from "./Name";

export interface Contact {
  addresseeName?: Name;
  address?: Address;
  language?: string;
  purpose?: Purpose;
  phones?: Phone[];
  companyName?: string;
  emailAddress?: string;
}

interface Address {
  lines?: string[];
  postalCode?: string;
  countryCode?: string;
  cityName?: string;
  stateName?: string;
  postalBox?: string;
}

interface Phone {
  deviceType?: PhoneDeviceType;
  countryCallingCode?: string;
  number?: string;
}

export enum Purpose {
  STANDARD = "STANDARD",
  INVOICE = "INVOICE",
  STANDARD_WITHOUT_TRANSMISSION = "STANDARD_WITHOUT_TRANSMISSION",
}

export enum PhoneDeviceType {
  MOBILE = "MOBILE",
  LANDLINE = "LANDLINE",
  FAX = "FAX",
}
