import { Contact, PhoneDeviceType, Purpose } from "./common/Contact";
import { DocumentType, Gender } from "./common/Traveler";
import { TravelClass } from "./request/FlightOfferSearchRequest";

export type Travelers = {
  adults: number;
  children: number;
  infantsOnLap: number;
  infantsOnSeat: number;
};

export enum TripType {
  ROUND_TRIP = "ROUND_TRIP",
  ONE_WAY = "ONE_WAY",
  MULTI_CITY = "MULTI_CITY",
}

export type valueSelector = {
  value: any;
  label: string;
}[];

export const tripValues: valueSelector = [
  {
    value: TripType.ROUND_TRIP,
    label: "Round Trip",
  },
  {
    value: TripType.ONE_WAY,
    label: "One Way",
  },
  {
    value: TripType.MULTI_CITY,
    label: "Multi City",
  },
];

export const travelClassValues: valueSelector = [
  {
    value: TravelClass.ECONOMY,
    label: "Economy",
  },
  {
    value: TravelClass.PREMIUM_ECONOMY,
    label: "Premium Economy",
  },
  {
    value: TravelClass.BUSINESS,
    label: "Business",
  },
  {
    value: TravelClass.FIRST,
    label: "First Class",
  },
];

export const genderSelector: valueSelector = Object.entries(Gender).map(([key, value]) => ({
  value: value,
  label: key,
}));

export const documentTypeSelector: valueSelector = Object.entries(DocumentType).map(([key, value]) => ({
  value: value,
  label: key,
}));

export const phoneDeviceTypeSelector: valueSelector = Object.entries(PhoneDeviceType).map(([key, value]) => ({
  value: value,
  label: key,
}));

export type Query = {
  subType: string;
  keyword: string;
};

export type TravelerSeatMap = {
  currentPlane: number;
  travelerSeats: TravelerSeat[];
};

type TravelerSeat = {
  traveler: string;
  seat: string;
};

export interface FlightSearchForm {
  trip?: TripType;
  travelClass: TravelClass;
  travelers: {
    adults: number;
    children: number;
    infantsOnLap: number;
    infantsOnSeat: number;
  };
  destinations: {
    origin: string;
    destination: string;
    departureDate: string;
  }[];
}

export const consolidatorContact: Contact[] = [
  {
    addresseeName: {
      firstName: "PABLO",
      lastName: "RODRIGUEZ",
    },
    companyName: "INCREIBLE VIAJES",
    purpose: Purpose.STANDARD,
    phones: [
      {
        deviceType: PhoneDeviceType.LANDLINE,
        countryCallingCode: "34",
        number: "480080071",
      },
      {
        deviceType: PhoneDeviceType.MOBILE,
        countryCallingCode: "33",
        number: "480080072",
      },
    ],
    emailAddress: "support@increibleviajes.es",
    address: {
      lines: ["Calle Prado, 16"],
      postalCode: "28014",
      cityName: "Madrid",
      countryCode: "ES",
    },
  },
];
