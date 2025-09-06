import { LocationValue } from "./LocationValue";

export interface FlightOfferDictionaries {
  locations: { [key: string]: LocationValue };
  aircraft?: { [key: string]: string };
  currencies?: { [key: string]: string };
  carriers?: { [key: string]: string };
}
