export interface FlightOfferSearchRequest {
  currencyCode: string;
  originDestinations: OriginDestination[];
  travelers: Traveler[];
  sources: Source[];
  searchCriteria?: SearchCriteria;
}

interface OriginDestination {
  id: string;
  originLocationCode: string;
  destinationLocationCode: string;
  includedConnectionPoints?: string[];
  excludedConnectionPoints?: string[];
  originRadius?: number;
  destinationRadius?: number;
  alternativeDestinationsCodes?: string[];
  departureDateTimeRange: DateTimeRange;
  arrivalDateTimeRange?: DateTimeRange;
}

interface DateTimeRange {
  date: string;
  time?: string;
  dateWindow?: string;
  timeWindow?: string;
}

interface Traveler {
  id: string;
  travelerType: TravelerType;
  associatedAdultId?: string;
}

export enum TravelerType {
  ADULT = "ADULT",
  CHILD = "CHILD",
  SENIOR = "SENIOR",
  YOUNG = "YOUNG",
  HELD_INFANT = "HELD_INFANT",
  SEATED_INFANT = "SEATED_INFANT",
  STUDENT = "STUDENT",
}

interface SearchCriteria {
  excludeAllotments?: boolean;
  addOneWayOffers?: boolean;
  maxFlightOffers?: number;
  maxPrice?: number;
  allowAlternativeFareOptions?: boolean;
  oneFlightOfferPerDay?: boolean;
  additionalInformation?: AdditionalInformation;
  pricingOptions?: PricingOptions;
  flightFilters?: FlightFilters;
}

interface AdditionalInformation {
  chargeableCheckedBags: boolean;
  brandedFares: boolean;
}

interface PricingOptions {
  includedCheckedBagsOnly: boolean;
  refundableFare: boolean;
  noRestrictionFare: boolean;
  noPenaltyFare: boolean;
}

interface FlightFilters {
  crossBorderAllowed?: boolean;
  moreOvernightsAllowed?: boolean;
  returnToDepartureAirport?: boolean;
  railSegmentAllowed?: boolean;
  busSegmentAllowed?: boolean;
  maxFlightTime?: number;
  carrierRestrictions?: CarrierRestrictions;
  cabinRestrictions?: CabinRestrictions[];
  connectionRestriction?: ConnectionRestriction;
}

interface CarrierRestrictions {
  blacklistedInEUAllowed: boolean;
  excludedCarrierCodes: string[];
  includedCarrierCodes: string[];
}

interface CabinRestrictions {
  cabin?: TravelClass;
  originDestinationIds?: string[];
  coverage?: Coverage;
}

export enum TravelClass {
  ECONOMY = "ECONOMY",
  PREMIUM_ECONOMY = "PREMIUM_ECONOMY",
  BUSINESS = "BUSINESS",
  FIRST = "FIRST",
}
enum Coverage {
  MOST_SEGMENTS,
  AT_LEAST_ONE_SEGMENT,
  ALL_SEGMENTS,
}

interface ConnectionRestriction {
  maxNumberOfConnections: number;
  nonStopPreferred: boolean;
  airportChangeAllowed: boolean;
  technicalStopsAllowed: boolean;
}

export enum Source {
  GDS = "GDS",
}
