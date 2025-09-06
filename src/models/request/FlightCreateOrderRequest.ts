import { AutomatedProcess } from "../common/AutomatedProcess";
import { Contact } from "../common/Contact";
import { FlightOffer } from "../common/FlightOffer";
import { FormOfIdentification } from "../common/FormOfIdentification";
import { Remarks } from "../common/Remarks";
import { Traveler, TravelerFormModel } from "../common/Traveler";

export interface FlightCreateOrderRequest {
  data: FlightCreateOrderData;
}

interface FlightCreateOrderData {
  type: string;
  queuingOfficeId?: string;
  ownerOfficeId?: string;
  flightOffers: FlightOffer[];
  travelers?: Traveler[] | TravelerFormModel[];
  remarks?: Remarks;
  ticketingAgreement?: TicketingAgreement;
  automatedProcess?: AutomatedProcess[];
  contacts?: Contact[];
  formOfIdentifications?: FormOfIdentification[];
}

interface TicketingAgreement {
  option: TicketingAgreementOption;
  delay: string;
}

enum TicketingAgreementOption {
  CONFIRM = "CONFIRM",
  DELAY_TO_QUEUE = "DELAY_TO_QUEUE",
  DELAY_TO_CANCEL = "DELAY_TO_CANCEL",
}
