import { FlightOffer } from "../common/FlightOffer";
import { FlightOfferDictionaries } from "../common/FlightOfferDictionaries";
import { Issue } from "../common/Issue";

export interface FlightOfferPrice {
  warnings?: Issue[];
  data: FlightOfferPricingOutput;
  included?: IncludedResourceMap;
  dictionaries?: FlightOfferDictionaries;
}

interface FlightOfferPricingOutput {
  type: string;
  flightOffers: FlightOffer[];
  bookingRequirements?: BookingRequirements;
}

interface BookingRequirements {
  invoiceAddressRequired?: boolean;
  mailingAddressRequired?: boolean;
  emailAddressRequired?: boolean;
  phoneCountryCodeRequired?: boolean;
  mobilePhoneNumberRequired?: boolean;
  phoneNumberRequired?: boolean;
  postalCodeRequired?: boolean;
  travelerRequirements?: PassengerConditions[];
}

interface PassengerConditions {
  travelerId: string;
  genderRequired: boolean;
  documentRequired: boolean;
  documentIssuanceCityRequired?: boolean;
  dateOfBirthRequired: boolean;
  redressRequiredIfAny?: boolean;
  airFranceDiscountRequired?: boolean;
  spanishResidentDiscountRequired?: boolean;
  residenceRequired: boolean;
}

interface IncludedResourceMap {
  creditCardFees: {
    [key: string]: CreditCardFee;
  };

  bags: {
    [key: string]: Bags;
  };

  otherServices: {
    [key: string]: Service;
  };

  detailedFareRules: {
    [key: string]: DetailedFareRules;
  };
}

interface DetailedFareRules {
  fareBasis: string;
  name: string;
  fareNotes: TermAndCondition;
  segmentId: string;
}

interface TermAndCondition {
  category: Category;
  circumstances: string;
  notApplicable: Boolean;
  maxPenaltyAmount: string;
  descriptions: Description[];
}

interface Description {
  descriptionType: string;
  text: string;
}

enum Category {
  REFUND,
  EXCHANGE,
  REVALIDATION,
  REISSUE,
  REBOOK,
  CANCELLATION,
}

interface ElementaryPrice {
  amount: string;
  currencyCode: string;
}

interface CreditCardFee {
  brand: PaymentBrand;
  amount: string;
  currency: string;
  flightOfferId: string;
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

interface Bags {
  quantity: number;
  weight: number;
  weightUnit: string;
  name: string;
  price: ElementaryPrice;
  bookableByItinerary: boolean;
  segmentIds: string[];
  travelerIds: string[];
}

interface Service {
  name: ServiceName;
  price: ElementaryPrice;
  bookableByTraveler: boolean;
  bookableByItinerary: boolean;
  segmentIds: string[];
  travelerIds: string[];
}

enum ServiceName {
  PRIORITY_BOARDING,
  AIRPORT_CHECKIN,
}
