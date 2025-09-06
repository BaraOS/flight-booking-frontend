import { questionMark } from "@/assets/icons";
import { FlightOffer } from "@/models/common/FlightOffer";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { FC } from "react";

const Price: FC<{ flightOffer: FlightOffer }> = ({ flightOffer }) => {
  return (
    <>
      <div className="flex">
        <div className="h-[100px] max-w-[200px] px-2">
          <h3 className="text-[18px] font-semibold">Price</h3>
          <p className="text-wrap text-sm text-gray-400">The total price with breakdown of all taxes and fees</p>
        </div>
        <div className="min-h-[100px] flex-auto border-l border-gray-200">
          <div className="grid gap-1 sm:grid-cols-3">
            {flightOffer.travelerPricings?.map((travelerPricing, index) => (
              <div className="border border-gray-200 px-2 py-1 text-sm" key={index}>
                <p className="font-semibold">
                  Traveler {travelerPricing.travelerId}: {travelerPricing.travelerType.replace("_", " ")}
                </p>
                <p>
                  Base: {travelerPricing.price?.currency === "USD" ? "$" : ""}
                  {travelerPricing.price?.base}{" "}
                  {travelerPricing.price?.currency != "USD" ? travelerPricing.price?.currency : ""}
                </p>
                <div className="flex gap-1">
                  <p>
                    Taxes: {travelerPricing.price?.currency === "USD" ? "$" : ""}
                    {travelerPricing.price?.taxes?.reduce((a, v) => (a = a + parseFloat(v.amount)), 0).toFixed(2)}{" "}
                    {travelerPricing.price?.currency != "USD" ? travelerPricing.price?.currency : ""}
                  </p>
                  {/* display breakdown of taxes */}
                  {travelerPricing.price?.taxes ? (
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <img src={questionMark} className="w-4" />
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <div className="flex flex-col gap-1">
                          <p className="text-center font-semibold">Taxes</p>
                          {travelerPricing.price.taxes.map((tax, taxIndex) => (
                            <p key={taxIndex}>
                              <span className="pl-3 font-bold">{tax.code}:</span> ${tax.amount}{" "}
                              {travelerPricing.price?.currency != "USD" ? travelerPricing.price?.currency : ""}
                            </p>
                          ))}
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ) : (
                    ""
                  )}
                </div>
                <p className="font-semibold">
                  Total: {travelerPricing.price?.currency === "USD" ? "$" : ""}
                  {travelerPricing.price?.total}
                  {travelerPricing.price?.currency != "USD" ? travelerPricing.price?.currency : ""}
                </p>
              </div>
            ))}
            <div className="border border-gray-200 px-2 py-1 text-sm">
              <p>
                Base: {flightOffer.price?.currency === "USD" ? "$" : ""}
                {flightOffer.price?.base} {flightOffer.price?.currency != "USD" ? flightOffer.price?.currency : ""}
              </p>
              <p>
                Total: {flightOffer.price?.currency === "USD" ? "$" : ""}
                {flightOffer.price?.total} {flightOffer.price?.currency != "USD" ? flightOffer.price?.currency : ""}
              </p>
              <div className="flex gap-1">
                <p>
                  Additional Services:
                  {flightOffer.price?.additionalServices ? (
                    <>
                      {flightOffer.price.currency === "USD" ? "$" : ""}
                      {flightOffer.price.additionalServices
                        ?.reduce((a, v) => (a = a + parseFloat(v.amount)), 0)
                        .toFixed(2)}{" "}
                      {flightOffer.price.currency != "USD" ? flightOffer.price.currency : ""}
                    </>
                  ) : (
                    ""
                  )}
                </p>
                {/* display breakdown of additional services */}
                {flightOffer.price?.additionalServices ? (
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <img src={questionMark} className="w-4" />
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <div className="flex flex-col gap-1">
                        <p className="text-center font-semibold">Additional Services</p>
                        {flightOffer.price.additionalServices.map((additionalService, index) => (
                          <p key={index}>
                            <span className="pl-3 font-bold">{additionalService.type}:</span> $
                            {additionalService.amount}
                          </p>
                        ))}
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ) : (
                  ""
                )}
              </div>
              <p className="font-semibold">
                Grand Total: {flightOffer.price?.currency === "USD" ? "$" : ""} {flightOffer.price?.grandTotal}{" "}
                {flightOffer.price?.currency != "USD" ? flightOffer.price?.currency : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Price;
