import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FlightOffer } from "@/models/common/FlightOffer";
import { FC, useEffect, useState } from "react";
import { TravelerType } from "@/models/request/FlightOfferSearchRequest";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { updateSelectedFlightOffer } from "@/store/flightSearch/flightSearchSlice";

interface BaggageSelectorProps {
  flightOffer: FlightOffer;
}

interface TravelerBagCount {
  id: string;
  type: string;
  bags: number;
}

const BaggageSelector: FC<BaggageSelectorProps> = ({ flightOffer }) => {
  const [travelerBags, updateTravelerBags] = useState<TravelerBagCount[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let test: TravelerBagCount[] = [];
    if (flightOffer) {
      flightOffer.travelerPricings?.forEach((travelerPricing) => {
        if (travelerPricing.travelerType != TravelerType.HELD_INFANT) {
          if (
            travelerPricing.fareDetailsBySegment[0].additionalServices?.chargeableCheckedBags?.quantity === undefined
          ) {
            test.push({
              id: travelerPricing.travelerId,
              type: travelerPricing.travelerType,
              bags: 0,
            });
          } else {
            test.push({
              id: travelerPricing.travelerId,
              type: travelerPricing.travelerType,
              bags: travelerPricing.fareDetailsBySegment[0].additionalServices?.chargeableCheckedBags?.quantity,
            });
          }
        }
      });
    }
    updateTravelerBags(test);
  }, [flightOffer]);

  const handleUpdateBaggage = (value: number, id: string) => {
    updateTravelerBags((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, bags: item.bags + value } : item))
    );
  };

  const handleSaveChanges = () => {
    let test = structuredClone(flightOffer);
    if (test) {
      test.travelerPricings?.forEach((travelerPricing) => {
        travelerBags.map((item) => {
          if (item.id === travelerPricing.travelerId) {
            travelerPricing.fareDetailsBySegment.forEach((fareDetail) => {
              if (item.bags === 0) {
                if (fareDetail.additionalServices) {
                  fareDetail.additionalServices.chargeableCheckedBags = undefined;
                }
              } else {
                if (fareDetail.additionalServices) {
                  if (fareDetail.additionalServices.chargeableCheckedBags) {
                    if (fareDetail.additionalServices.chargeableCheckedBags.quantity) {
                      fareDetail.additionalServices.chargeableCheckedBags.quantity = item.bags;
                    }
                  } else {
                    fareDetail.additionalServices.chargeableCheckedBags = {
                      quantity: item.bags,
                    };
                  }
                } else {
                  fareDetail.additionalServices = {
                    chargeableCheckedBags: {
                      quantity: item.bags,
                    },
                  };
                }
              }
            });
          }
        });
      });
    }
    dispatch(updateSelectedFlightOffer([test]));
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add Bags</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Additional Bags</DialogTitle>
            <DialogDescription>Select additional bags to include for each traveler below</DialogDescription>
          </DialogHeader>
          <div className="">
            {travelerBags && travelerBags.length > 0
              ? travelerBags.map((travelerBag, index) => (
                  <div className="flex h-[50px] items-center justify-around gap-4" key={index}>
                    <p className="w-[80px]">
                      {travelerBag.type} {travelerBag.id}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button onClick={() => handleUpdateBaggage(1, travelerBag.id)}>+</Button>
                      {travelerBag.bags}
                      <Button onClick={() => handleUpdateBaggage(-1, travelerBag.id)}>-</Button>
                    </div>
                  </div>
                ))
              : ""}
          </div>
          <DialogFooter>
            <Button onClick={handleSaveChanges} className="w-full">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BaggageSelector;
