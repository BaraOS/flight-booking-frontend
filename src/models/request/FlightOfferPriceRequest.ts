import { FlightOffer } from "../common/FlightOffer";
import { Traveler } from "../common/Traveler";

export interface FlightOfferPriceRequest {
  data: FlightOfferPriceData;
}

interface FlightOfferPriceData {
  type: string;
  flightOffers: FlightOffer[];
  payments?: Payment[];
  travelers?: Traveler[];
}

interface Payment {
  brand: PaymentBrand;
  binNumber: number;
  flightOfferIds: string[];
}

enum PaymentBrand {
  VISA,
  AMERICAN_EXPRESS,
  MASTERCARD,
  VISA_ELECTRON,
  VISA_DEBIT,
  MASTERCARD_DEBIT,
  MAESTRO,
  DINERS,
  MASTERCARD_IXARIS,
  VISA_IXARIS,
  MASTERCARD_AIRPLUS,
  UATP_AIRPLUS,
}
