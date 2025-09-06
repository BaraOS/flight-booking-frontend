import { Travelers } from "@/models/flightSearch";
import { flightSearchApi } from "@/store/flightSearch/flightSearchService";
import { updateRequestPayload } from "@/store/flightSearch/flightSearchSlice";
import { AppDispatch, RootState } from "@/store/store";
import { generateFlightSearchRequestFromURL } from "@/utils/requestGenerator";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import FlightOfferCard from "./FlightOfferCard";
import { PaginationWithLinks } from "../ui/PaginationWithLinks";
import { skipToken } from "@reduxjs/toolkit/query";
import { IResponse } from "@/models/response/Response";
import LoadingCard from "./LoadingCard";
import Error from "../ui/Error";

const FlightOfferSearch = () => {
  const [searchParams] = useSearchParams();
  const { requestPayload, selectedCurrency } = useSelector((state: RootState) => ({
    requestPayload: state.flightSearch.requestPayload,
    selectedCurrency: state.flightSearch.selectedCurrency,
  }));

  const dispatch = useDispatch<AppDispatch>();

  const { data, isLoading, isFetching, isSuccess, error } = flightSearchApi.useFlightOffersQuery(
    requestPayload === undefined ? skipToken : requestPayload
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, _setPostsPerPage] = useState<number>(10);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  useEffect(() => {
    if (requestPayload === undefined) {
      console.log("requestPayload empty fetching generating new one from params");
      //make a new request based off url params if the requestPayload is empty
      let origin = searchParams.get("origin");
      let destination = searchParams.get("destination");
      let departureDate = searchParams.get("departureDate");
      let returnDate = searchParams.get("returnDate");
      let adult = searchParams.get("adult");
      let children = searchParams.get("children");
      let infantsOnLap = searchParams.get("infantsOnLap");
      let infantsOnSeat = searchParams.get("infantsOnSeat");
      let travelClass = searchParams.get("travelClass");

      if (origin && destination && departureDate && adult && children && infantsOnLap && infantsOnSeat && travelClass) {
        if (parseInt(adult) >= parseInt(infantsOnLap)) {
          let travelers: Travelers = {
            adults: parseInt(adult),
            children: parseInt(children),
            infantsOnLap: parseInt(infantsOnLap),
            infantsOnSeat: parseInt(infantsOnSeat),
          };
          let request = generateFlightSearchRequestFromURL(
            origin,
            destination,
            travelers,
            departureDate,
            returnDate || "",
            travelClass,
            selectedCurrency
          );
          dispatch(updateRequestPayload(request));
        } else {
          console.log("number of adults less than infantsOnLap");
        }
      } else {
        console.log("values missing");
      }
    }
  }, []);

  return (
    <>
      {isLoading || isFetching ? (
        <div className="flex flex-col items-center justify-center gap-5 py-4">
          {[...Array(4)].map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      ) : error && "data" in error ? (
        <Error message={(error.data as IResponse<void>).message! || "Error with flight search please try again"} />
      ) : data && isSuccess ? (
        data.data.meta.count > 0 ? (
          <>
            <section className="flex w-full flex-col">
              <div className="flex flex-col items-center justify-center gap-5 py-4">
                {data.data.data.slice(firstPostIndex, lastPostIndex).map((flight, index) => (
                  <FlightOfferCard key={index} data={flight} dictionaries={data.data.dictionaries} />
                ))}
              </div>
            </section>
            <section className="mt-auto py-2">
              <PaginationWithLinks
                totalCount={data.data.meta.count}
                pageSize={postsPerPage}
                page={currentPage}
                pageSelect={setCurrentPage}
              />
            </section>
          </>
        ) : (
          <Error message="No data found for this search. Please try again." />
        )
      ) : (
        <Error message="Problem fetching data. Please try again." />
      )}
    </>
  );
};

export default FlightOfferSearch;
