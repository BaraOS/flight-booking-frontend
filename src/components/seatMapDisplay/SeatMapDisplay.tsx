import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FC, useEffect, useState } from "react";
import SeatMap from "./SeatMap";
import { FlightOffer } from "@/models/common/FlightOffer";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addBookedSeat,
  clearBookedSeats,
  setCurrentPassenger,
  setCurrentPlane,
  setPassengers,
  setPlanes,
  setSelectedSeat,
  setTravelerSeatMap,
  resetTravelerSeatMapByPlane,
  setSeatMapDictionaries,
} from "@/store/flightSearch/seatMapSlice";
import { TravelerType } from "@/models/request/FlightOfferSearchRequest";
import { updateSelectedFlightOffer } from "@/store/flightSearch/flightSearchSlice";
import { flightSearchApi } from "@/store/flightSearch/flightSearchService";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { IResponse } from "@/models/response/Response";
import { arrowLeft, arrowRight, plane } from "@/assets/icons";
import Error from "../ui/Error";
import LoadingCard from "../ui/LoadingCard";

const SeatMapDisplay: FC<{ flightOffer: FlightOffer }> = ({ flightOffer }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { passengers, planes, currentPlane, currentPassenger, selectedSeat, bookedSeats, travelerSeatMap } =
    useSelector((state: RootState) => ({
      passengers: state.seatMap.passengers,
      planes: state.seatMap.planes,
      currentPlane: state.seatMap.currentPlane,
      currentPassenger: state.seatMap.currentPassenger,
      selectedSeat: state.seatMap.selectedSeat,
      bookedSeats: state.seatMap.bookedSeats,
      travelerSeatMap: state.seatMap.travelerSeatMap,
      selectedFlightOffer: state.flightSearch.selectedFlightOffers,
    }));
  const [load, setLoad] = useState(false);

  const { data, isLoading, isSuccess, error } = flightSearchApi.useSeatMapDisplayQuery(
    flightOffer != undefined && load
      ? {
          data: [flightOffer],
        }
      : skipToken
  );

  useEffect(() => {
    let passengers: number[] = [];
    if (flightOffer.travelerPricings != undefined) {
      flightOffer.travelerPricings.map((travelerPricing, index) => {
        if (travelerPricing.travelerType != TravelerType.HELD_INFANT) {
          passengers.push(index);
        }
      });
    }

    let planesCounter: number[] = [];
    if (data?.data) {
      for (let i = 0; i < data?.data.data.length; i++) {
        planesCounter.push(i);
      }
    }

    dispatch(setPassengers(passengers));
    dispatch(setCurrentPassenger(passengers[0]));
    dispatch(setPlanes(planesCounter));
    dispatch(setCurrentPlane(planesCounter[0]));
    if (data) {
      dispatch(setSeatMapDictionaries(data?.data.dictionaries));
    }
  }, [data]);

  const handleSelectSeat = () => {
    let test = structuredClone(travelerSeatMap);
    if (test[currentPlane] != undefined) {
      test[currentPlane].travelerSeats.push({ traveler: currentPassenger.toString(), seat: selectedSeat });
    } else {
      test.push({
        currentPlane: currentPlane,
        travelerSeats: [{ traveler: currentPassenger.toString(), seat: selectedSeat }],
      });
    }
    dispatch(setTravelerSeatMap(test));
    dispatch(addBookedSeat(selectedSeat));
    dispatch(setCurrentPassenger(currentPassenger + 1));
    dispatch(setSelectedSeat(""));
  };

  useEffect(() => {
    if (travelerSeatMap[currentPlane]) {
      travelerSeatMap[currentPlane].travelerSeats.map((travelerSeat) => {
        dispatch(addBookedSeat(travelerSeat.seat));
      });
    }
  }, [currentPlane]);

  const handleNextPlane = () => {
    if (currentPlane < planes.length - 1) {
      dispatch(setCurrentPlane(currentPlane + 1));
      dispatch(setCurrentPassenger(passengers[0]));
      dispatch(clearBookedSeats());
      dispatch(setSelectedSeat(""));
    }
  };

  const handlePreviousPlane = () => {
    if (currentPlane > 0) {
      dispatch(setCurrentPlane(currentPlane - 1));
      dispatch(clearBookedSeats());
      dispatch(setSelectedSeat(""));
    }
  };

  const handleResetSelection = () => {
    dispatch(resetTravelerSeatMapByPlane(currentPlane));
    dispatch(clearBookedSeats());
    dispatch(setCurrentPassenger(passengers[0]));
    dispatch(setSelectedSeat(""));
  };

  const handleSaveChanges = () => {
    let test = structuredClone(flightOffer);

    if (test != undefined) {
      travelerSeatMap.map((item) => {
        if (test.travelerPricings) {
          test.travelerPricings.map((travelerPricing, index) => {
            if (item.travelerSeats[index] != undefined) {
              if (travelerPricing.fareDetailsBySegment[item.currentPlane].additionalServices != undefined) {
                travelerPricing.fareDetailsBySegment[item.currentPlane]!.additionalServices!.chargeableSeatNumber =
                  item.travelerSeats[index].seat;
              } else {
                travelerPricing.fareDetailsBySegment[item.currentPlane].additionalServices = {
                  chargeableSeatNumber: item.travelerSeats[index].seat,
                };
              }
            }
          });
        }
      });
      dispatch(updateSelectedFlightOffer([test]));
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setLoad(true)}>
            Select Seats
          </Button>
        </DialogTrigger>
        <DialogContent className="flex min-h-full flex-col sm:min-w-full">
          <>
            {isLoading ? (
              <>
                <div className="flex w-full flex-col items-center justify-center gap-8 py-10">
                  {[...Array(6)].map((_, index) => (
                    <LoadingCard key={index} />
                  ))}
                </div>
              </>
            ) : error && "data" in error ? (
              <Error
                message={(error.data as IResponse<void>).message || "Error with seat map display, please try again."}
              />
            ) : data && isSuccess ? (
              <>
                <DialogHeader>
                  <DialogTitle className="text-center">Seat Selector</DialogTitle>
                  {flightOffer.travelerPricings && flightOffer.travelerPricings[currentPassenger] ? (
                    <h3 className="text-center text-lg">
                      Traveler:{" "}
                      <span className="font-semibold">
                        {flightOffer.travelerPricings[currentPassenger].travelerType}{" "}
                        {flightOffer.travelerPricings[currentPassenger].travelerId}
                      </span>
                    </h3>
                  ) : (
                    ""
                  )}
                  {data.data.data[currentPlane] ? (
                    <div className="flex items-center justify-center gap-1 text-lg">
                      <span>Flight:</span>
                      <span className="font-semibold">{data?.data.data[currentPlane].departure.iataCode}</span>
                      <img src={plane} className="rotate-90" />
                      <span className="font-semibold">{data?.data.data[currentPlane].arrival.iataCode}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </DialogHeader>
                {data.data.data[currentPlane] ? <SeatMap data={data.data.data[currentPlane]} /> : ""}
                <DialogFooter>
                  <div className="flex w-full flex-col justify-center gap-3 sm:flex-row">
                    {/* Previous Plane */}
                    <Button disabled={currentPlane > 0 ? false : true} onClick={handlePreviousPlane}>
                      <img src={arrowLeft} className="w-4" />
                    </Button>
                    {/* Next Plane */}
                    <Button disabled={currentPlane < planes.length - 1 ? false : true} onClick={handleNextPlane}>
                      <img src={arrowRight} className="w-4" />
                    </Button>
                    {/* Select Seat */}
                    <Button
                      disabled={
                        selectedSeat != "" &&
                        currentPassenger <= passengers.length - 1 &&
                        bookedSeats.length <= passengers.length - 1
                          ? false
                          : true
                      }
                      onClick={handleSelectSeat}
                    >
                      Book Seat
                    </Button>
                    {/* Save Changes */}
                    <Button disabled={currentPlane >= planes.length - 1 ? false : true} onClick={handleSaveChanges}>
                      Save
                    </Button>
                    {/* Reset Selection */}
                    <Button disabled={bookedSeats.length > 0 ? false : true} onClick={handleResetSelection}>
                      Reset Selections
                    </Button>
                  </div>
                </DialogFooter>
              </>
            ) : (
              <Error message="Error fetching data, please try again." />
            )}
          </>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SeatMapDisplay;
