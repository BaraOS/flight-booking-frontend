import { DestinationSearch } from "./DestinationSearch";
import RoundTripInput from "./RoundTripInput";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { search } from "@/assets/icons";
import { useFormContext } from "react-hook-form";

const RoundTrip = () => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col items-center gap-2 px-2 py-2 md:flex-row">
      <div className="w-full flex-auto rounded-xl border border-gray-200 px-2 py-3">
        <FormField
          control={control}
          name={`destinations.0.origin`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departure City</FormLabel>
              <FormControl>
                <DestinationSearch
                  field={field}
                  roundTripFields={[`destinations.0.origin`, `destinations.1.destination`]}
                />
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
            <FormItem>
              <FormLabel>Arrival City</FormLabel>
              <FormControl>
                <DestinationSearch
                  field={field}
                  roundTripFields={[`destinations.0.destination`, `destinations.1.origin`]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="w-full flex-auto rounded-xl border border-gray-200 px-2 py-3">
        <FormField
          control={control}
          name={`destinations`}
          render={() => (
            <FormItem>
              <FormLabel>Departure/Return</FormLabel>
              <FormControl>
                <RoundTripInput />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="w-full flex-1">
        <Button type="submit" className="h-[60px] w-full rounded-xl shadow-lg md:h-[90px] md:w-[90px]">
          <img src={search} className="w-5" />
          <span className="md:hidden">Search</span>
        </Button>
      </div>
    </div>
  );
};

export default RoundTrip;
