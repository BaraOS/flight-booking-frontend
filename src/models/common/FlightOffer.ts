import { TravelerType } from "../request/FlightOfferSearchRequest";

export interface FlightOffer {
  type: string;
  id: string;
  source?: string;
  instantTicketingRequired?: boolean;
  disablePricing?: boolean;
  nonHomogeneous?: boolean;
  oneWay?: boolean;
  isUpsellOffer?: boolean;
  paymentCardRequired?: boolean;
  lastTicketingDate?: string;
  lastTicketingDateTime?: string;
  numberOfBookableSeats?: number;
  itineraries?: Itinerary[];
  price?: SearchPrice;
  pricingOptions?: PricingOptions;
  validatingAirlineCodes?: string[];
  travelerPricings?: TravelerPricing[];
  choiceProbability?: string;
  fareRules?: FareRules;
}

interface Description {
  descriptionType: string;
  text: string;
}

interface TermAndCondition {
  category: string;
  circumstances: string;
  notApplicable: boolean;
  maxPenaltyAmount: string;
  descriptions: Description[];
}

interface FareRules {
  currency: string;
  rules: TermAndCondition[];
}

interface Amenity {
  description: string;
  isChargeable: string;
  amenityType: string;
  amenityProvider: AmenityProvider;
}

interface AmenityProvider {
  name: string;
}

interface AdditionalServiceRequest {
  chargeableCheckedBags?: BaggageAllowance;
  chargeableSeatNumber?: string;
  otherServices?: string[];
}

interface BaggageAllowance {
  quantity?: number;
  weight?: number;
  weightUnit?: string;
}

interface AllotmentDetails {
  tourName: string;
  tourReference: string;
}

interface FareDetailsBySegment {
  segmentId: string;
  cabin?: string;
  fareBasis?: string;
  brandedFare?: string;
  brandedFareLabel?: string;
  class?: string;
  segmentClass?: string;
  isAllotment?: boolean;
  allotmentDetails?: AllotmentDetails;
  sliceDiceIndicator?: string;
  includedCheckedBags?: BaggageAllowance;
  additionalServices?: AdditionalServiceRequest;
  amenities?: Amenity[];
  mealServices?: MealService[];
}

export interface TravelerPricing {
  travelerId: string;
  fareOption: string;
  travelerType: TravelerType;
  associatedAdultId?: string;
  price?: SearchPrice;
  fareDetailsBySegment: FareDetailsBySegment[];
}

interface PricingOptions {
  includedCheckedBagsOnly?: boolean;
  fareType?: string[];
  corporateCodes?: string[];
  refundableFare?: boolean;
  noRestrictionFare?: boolean;
  noPenaltyFare?: boolean;
}

interface AdditionalService {
  amount: string;
  type: string;
}

interface Tax {
  amount: string;
  code: string;
}

interface Fee {
  amount: string;
  type: string;
}

interface SearchPrice {
  currency?: string;
  total?: string;
  base?: string;
  fees?: Fee[];
  grandTotal?: string;
  taxes?: Tax[];
  refundableTaxes?: string;
  margin?: string;
  billingCurrency?: string;
  additionalServices?: AdditionalService[];
}

interface Aircraft {
  code: string;
}

interface AirportInfo {
  iataCode?: string;
  terminal?: string;
  at?: string;
}

interface Co2Emissions {
  weight: string;
  weightUnit: string;
  cabin: string;
}

interface FlightStop {
  iataCode: string;
  duration: string;
  arrivalAt: string;
  departureAt: string;
}

interface OperatingFlight {
  carrierCode: string;
}

interface SearchSegment {
  departure?: AirportInfo;
  arrival?: AirportInfo;
  carrierCode?: string;
  number?: string;
  aircraft?: Aircraft;
  operating?: OperatingFlight;
  duration?: string;
  stops?: FlightStop[];
  bookingStatus?: BookingStatus;
  segmentType?: SegmentType;
  isFlown?: boolean;
  id?: string;
  numberOfStops?: number;
  blacklistedInEU?: boolean;
  co2Emissions?: Co2Emissions[];
}

interface Itinerary {
  duration?: string;
  segments: SearchSegment[];
}

interface MealService {
  label: string;
}

enum BookingStatus {
  CONFIRMED = "CONFIRMED",
  WAITLISTED = "WAITLISTED",
  CANCELLED = "CANCELLED",
  PENDING = "PENDING",
  DENIED = "DENIED",
}

enum SegmentType {
  ACTIVE = "ACTIVE",
  PASSIVE = "PASSIVE",
  GHOST = "GHOST",
  STAFF = "STAFF",
}
