import { Contact } from "./Contact";
import { Name } from "./Name";

export interface Traveler {
  id?: string;
  dateOfBirth?: string;
  gender?: Gender;
  name?: Name;
  documents?: Document[];
  emergencyContact?: EmergencyContact;
  loyaltyPrograms?: LoyaltyProgram[];
  discountEligibility?: Discount[];
  contact?: Contact;
}

interface Document {
  number: string;
  issuanceDate: string;
  expiryDate: string;
  issuanceCountry: string;
  issuanceLocation: string;
  nationality: string;
  birthPlace: string;
  documentType: DocumentType;
  validityCountry: string;
  birthCountry: string;
  holder: boolean;
}

interface EmergencyContact {
  addresseeName: string;
  countryCode: string;
  number: string;
  text: string;
}

interface LoyaltyProgram {
  programOwner: string;
  id: string;
}

interface Discount {
  subType: string;
  cityName: string;
  travelerType: DiscountTravelerType;
  cardNumber: string;
  certificateNumber: string;
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  UNSPECIFIED = "UNSPECIFIED",
  UNDISCLOSED = "UNDISCLOSED",
}

export enum DocumentType {
  VISA = "VISA",
  PASSPORT = "PASSPORT",
  IDENTITY_CARD = "IDENTITY CARD",
  KNOWN_TRAVELER = "KNOWN TRAVELER",
  REDRESS = "REDRESS",
}

enum DiscountTravelerType {
  SPANISH_CITIZEN = "SPANISH_CITIZEN",
  EUROPEAN_CITIZEN = "EUROPEAN_CITIZEN",
  GOVERNMENT_WORKER = "GOVERNMENT_WORKER",
  MILITARY = "MILITARY",
  MINOR_WITHOUT_ID = "MINOR_WITHOUT_ID",
}

export type TravelerFormModel = Pick<Traveler, "id" | "gender" | "dateOfBirth" | "name" | "documents" | "contact">;
