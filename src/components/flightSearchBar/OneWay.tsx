import { DestinationSearch } from "./DestinationSearch";
import OneWayInput from "./OneWayInput";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { search } from "@/assets/icons";
import { useFormContext } from "react-hook-form";

const OneWay = () => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col items-center gap-2 px-2 py-2 md:flex-row">
      <div className="w-full flex-auto rounded-xl border border-gray-200 px-2 py-3">
        <FormField
          control={control}
          name={`destinations.0.origin`}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1.5">
              <FormLabel>Departure City</FormLabel>
              <FormControl>
                <DestinationSearch field={field} roundTripFields={[]} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="w-full flex-auto rounded-xl border border-gray-200 px-2 py-3">
        <FormField
          control={control}
          name={`destinations.0.destination`}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1.5">
              <FormLabel>Arrival City</FormLabel>
              <FormControl>
                <DestinationSearch field={field} roundTripFields={[]} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="w-full flex-auto rounded-xl border border-gray-200 px-2 py-3">
        <FormField
          control={control}
          name={`destinations.0.departureDate`}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1.5">
              <FormLabel>Departure</FormLabel>
              <FormControl>
                <OneWayInput field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="w-full flex-1">
        <Button type="submit" className="h-[60px] w-full rounded-xl shadow-lg md:h-[86px] md:w-[86px]">
          <img src={search} className="w-5" />
          <span className="md:hidden">Search</span>
        </Button>
      </div>
    </div>
  );
};

export default OneWay;
