import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { travelClassValues } from "@/models/flightSearch";
import { useFormContext } from "react-hook-form";
import { TravelClass } from "@/models/request/FlightOfferSearchRequest";

const TravelClassSelector = () => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={`travelClass`}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value ?? TravelClass.ECONOMY}>
              <SelectTrigger className="border-0 text-foreground ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 sm:w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {travelClassValues.map((item, index) => (
                    <SelectItem key={index} value={item.value.toString()}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TravelClassSelector;
