import { FlightOfferSearchRequest } from "@/models/request/FlightOfferSearchRequest";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FlightOffer } from "@/models/common/FlightOffer";
import { FlightOfferPrice } from "@/models/response/FlightOfferPrice";

interface FlightSearchState {
  requestPayload: FlightOfferSearchRequest | undefined;
  selectedFlightOffers: FlightOffer[] | undefined;
  selectedFlightOfferPrice: FlightOfferPrice | undefined;
  selectedCurrency: string;
}

const initialState: FlightSearchState = {
  requestPayload: undefined,
  selectedFlightOffers: undefined,
  selectedFlightOfferPrice: undefined,
  selectedCurrency: "USD",
};

const flightSearchSlice = createSlice({
  name: "flightSearch",
  initialState,
  reducers: {
    updateRequestPayload: (state, action: PayloadAction<FlightOfferSearchRequest>) => {
      state.requestPayload = action.payload;
    },
    updateSelectedFlightOffer: (state, action: PayloadAction<FlightOffer[]>) => {
      state.selectedFlightOffers = action.payload;
    },
    updateSelectedFlightOfferPrice: (state, action: PayloadAction<FlightOfferPrice>) => {
      state.selectedFlightOfferPrice = action.payload;
    },
    updateSelectedCurrency: (state, action: PayloadAction<string>) => {
      state.selectedCurrency = action.payload;
      if (state.requestPayload != undefined) {
        state.requestPayload.currencyCode = action.payload;
      }
      if (state.selectedFlightOffers != undefined && state.selectedFlightOffers[0].price != undefined) {
        state.selectedFlightOffers[0].price.currency = action.payload;
      }
    },
  },
});

export const {
  updateRequestPayload,
  updateSelectedFlightOffer,
  updateSelectedFlightOfferPrice,
  updateSelectedCurrency,
} = flightSearchSlice.actions;

export default flightSearchSlice.reducer;
