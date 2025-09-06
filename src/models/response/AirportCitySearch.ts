export interface Location {
  type: string;
  subType: string;
  name: string;
  detailedName: string;
  timeZoneOffset: string;
  iataCode: string;
  geoCode: GeoCode;
  address: Address;
  distance: Distance;
  analytics: Analytics;
  relevance: number;
}

interface Analytics {
  flights: Flights;
  travelers: Travelers;
}

interface Travelers {
  score: number;
}

interface Flights {
  score: number;
}

interface Distance {
  value: number;
  unit: string;
}

interface Address {
  cityName: string;
  cityCode: string;
  countryName: string;
  countryCode: string;
  regionCode: string;
}

interface GeoCode {
  latitude: number;
  longitude: number;
}
