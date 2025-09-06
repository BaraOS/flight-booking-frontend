import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TripType, tripValues } from "@/models/flightSearch";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

const TripTypeSelector = () => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={`trip`}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Select
              onValueChange={(e) => {
                field.onChange(e);
                control.unregister("destinations");
              }}
              value={field.value ?? TripType.ROUND_TRIP}
            >
              <SelectTrigger className="border-0 text-foreground ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 sm:w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {tripValues.map((item, index) => (
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

export default TripTypeSelector;
