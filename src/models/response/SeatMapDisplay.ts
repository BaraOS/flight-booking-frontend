import { Issue } from "../common/Issue";
import { LocationValue } from "../common/LocationValue";
import { Meta } from "../common/Meta";

export interface SeatMapDisplay {
  meta: Meta;
  data: SeatMap[];
  warnings: Issue[];
  dictionaries: SeatMapDictionaries;
}

export interface SeatMap {
  type: string;
  id: string;
  self: Link;
  departure: FlightEndPoint;
  arrival: FlightEndPoint;
  carrierCode: string;
  number: string;
  operating: OperatingFlight;
  aircraft: AircraftEquipment;
  class: string;
  flightOfferId: string;
  segmentId: string;
  decks: Deck[];
  aircraftCabinAmenities: AircraftCabinAmenities;
  availableSeatsCounters: AvailableSeatsCounter[];
}

interface OperatingFlight {
  carrierCode: string;
  number: string;
  suffix: string;
}

interface Link {
  href: string;
  methods: Methods;
  count: number;
}

interface QualifiedFreeText {
  text: string;
  lang: string;
}

interface Media {
  title: string;
  href: string;
  description: QualifiedFreeText;
  mediaType: MediaType;
}

interface AvailableSeatsCounter {
  travelerId: string;
  value: number;
}

interface DeckConfiguration {
  width: number;
  length: number;
  startSeatRow: number;
  endSeatRow: number;
  startWingsX: number;
  endWingsX: number;
  startWingsRow: number;
  endWingsRow: number;
  exitRowsX: number[];
}

interface AmenityEntertainment {
  isChargeable: boolean;
  entertainmentType: EntertainmentType;
}

interface AmenityFood {
  isChargeable: boolean;
  foodType: FoodType;
}

interface AmenityBeverage {
  isChargeable: boolean;
  beverageType: BeverageType;
}

interface AmenityPower {
  isChargeable: boolean;
  powerType: PowerType;
  usbType: USBType;
}

interface AmenitySeat {
  legSpace: number;
  spaceUnit: SpaceUnit;
  tilt: Tilt;
  amenityType: AmenityType;
  medias: Media[];
}

interface AircraftCabinAmenities {
  power: AmenityPower;
  seat: AmenitySeat;
  wifi: AmenityWifi;
  entertainment: AmenityEntertainment[];
  food: AmenityFood;
  beverage: AmenityBeverage;
}

export interface Deck {
  deckType: DeckType;
  deckConfiguration: DeckConfiguration;
  facilities: Facility[];
  seats: Seat[];
}

export interface Facility {
  code: string;
  column: string;
  row: string;
  position: Position;
  coordinates: CoordinatesInterface;
}

// enum Coordinates {
//   x,
//   y,
// }

export interface Seat {
  cabin: string;
  number: string;
  characteristicsCodes: string[];
  travelerPricing: SeatMapTravelerPricing[];
  coordinates: CoordinatesInterface;
}

interface SeatMapTravelerPricing {
  travelerId: string;
  seatAvailabilityStatus: SeatAvailabilityStatus;
  price: Price;
}

interface Price {
  currency: string;
  total: string;
  base: string;
  fees: Fee[];
  taxes: Tax[];
}

interface Fee {
  amount: string;
  type: FeeType;
}

interface Tax {
  amount: string;
  code: string;
}

interface CoordinatesInterface {
  x: number;
  y: number;
}

interface FlightEndPoint {
  iataCode: string;
  terminal: string;
  at: string;
}

interface AircraftEquipment {
  code: string;
}

export interface SeatMapDictionaries {
  locations?: { [key: string]: LocationValue };
  facilities?: { [key: string]: string };
  seatCharacteristics?: { [key: string]: string };
}

interface AmenityWifi {
  isChargeable: boolean;
  wifiCoverage: WifiCoverage;
}

enum BeverageType {
  ALCOHOLIC = "ALCOHOLIC",
  NON_ALCOHOLIC = "NON_ALCOHOLIC",
  ALCOHOLIC_AND_NON_ALCOHOLIC = "ALCOHOLIC_AND_NON_ALCOHOLIC",
}

enum Position {
  FRONT = "FRONT",
  REAR = "REAR",
  SEAT = "SEAT",
}

enum WifiCoverage {
  FULL = "FULL",
  PARTIAL = "PARTIAL",
}

enum PowerType {
  PLUG = "PLUG",
  USB_PORT = "USB_PORT",
  ADAPTOR = "ADAPTOR",
  PLUG_OR_USB_PORT = "PLUG_OR_USB_PORT",
}
enum USBType {
  USB_A = "USB_A",
  USB_C = "USB_C",
  USB_A_AND_USB_C = "USB_A_AND_USB_C",
}

enum SpaceUnit {
  INCHES = "INCHES",
  CENTIMENTERS = "CENTIMENTERS",
}
enum Tilt {
  FULL_FLAT = "FULL_FLAT",
  ANGLE_FLAT = "ANGLE_FLAT",
  NORMAL = "NORMAL",
}
enum AmenityType {
  SEAT = "SEAT",
}

enum FoodType {
  MEAL = "MEAL",
  FRESH_MEAL = "FRESH_MEAL",
  SNACK = "SNACK",
  FRESH_SNACK = "FRESH_SNACK",
}

enum EntertainmentType {
  LIVE_TV = "LIVE_TV",
  MOVIES = "MOVIES",
  AUDIO_VIDEO_ON_DEMAND = "AUDIO_VIDEO_ON_DEMAND",
  TV_SHOWS = "TV_SHOWS",
  IP_TV = "IP_TV",
}

enum MediaType {
  application = "application",
  audio = "audio",
  font = "font",
  example = "example",
  image = "image",
  message = "message",
  model = "model",
  multipart = "multipart",
  text = "text",
  video = "video",
}

enum Methods {
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
  POST = "POST",
  PATCH = "PATCH",
}

export enum SeatAvailabilityStatus {
  AVAILABLE = "AVAILABLE",
  BLOCKED = "BLOCKED",
  OCCUPIED = "OCCUPIED",
}

enum DeckType {
  UPPER = "UPPER",
  MAIN = "MAIN",
  LOWER = "LOWER",
}

enum FeeType {
  TICKETING = "TICKETING",
  FORM_OF_PAYMENT = "FORM_OF_PAYMENT",
  SUPPLIER = "SUPPLIER",
}
