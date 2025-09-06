import { Check, ChevronsUpDown } from "lucide-react";
import { useState, FC } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { flightSearchApi } from "@/store/flightSearch/flightSearchService";
import { Query } from "@/models/flightSearch";
import { Location } from "@/models/response/AirportCitySearch";
import { skipToken } from "@reduxjs/toolkit/query";
import { useDebounce } from "@uidotdev/usehooks";
import { ControllerRenderProps, FieldValues, useFormContext } from "react-hook-form";

interface DestinationSearchProps {
  field: ControllerRenderProps<FieldValues, any>;
  roundTripFields: string[];
}

export const DestinationSearch: FC<DestinationSearchProps> = ({ field, roundTripFields }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState<Query>({ subType: "", keyword: "" });
  const [selectedDestination, updateSelectedDestination] = useState("");
  const { setValue } = useFormContext();
  const debouncedSearchQuery = useDebounce(query, 500);
  const { data, isSuccess } = flightSearchApi.useAirportCitySearchQuery(
    debouncedSearchQuery.keyword === "" ? skipToken : debouncedSearchQuery
  );

  const handleSelectDestination = (currentValue: string, iataCode: string, cityName: string) => {
    if (roundTripFields.length > 0) {
      setValue(roundTripFields[0], iataCode);
      setValue(roundTripFields[1], iataCode);
      updateSelectedDestination(`${iataCode}, ${cityName}`);
    } else {
      field.onChange(currentValue == field.value ? "" : iataCode);
      updateSelectedDestination(`${iataCode}, ${cityName}`);
    }
    setOpen(false);
  };

  const handleSelectDestinationLocal = (currentValue: string) => {
    if (roundTripFields.length > 0) {
      setValue(roundTripFields[0], currentValue === field.value ? "" : query.keyword);
      setValue(roundTripFields[1], currentValue === field.value ? "" : query.keyword);
      updateSelectedDestination(query.keyword);
    } else {
      field.onChange(currentValue === field.value ? "" : query.keyword);
      updateSelectedDestination(query.keyword);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="border-none">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between py-0"
          style={{ marginTop: "0" }}
        >
          {selectedDestination != "" ? selectedDestination : "search city"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput
            placeholder="Search City/Airport"
            className="h-9"
            onValueChange={(e: string) => setQuery({ subType: "airport", keyword: e })}
          />
          <CommandList>
            <CommandEmpty>Location not found.</CommandEmpty>
            <CommandGroup>
              {data && isSuccess ? (
                <>
                  {data.data.map((framework: Location, index) => (
                    <CommandItem
                      key={index}
                      value={`${framework.iataCode}, ${framework.address.cityName}`}
                      onSelect={(currentValue) => {
                        handleSelectDestination(currentValue, framework.iataCode, framework.address.cityName);
                      }}
                    >
                      <div>
                        <p>
                          {framework.iataCode}, {framework.name}
                        </p>
                        <p>
                          {framework.address.cityName}, {framework.address.countryName}
                        </p>
                      </div>
                      <Check
                        className={cn("ml-auto", field.value === framework.iataCode ? "opacity-100" : "opacity-0")}
                      />
                    </CommandItem>
                  ))}
                </>
              ) : (
                ""
              )}
              {query.keyword != "" ? (
                <CommandItem
                  onSelect={(currentValue) => {
                    handleSelectDestinationLocal(currentValue);
                  }}
                >
                  {query.keyword}
                </CommandItem>
              ) : (
                ""
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
