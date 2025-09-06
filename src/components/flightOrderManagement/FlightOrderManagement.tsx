import { flightSearchApi } from "@/store/flightSearch/flightSearchService";
import { skipToken } from "@reduxjs/toolkit/query";
import { useNavigate, useParams } from "react-router-dom";
import FlightOfferDetails from "../ui/FlightOfferDetails";
import LoadingCard from "../ui/LoadingCard";
import { IResponse } from "@/models/response/Response";
import Error from "../ui/Error";
import Price from "../flightOfferPrice/Price";
import { Button } from "../ui/button";

const FlightOrderManagement = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isFetching, isSuccess, error } = flightSearchApi.useGetFlightOrderQuery(
    orderId ?? skipToken
  );

  const [deleteOrder, { data: deleteData, isLoading: deleteLoading, isSuccess: deleteSuccess }] =
    flightSearchApi.useDeleteFlightOrderMutation();

  return (
    <div className="flex w-full flex-col items-center justify-center px-4">
      {deleteLoading ? (
        <LoadingCard />
      ) : error && "data" in error ? (
        <Error message={(error.data as IResponse<void>).message || "Error deleting flight order, please try again."} />
      ) : deleteData && deleteSuccess ? (
        <div className="flex h-[300px] w-[900px] flex-col items-center justify-center gap-4 rounded-lg bg-white shadow-lg">
          <h1 className="text-2xl font-semibold">Order Deleted Succesfully</h1>
          <Button onClick={() => navigate("/")}>Return to Home</Button>
        </div>
      ) : (
        <>
          {isLoading || isFetching ? (
            <LoadingCard />
          ) : error && "data" in error ? (
            <Error
              message={(error.data as IResponse<void>).message || "Error fetching flight order, please try again."}
            />
          ) : data && isSuccess ? (
            <>
              <div className="">
                <div className="flex min-h-screen max-w-[900px] flex-col">
                  <FlightOfferDetails data={data.data.data.flightOffers[0]} dictionaries={data.data.dictionaries} />
                  <Price flightOffer={data.data.data.flightOffers[0]} />
                </div>
                <div className="flex items-center justify-end py-2">
                  <Button variant="destructive" onClick={() => (orderId != undefined ? deleteOrder(orderId) : "")}>
                    Cancel Order
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <Error message="No data found for this order, please try again." />
          )}
        </>
      )}
    </div>
  );
};

export default FlightOrderManagement;
