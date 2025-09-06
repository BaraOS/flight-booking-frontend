import { FlightOffer } from "../common/FlightOffer";
import { FlightOfferDictionaries } from "../common/FlightOfferDictionaries";
import { Issue } from "../common/Issue";
import { Meta } from "../common/Meta";

export interface FlightOfferSearch {
  meta: Meta;
  warnings?: Issue;
  data: FlightOffer[];
  dictionaries: FlightOfferDictionaries;
}
