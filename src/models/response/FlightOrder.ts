import { AutomatedProcess } from "../common/AutomatedProcess";
import { Contact } from "../common/Contact";
import { FlightOffer } from "../common/FlightOffer";
import { FlightOfferDictionaries } from "../common/FlightOfferDictionaries";
import { FormOfIdentification } from "../common/FormOfIdentification";
import { Issue } from "../common/Issue";
import { Meta } from "../common/Meta";
import { Remarks } from "../common/Remarks";
import { Traveler } from "../common/Traveler";

export interface FlightOrder {
  meta: Meta;
  warnings: Issue[];
  data: FlightOrderCreateQuery;
  dictionaries: FlightOfferDictionaries;
}

interface FlightOrderCreateQuery {
  type: string;
  id: string;
  queuingOfficeId: string;
  ownerOfficeId: string;
  associatedRecords: AssociatedRecord[];
  flightOffers: FlightOffer[];
  travelers: Traveler[];
  remarks: Remarks;
  formOfPayments: FormOfPayment[];
  ticketingAgreement: TicketingAgreement;
  automatedProcess: AutomatedProcess[];
  contacts: Contact[];
  tickets: AirTravelDocument[];
  formOfIdentifications: FormOfIdentification[];
}

interface AssociatedRecord {
  reference: string;
  creationDateTime: string;
  originSystemCode: string;
  flightOfferId: string;
}

interface FormOfPayment {
  b2bWallet: B2bWallet;
  creditCard: CreditCard;
  other: AltPayment;
}

interface B2bWallet {
  cardId: string;
  cardUsageName: string;
  cardFriendlyName: string;
  reportingData: ReportingData[];
  virtualCreditCardDetails: CreditCardCommon;
  flightOfferIds: String[];
}

interface CreditCard {
  brand: CreditCardBrand;
  holder: string;
  number: string;
  expiryDate: string;
  securityCode: string;
  flightOfferIds: String[];
}

interface AltPayment {
  method: OtherPaymentMethod;
  flightOfferIds: String[];
}

interface TicketingAgreement {
  option: TicketingAgreementOption;
  delay: string;
  dateTime: string;
  segmentIds: String[];
}

interface ReportingData {
  name: string;
  value: string;
}

interface CreditCardCommon {
  brand: CreditCardBrand;
  holder: string;
  number: string;
  expiryDate: string;
  amount: string;
  currencyCode: string;
}

interface AirTravelDocument {
  documentType: DocumentType;
  documentNumber: string;
  documentStatus: DocumentStatus;
  travelerId: string;
  segmentIds: String[];
}

enum DocumentType {
  ETICKET,
  PTICKET,
  EMD,
  MCO,
}
enum DocumentStatus {
  ISSUED,
  REFUNDED,
  VOID,
  ORIGINAL,
  EXCHANGED,
}
enum TicketingAgreementOption {
  CONFIRM,
  DELAY_TO_QUEUE,
  DELAY_TO_CANCEL,
}
enum OtherPaymentMethod {
  ACCOUNT,
  CHECK,
  CASH,
  NONREFUNDABLE,
}
enum CreditCardBrand {
  VISA,
  AMERICAN_EXPRESS,
  MASTERCARD,
  VISA_ELECTRON,
  VISA_DEBIT,
  MASTERCARD_DEBIT,
  MAESTRO,
  DINERS,
  EASYPAY,
}
