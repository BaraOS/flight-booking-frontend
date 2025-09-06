export interface Remarks {
  general: General[];
  airline: Airline[];
}

interface General {
  subType: GeneralRemarkType;
  category: string;
  text: string;
  travelerIds: string[];
  flightOfferIds: string[];
}

interface Airline {
  subType: AirlineRemarkType;
  keyword: string;
  airlineCode: string;
  text: string;
  travelerIds: string[];
  flightOfferIds: string[];
}

enum GeneralRemarkType {
  GENERAL_MISCELLANEOUS,
  CONFIDENTIAL,
  INVOICE,
  QUALITY_CONTROL,
  BACKOFFICE,
  FULFILLMENT,
  ITINERARY,
  TICKETING_MISCELLANEOUS,
  TOUR_CODE,
}

enum AirlineRemarkType {
  OTHER_SERVICE_INFORMATION,
  KEYWORD,
  OTHER_SERVICE,
  CLIENT_ID,
  ADVANCED_TICKET_TIME_LIMIT,
}
