import { FlightOfferSearchRequest, Source, TravelerType } from "@/models/request/FlightOfferSearchRequest";
import { FlightSearchForm, Travelers } from "@/models/flightSearch";

export const generateFlightSearchRequest = (values: FlightSearchForm, currency: string): FlightOfferSearchRequest => {
  var request = {} as FlightOfferSearchRequest;
  let originDestinationIds: string[] = [];
  request.currencyCode = currency ?? "USD";
  request.originDestinations = [];
  for (let i = 0; i <= values.destinations.length - 1; i++) {
    request.originDestinations.push({
      id: (i + 1).toString(),
      originLocationCode: values.destinations[i].origin,
      destinationLocationCode: values.destinations[i].destination,
      departureDateTimeRange: {
        date: values.destinations[i].departureDate,
      },
    });
    originDestinationIds.push((i + 1).toString());
  }

  request.travelers = [];
  let current = 1;
  for (let i = 0; i < values.travelers.adults; i++) {
    request.travelers.push({
      id: current.toString(),
      travelerType: TravelerType.ADULT,
    });
    current++;
  }
  for (let i = 0; i < values.travelers.children; i++) {
    request.travelers.push({
      id: current.toString(),
      travelerType: TravelerType.CHILD,
    });
    current++;
  }
  for (let i = 0; i < values.travelers.infantsOnLap; i++) {
    request.travelers.push({
      id: current.toString(),
      travelerType: TravelerType.HELD_INFANT,
      associatedAdultId: request.travelers[i].id.toString(),
    });
    current++;
  }
  for (let i = 0; i < values.travelers.infantsOnSeat; i++) {
    request.travelers.push({
      id: current.toString(),
      travelerType: TravelerType.SEATED_INFANT,
    });
    current++;
  }

  request.sources = [Source.GDS];
  if (values.travelClass != undefined) {
    request.searchCriteria = {
      flightFilters: {
        cabinRestrictions: [
          {
            cabin: values.travelClass,
            originDestinationIds: originDestinationIds,
          },
        ],
      },
    };
  }

  console.log(request);
  return request;
};

export const generateFlightSearchRequestFromURL = (
  origin: string,
  destination: string,
  travelers: Travelers,
  departureDate: string,
  returnDate: string,
  travelClass: string,
  currency: string
): FlightOfferSearchRequest => {
  var request = {} as FlightOfferSearchRequest;

  request.currencyCode = currency ?? "USD";
  request.originDestinations = [
    {
      id: "1",
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDateTimeRange: {
        date: departureDate,
      },
    },
  ];

  if (returnDate != "") {
    request.originDestinations.push({
      id: "2",
      originLocationCode: destination,
      destinationLocationCode: origin,
      departureDateTimeRange: {
        date: returnDate,
      },
    });
  }

  request.travelers = [];
  let current = 1;
  for (let i = 0; i < travelers.adults; i++) {
    request.travelers.push({
      id: current.toString(),
      travelerType: TravelerType.ADULT,
    });
    current++;
  }
  for (let i = 0; i < travelers.children; i++) {
    request.travelers.push({
      id: current.toString(),
      travelerType: TravelerType.CHILD,
    });
    current++;
  }
  for (let i = 0; i < travelers.infantsOnLap; i++) {
    request.travelers.push({
      id: current.toString(),
      travelerType: TravelerType.HELD_INFANT,
      associatedAdultId: request.travelers[i].id.toString(),
    });
    current++;
  }
  for (let i = 0; i < travelers.infantsOnSeat; i++) {
    request.travelers.push({
      id: current.toString(),
      travelerType: TravelerType.SEATED_INFANT,
    });
    current++;
  }

  request.sources = [Source.GDS];

  console.log(request);
  return request;
};
