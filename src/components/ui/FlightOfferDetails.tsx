import { bagIcon, questionMark } from "@/assets/icons";
import { FlightOffer } from "@/models/common/FlightOffer";
import { FlightOfferDictionaries } from "@/models/common/FlightOfferDictionaries";
import { TravelerType } from "@/models/request/FlightOfferSearchRequest";
import { formatDuration, formatISOToDate, getLayoverTime } from "@/utils/utils";
import { FC, useEffect, useRef, useState } from "react";

interface FlightOfferDetailsProps {
  data: FlightOffer;
  dictionaries: FlightOfferDictionaries | undefined;
}

const FlightOfferDetails: FC<FlightOfferDetailsProps> = ({ data, dictionaries }) => {
  const [bagCount, setBagCount] = useState(0);
  const [additionalBag, setAdditonalbag] = useState(0);
  const imgRef = useRef<any>([]);

  useEffect(() => {
    if (data.travelerPricings) {
      let count = 0;
      let additional = 0;
      for (let i = 0; i <= data.travelerPricings?.length - 1; i++) {
        if (data.travelerPricings[i].travelerType != TravelerType.HELD_INFANT) {
          count += data.travelerPricings[i].fareDetailsBySegment[0].includedCheckedBags?.quantity ?? 0;
          if (data.travelerPricings[i].fareDetailsBySegment[0].additionalServices?.chargeableCheckedBags?.quantity) {
            additional++;
          }
        }
      }
      setBagCount(count);
      setAdditonalbag(additional);
    }
  }, [data]);

  return (
    <>
      {data.itineraries?.map((itinerary, itineraryIndex) => (
        <section className="mt-3" key={itineraryIndex}>
          <div className="py-4">
            <h4 className="font-semibold">
              Flight to{" "}
              {dictionaries?.locations[itinerary.segments[itinerary.segments.length - 1]?.arrival?.iataCode ?? ""]
                .cityCode ?? ""}
            </h4>
            <p className="text-xs font-medium text-gray-500">
              {itinerary.segments.length - 1 > 0 ? `${itinerary.segments.length - 1} Stop(s)` : "NON-STOP"}
              {itinerary.duration ? <>• {formatDuration(itinerary.duration)}</> : ""}
            </p>
          </div>

          {itinerary.segments.map((segment, index) => (
            <div key={index}>
              <div className="flex flex-row gap-4">
                <section className="flex flex-col items-center justify-center gap-2">
                  <div className="mt-1 h-[20px] w-[20px] rounded-full border border-primary"></div>
                  <div className="h-[40px] border-l border-primary"></div>
                  <div className="h-[20px] w-[20px] rounded-full border border-primary"></div>
                  {itinerary.segments.length > index + 1 ? (
                    <div className="h-[80px] border-l border-dashed border-primary"></div>
                  ) : (
                    ""
                  )}
                </section>
                <section className="flex flex-auto flex-col gap-8">
                  <div className="">
                    <p className="text-xs font-medium text-gray-500">
                      {segment.departure?.at ? formatISOToDate(segment.departure?.at) : ""}
                    </p>
                    <p className="font-semibold">{segment.departure?.iataCode}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">
                      {segment.arrival?.at ? formatISOToDate(segment.arrival?.at) : ""}
                    </p>
                    <p className="font-semibold">{segment.arrival?.iataCode}</p>
                  </div>
                  {itinerary.segments.length > index + 1 ? (
                    <div className="font-medium text-gray-500">
                      layover :{" "}
                      {getLayoverTime(segment.arrival?.at ?? "", itinerary.segments[index + 1].departure?.at ?? "")}
                    </div>
                  ) : (
                    ""
                  )}
                </section>
                <section className="w-[250px]">
                  <div className="flex items-center justify-start gap-3">
                    <img
                      className="block h-[40px] w-[40px]"
                      ref={(el) => (imgRef.current[index] = el)}
                      src={`/Logos/${itinerary.segments[index].carrierCode}.png`}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = questionMark;
                      }}
                    />
                    <div className="text-xs font-medium text-gray-500">
                      <p>
                        {dictionaries?.carriers && segment.carrierCode
                          ? dictionaries.carriers[segment.carrierCode]
                          : ""}
                      </p>
                      <p>
                        {segment.carrierCode}
                        {segment.aircraft?.code} • {data.travelerPricings?.[0].fareDetailsBySegment[index].cabin}
                      </p>
                      <p className="">Flight time {segment.duration ? formatDuration(segment.duration) : ""}</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          ))}
        </section>
      ))}
      <hr className="mt-4" />
      {/* Baggage Details  */}
      <section className="flex">
        <div className="h-[100px] max-w-[200px] px-2">
          <h3 className="text-[18px] font-semibold">Baggage</h3>
          <p className="text-wrap text-sm text-gray-400">The total baggage included in the price</p>
        </div>
        <div className="h-[100px] flex-auto border-l border-gray-200">
          <div className="flex justify-between gap-10 p-2">
            <div className="flex items-center justify-center gap-2">
              <img src={bagIcon} className="w-6" />

              <p className="text-wrap text-sm text-gray-500">{bagCount} checked bags</p>
            </div>
            <p className="text-green-700">Included</p>
          </div>
          {additionalBag > 0 ? (
            <div className="flex justify-between gap-10 p-2">
              <div className="flex items-center justify-center gap-2">
                <img src={bagIcon} className="w-6" />
                <p className="text-wrap text-sm text-gray-500">{additionalBag} additional checked bags</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
};

export default FlightOfferDetails;
