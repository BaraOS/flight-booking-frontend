export interface FormOfIdentification {
  identificationType: IdentificationType;
  number: string;
  travelerIds: string[];
  flightOfferIds: string[];
}

enum IdentificationType {
  DRIVERS_LICENSE,
  PASSPORT,
  NATIONAL_IDENTITY_CARD,
  BOOKING_CONFIRMATION,
  TICKET,
  OTHER_ID,
}
