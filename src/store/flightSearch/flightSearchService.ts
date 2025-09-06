import { Http } from "@/utils/requestUtils";
import { baseUrl, isJsonContentType } from "@/utils/requestUtils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResponse } from "@/models/response/Response";
import { Location } from "@/models/response/AirportCitySearch";
import { Query } from "@/models/flightSearch";
import { FlightOfferSearch } from "@/models/response/FlightOfferSearch";
import { FlightOfferSearchRequest } from "@/models/request/FlightOfferSearchRequest";
import { FlightOfferPriceRequest } from "@/models/request/FlightOfferPriceRequest";
import { FlightOfferPrice } from "@/models/response/FlightOfferPrice";
import { SeatMapDisplay } from "@/models/response/SeatMapDisplay";
import { SeatMapDisplayRequest } from "@/models/request/SeatMapDisplayRequest";
import { FlightOrder } from "@/models/response/FlightOrder";
import { FlightCreateOrderRequest } from "@/models/request/FlightCreateOrderRequest";

export const flightSearchApi = createApi({
  reducerPath: "flightSearchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + "/flight",
    credentials: "include",
    isJsonContentType,
  }),
  endpoints: (builder) => ({
    airportCitySearch: builder.query<IResponse<Location[]>, Query>({
      query: ({ subType, keyword }) => ({
        url: `/airport?subType=${subType}&keyword=${keyword}`,
        method: Http.GET,
      }),
    }),
    flightOffers: builder.query<IResponse<FlightOfferSearch>, FlightOfferSearchRequest>({
      query: (flight) => ({
        url: "/search",
        method: Http.POST,
        body: flight,
      }),
    }),
    flightOfferPrice: builder.query<IResponse<FlightOfferPrice>, FlightOfferPriceRequest>({
      query: (price) => ({
        url: "/price",
        method: Http.POST,
        body: price,
      }),
    }),
    seatMapDisplay: builder.query<IResponse<SeatMapDisplay>, SeatMapDisplayRequest>({
      query: (seatMap) => ({
        url: "/seatMap",
        method: Http.POST,
        body: seatMap,
      }),
    }),
    createFlightOrder: builder.mutation<IResponse<FlightOrder>, FlightCreateOrderRequest>({
      query: (order) => ({
        url: "/order",
        method: Http.POST,
        body: order,
      }),
    }),
    getFlightOrder: builder.query<IResponse<FlightOrder>, string>({
      query: (id) => ({
        url: `/order/${id}`,
        method: Http.GET,
      }),
    }),
    deleteFlightOrder: builder.mutation<IResponse<string>, string>({
      query: (id) => ({
        url: `/order/${id}`,
        method: Http.DELETE,
      }),
    }),
  }),
});
