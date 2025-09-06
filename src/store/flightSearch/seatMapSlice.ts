import { TravelerSeatMap } from "@/models/flightSearch";
import { SeatMapDictionaries } from "@/models/response/SeatMapDisplay";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SeatMapState {
  currentPlane: number;
  currentPassenger: number;
  passengers: number[];
  planes: number[];
  selectedSeat: string;
  bookedSeats: string[];
  travelerSeatMap: TravelerSeatMap[];
  seatMapDictionaries: SeatMapDictionaries;
}

const initialState: SeatMapState = {
  currentPlane: 0,
  currentPassenger: 0,
  passengers: [],
  planes: [],
  selectedSeat: "",
  bookedSeats: [],
  travelerSeatMap: [],
  seatMapDictionaries: {},
};

const seatMapSlice = createSlice({
  name: "seatMap",
  initialState,
  reducers: {
    setCurrentPlane: (state, action: PayloadAction<number>) => {
      state.currentPlane = action.payload;
    },
    setCurrentPassenger: (state, action: PayloadAction<number>) => {
      state.currentPassenger = action.payload;
    },
    setPassengers: (state, action: PayloadAction<number[]>) => {
      state.passengers = action.payload;
    },
    setPlanes: (state, action: PayloadAction<number[]>) => {
      state.planes = action.payload;
    },
    setSelectedSeat: (state, action: PayloadAction<string>) => {
      state.selectedSeat = action.payload;
    },
    addBookedSeat: (state, action: PayloadAction<string>) => {
      state.bookedSeats.push(action.payload);
    },
    clearBookedSeats: (state) => {
      state.bookedSeats = [];
    },
    setTravelerSeatMap: (state, action: PayloadAction<TravelerSeatMap[]>) => {
      state.travelerSeatMap = action.payload;
    },
    clearTravelerSeatMap: (state) => {
      state.travelerSeatMap = [];
    },
    resetTravelerSeatMapByPlane: (state, action: PayloadAction<number>) => {
      state.travelerSeatMap[action.payload].travelerSeats = [];
    },
    setSeatMapDictionaries: (state, action: PayloadAction<SeatMapDictionaries>) => {
      state.seatMapDictionaries = action.payload;
    },
  },
});

export const {
  setCurrentPlane,
  setCurrentPassenger,
  setPassengers,
  setPlanes,
  setSelectedSeat,
  addBookedSeat,
  clearBookedSeats,
  setTravelerSeatMap,
  clearTravelerSeatMap,
  resetTravelerSeatMapByPlane,
  setSeatMapDictionaries,
} = seatMapSlice.actions;

export default seatMapSlice.reducer;
