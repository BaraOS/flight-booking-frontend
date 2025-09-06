import { z } from "zod";
import { DocumentType, Gender, TravelerFormModel } from "@/models/common/Traveler";
import { PhoneDeviceType } from "@/models/common/Contact";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import TravelerForm from "./TravelerForm";
import DocumentForm from "./DocumentForm";
import { flightSearchApi } from "@/store/flightSearch/flightSearchService";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { FlightCreateOrderRequest } from "@/models/request/FlightCreateOrderRequest";
import ContactForm from "./ContactForm";
import { consolidatorContact } from "@/models/flightSearch";
import Error from "../ui/Error";
import { IResponse } from "@/models/response/Response";
import LoadingCard from "../ui/LoadingCard";
import { clipboard } from "@/assets/icons";

const formSchema = z.object({
  travelers: z.array(
    z.object({
      id: z.string().optional(),
      gender: z.nativeEnum(Gender),
      dateOfBirth: z.string().date("yyyy-mm-dd"),
      name: z.object({
        firstName: z.string().min(1).max(50),
        middleName: z.string().min(0).max(50).optional(),
        lastName: z.string().min(1).max(50),
        secondLastName: z.string().min(0).max(50).optional(),
      }),
      documents: z.array(
        z.object({
          number: z.string().min(1),
          issuanceDate: z.string().date("yyyy-mm-dd"),
          expiryDate: z.string().date("yyyy-mm-dd"),
          issuanceCountry: z.string().min(2).max(2),
          issuanceLocation: z.string().min(2).max(50),
          nationality: z.string().min(2).max(2),
          birthPlace: z.string().min(2).max(50),
          documentType: z.nativeEnum(DocumentType),
          validityCountry: z.string().min(2).max(2),
          birthCountry: z.string().min(2).max(2),
          holder: z.boolean().optional(),
        })
      ),
      contact: z
        .object({
          addresseeName: z
            .object({
              firstName: z.string().min(1).max(50),
              middleName: z.string().min(0).max(50).optional(),
              lastName: z.string().min(1).max(50),
              secondLastName: z.string().min(0).max(50).optional(),
            })
            .optional(),
          address: z
            .object({
              lines: z.array(z.string().optional()).optional(),
              postalCode: z.string().optional(),
              countryCode: z.string().min(2).max(2).optional(),
              cityName: z.string().optional(),
              stateName: z.string().optional(),
            })
            .optional(),
          language: z.string().optional(),
          phones: z
            .array(
              z
                .object({
                  deviceType: z.nativeEnum(PhoneDeviceType).optional(),
                  countryCallingCode: z.string().regex(new RegExp("[0-9+]{2,5}")).optional(),
                  number: z.string().regex(new RegExp("[0-9]{1,15}")).optional(),
                })
                .optional()
            )
            .optional(),
          companyName: z.string().optional(),
          emailAddress: z.string().optional(),
        })
        .optional(),
    })
  ),
});

const FlightCreateOrder = () => {
  const [createOrder, { data, isSuccess, error, isLoading }] = flightSearchApi.useCreateFlightOrderMutation();

  const { selectedFlightOfferPrice } = useSelector((state: RootState) => ({
    selectedFlightOfferPrice: state.flightSearch.selectedFlightOfferPrice,
  }));

  const form = useForm<{ travelers: TravelerFormModel[] }>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: { travelers: TravelerFormModel[] }) {
    console.log(values);

    if (selectedFlightOfferPrice?.data.flightOffers != undefined) {
      let flightCreateOrderRequest: FlightCreateOrderRequest = {
        data: {
          type: "flight-order",
          flightOffers: selectedFlightOfferPrice.data.flightOffers,
          travelers: values.travelers,
          contacts: consolidatorContact,
        },
      };
      createOrder(flightCreateOrderRequest);
      console.log(flightCreateOrderRequest);
    }
  }

  return (
    <>
      <div className="flex w-full items-start justify-center">
        {isLoading ? (
          <div className="flex w-full flex-col items-center justify-center gap-8 py-10">
            {[...Array(6)].map((_, index) => (
              <LoadingCard key={index} />
            ))}
          </div>
        ) : data && isSuccess ? (
          <div className="w-full max-w-[1400px] px-3 sm:px-6">
            <div className="my-4 flex min-h-[500px] w-full flex-col items-center justify-center gap-4 rounded-xl bg-white px-2 shadow-lg">
              <h1 className="mb- text-3xl font-semibold text-green-600">Order Confirmed</h1>
              <p className="text-wrap text-center sm:text-xl">Please save the order number below for your records</p>
              <div className="flex items-center justify-between rounded-lg border-2 border-primary">
                <p className="px-2 text-sm sm:text-base sm:font-semibold">{data.data.data.id}</p>
                <Button
                  className="rounded-l-none rounded-r-sm"
                  onClick={() => navigator.clipboard.writeText(data.data.data.id)}
                >
                  <img src={clipboard} className="w-6" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {selectedFlightOfferPrice ? (
              <>
                {error && "data" in error ? (
                  <Error
                    message={
                      (error.data as IResponse<void>).message ||
                      "Error with the flight order, please try and submit again."
                    }
                  />
                ) : (
                  ""
                )}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[1400px] px-3 sm:px-6">
                    {selectedFlightOfferPrice.data.flightOffers[0].travelerPricings?.map((traveler, index) => (
                      <div className="my-4 rounded-xl bg-white px-8 py-4 shadow-md">
                        <div className="flex flex-col gap-2 pb-2" key={index}>
                          <h2 className="text-xl font-semibold">
                            {traveler.travelerType} {traveler.travelerId}
                          </h2>
                          {selectedFlightOfferPrice.data.bookingRequirements?.travelerRequirements ? (
                            <div className="flex flex-col gap-4">
                              <input
                                type="hidden"
                                {...form.register(`travelers.${index}.id`, { value: traveler.travelerId })}
                              />
                              <TravelerForm index={index} />
                              <hr />
                              <DocumentForm index={index} />
                              <hr />
                              <ContactForm index={index} />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    ))}

                    <div className="my-4 flex w-full items-center justify-center">
                      <Button type="submit">Submit</Button>
                    </div>
                  </form>
                </Form>
              </>
            ) : (
              <Error message="No data found, please select a flight offer." />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default FlightCreateOrder;
