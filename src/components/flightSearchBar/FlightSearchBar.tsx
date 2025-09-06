import PassengerSelector from "./PassengerSelector";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import TravelClassSelector from "./TravelClassSelector";
import { FlightSearchForm, TripType } from "@/models/flightSearch";
import { generateFlightSearchRequest } from "@/utils/requestGenerator";
import { useNavigate } from "react-router-dom";
import TripTypeSelector from "./TripTypeSelector";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RoundTrip from "./RoundTrip";
import OneWay from "./OneWay";
import { Form } from "../ui/form";
import MultiCity from "./MultiCity";
import { updateRequestPayload } from "@/store/flightSearch/flightSearchSlice";
import { TravelClass } from "@/models/request/FlightOfferSearchRequest";

const formSchema = z.object({
  trip: z.nativeEnum(TripType),
  travelClass: z.nativeEnum(TravelClass),
  travelers: z
    .object({
      adults: z.number().min(1, "Minimum number of adults required 1"),
      children: z.number().min(0),
      infantsOnLap: z.number().min(0),
      infantsOnSeat: z.number().min(0),
    })
    .refine((traveler) => traveler.infantsOnLap <= traveler.adults, {
      message: "The number of infants on lap cannot be greater than the number of adults",
      path: ["adults"],
    })
    .refine((traveler) => traveler.adults + traveler.children + traveler.infantsOnSeat <= 9, {
      message: "The total number of adults, children and infants on seat cannot exceed 9",
      path: ["adults"],
    })
    .refine((traveler) => traveler.adults + traveler.children + traveler.infantsOnSeat + traveler.infantsOnLap <= 18, {
      message: "The total number of passengers cannot exceed 18",
      path: ["adults"],
    }),
  destinations: z.array(
    z.object({
      origin: z.string().min(3).max(3),
      destination: z.string().min(3).max(3),
      departureDate: z.string(),
    })
  ),
});

const FlightSearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const selectedCurrency = useSelector((state: RootState) => state.flightSearch.selectedCurrency);

  const form = useForm<FlightSearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trip: TripType.ROUND_TRIP,
      travelClass: TravelClass.ECONOMY,
      travelers: { adults: 0, children: 0, infantsOnLap: 0, infantsOnSeat: 0 },
      destinations: [],
    },
  });

  const handleFlightSearchRequest = (values: FlightSearchForm) => {
    console.log(values);
    let request = generateFlightSearchRequest(values, selectedCurrency);
    dispatch(updateRequestPayload(request));
    navigate(
      `/search?origin=${values.destinations[0].origin}&destination=${
        values.destinations[0].destination
      }&departureDate=${values.destinations[0].departureDate}&returnDate=${
        values.destinations[1]?.departureDate ?? ""
      }&adult=${values.travelers.adults}&children=${values.travelers.children}&infantsOnLap=${
        values.travelers.infantsOnLap
      }&infantsOnSeat=${values.travelers.infantsOnSeat}&travelClass=${values.travelClass}`
    );
  };

  return (
    <>
      <div className="mx-3 w-full max-w-[1200px] rounded-2xl bg-white px-2 py-4 shadow-lg sm:mx-[2rem]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFlightSearchRequest)}>
            <div className="flex items-center justify-start">
              <TripTypeSelector />
              <PassengerSelector />
              <TravelClassSelector />
            </div>

            <div className="">
              {form.getValues("trip") == TripType.ROUND_TRIP ? (
                <>
                  <RoundTrip />
                </>
              ) : form.getValues("trip") == TripType.MULTI_CITY ? (
                <>
                  <MultiCity />
                </>
              ) : (
                <>
                  <OneWay />
                </>
              )}
              <p className="text-red-700">{form.formState.errors.travelers?.adults?.message}</p>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default FlightSearchBar;
