import { flightSearchApi } from "@/store/flightSearch/flightSearchService";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import FlightOfferDetails from "../ui/FlightOfferDetails";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { IResponse } from "@/models/response/Response";
import BaggageSelector from "./BaggageSelector";
import Price from "./Price";
import SeatMapDisplay from "../seatMapDisplay/SeatMapDisplay";
import { Button } from "@/components/ui/button";
import Error from "../ui/Error";
import LoadingCard from "../ui/LoadingCard";
import { updateSelectedFlightOfferPrice } from "@/store/flightSearch/flightSearchSlice";
import { useNavigate } from "react-router-dom";

const FlightOfferPrice = () => {
  const selectedFlightOffers = useSelector((state: RootState) => state.flightSearch.selectedFlightOffers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: data,
    isLoading,
    isFetching: fetching,
    isSuccess,
    error,
  } = flightSearchApi.useFlightOfferPriceQuery(
    selectedFlightOffers != undefined
      ? {
          data: {
            type: "flight-offers-pricing",
            flightOffers: selectedFlightOffers,
          },
        }
      : skipToken
  );

  const handleConfirmBooking = () => {
    if (data != undefined) {
      dispatch(updateSelectedFlightOfferPrice(data.data));
      navigate("/order");
    }
  };

  return (
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
          message={(error.data as IResponse<void>).message || "Error with flight price please try and search again"}
        />
      ) : data && isSuccess ? (
        <div className="flex w-full items-center justify-center px-4">
          <div className="flex w-[900px] flex-col">
            <FlightOfferDetails data={data.data.data.flightOffers[0]} dictionaries={data.data.dictionaries} />
            <hr />
            <section>
              {/* price breakdown   */}
              {fetching ? <LoadingCard /> : <Price flightOffer={data.data.data.flightOffers[0]} />}
            </section>
            <hr />
            <section className="my-2 flex flex-auto items-start justify-between">
              <div className="flex gap-2">
                {/* baggage and seat map selector  */}
                <BaggageSelector flightOffer={data.data.data.flightOffers[0]} />
                <SeatMapDisplay flightOffer={data.data.data.flightOffers[0]} />
              </div>
              <div>
                <Button onClick={handleConfirmBooking}>Confirm Booking</Button>
              </div>
            </section>
            <section>
              {/* warning messages from api */}
              {data.data.warnings ? (
                <>
                  {data.data.warnings.map((warning, index) => (
                    <p className="text-yellow-500" key={index}>
                      {warning.detail} seat selection limited
                    </p>
                  ))}
                </>
              ) : (
                ""
              )}
            </section>
          </div>
        </div>
      ) : (
        <Error message="Problem fetching data. Please try again." />
      )}
    </>
  );
};

export default FlightOfferPrice;
