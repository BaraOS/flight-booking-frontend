import { FlightOfferDictionaries } from "@/models/common/FlightOfferDictionaries";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogFooter } from "../ui/dialog";
import { FlightOffer } from "@/models/common/FlightOffer";
import { formatDuration, formatISOToTime } from "@/utils/utils";
import { FC, useRef } from "react";
import FlightOfferDetails from "../ui/FlightOfferDetails";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { updateSelectedFlightOffer } from "@/store/flightSearch/flightSearchSlice";
import { useNavigate } from "react-router-dom";
import { questionMark } from "@/assets/icons";

interface FlightOfferCardProps {
  data: FlightOffer;
  dictionaries: FlightOfferDictionaries;
}

const FlightOfferCard: FC<FlightOfferCardProps> = ({ data, dictionaries }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const imgRef = useRef<any>([]);

  const handleSelectFlightOffer = () => {
    dispatch(updateSelectedFlightOffer([data]));
    navigate("/price");
  };

  return (
    <>
      <Dialog>
        <DialogTrigger className="flex w-full justify-center sm:w-[800px]">
          {/* Flight Display Card */}
          <div className="relative mx-3 w-full sm:max-w-[800px]">
            <div className="flex w-full flex-col rounded-xl bg-white shadow-md sm:flex-row sm:shadow-sm">
              <div className="w-full px-4 sm:w-[75%] sm:pl-0 sm:pr-4">
                <div className="flex flex-col items-stretch justify-center">
                  {data.itineraries?.map((itinerary, itineraryIndex) => (
                    <div key={itineraryIndex}>
                      <div className={data.itineraries?.length! - 1 > 0 ? `h-[125px]` : `h-[250px]`}>
                        <div className="flex h-full items-center text-center">
                          <div className="flex-none pl-2 sm:pl-12">
                            <img
                              className="mx-auto block h-[75px] w-[75px]"
                              ref={(el) => (imgRef.current[itineraryIndex] = el)}
                              src={`./Logos/${itinerary.segments[0].carrierCode}.png`}
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = questionMark;
                              }}
                            />
                          </div>
                          <div className="flex-auto">
                            <h1 className="py-2 text-3xl font-bold">{itinerary.segments[0].departure?.iataCode}</h1>
                            <p className="text-primary">{formatISOToTime(itinerary.segments[0].departure?.at!)}</p>
                          </div>
                          <div className="flex-auto">
                            <p className="text-wrap text-sm text-primary">
                              {dictionaries.carriers![itinerary.segments[0].carrierCode!]}
                            </p>
                            <p className="font-semibold">{formatDuration(itinerary.duration!)}</p>
                            <p className="text-primary">
                              {itinerary.segments.length - 1 > 0
                                ? `Stops: ${itinerary.segments.length - 1}`
                                : "NON-STOP"}
                            </p>
                          </div>
                          <div className="flex-auto">
                            <h1 className="py-2 text-3xl font-bold">
                              {itinerary.segments[itinerary.segments.length - 1].arrival?.iataCode}
                            </h1>
                            <p className="text-primary">
                              {formatISOToTime(itinerary.segments[itinerary.segments.length - 1].arrival?.at!)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <hr className="mx-10 border-gray-200" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative w-full border-t border-dashed border-primary sm:w-[25%] sm:border-l sm:border-t-0">
                <div className="absolute -left-[10px] -top-[10px] h-[20px] w-[20px] rounded-full bg-gray-100 sm:-left-[10px] sm:-top-[12px]"></div>
                <div className="absolute -right-[10px] -top-[10px] h-[20px] w-[20px] rounded-full bg-gray-100 sm:-bottom-[12px] sm:-left-[10px] sm:top-auto"></div>
                <div className="flex items-center justify-center gap-4 py-8 sm:h-full sm:flex-col sm:py-0">
                  <h1 className="text-3xl font-semibold">
                    {data.price?.currency === "USD" ? "$" : ""}
                    {parseInt(data.price?.total ?? "")} {data.price?.currency != "USD" ? data.price?.currency : ""}
                  </h1>
                  <p className="max-w-[100px] text-wrap text-sm font-medium text-gray-500">
                    total price for all traveler(s)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-h-screen overflow-auto sm:min-w-[700px]">
          {/* Flight Details */}
          <DialogHeader>
            <DialogTitle>Your flight details</DialogTitle>
          </DialogHeader>
          <FlightOfferDetails data={data} dictionaries={dictionaries} />
          <hr />
          <DialogFooter>
            {/* Price and Flight Selector */}
            <div className="flex w-full items-center justify-between">
              <p className="text-xl font-semibold">
                {data.price?.currency === "USD" ? "$" : ""}
                {data.price?.grandTotal} {data.price?.currency != "USD" ? data.price?.currency : ""}
              </p>
              <Button onClick={handleSelectFlightOffer}>Select</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FlightOfferCard;
