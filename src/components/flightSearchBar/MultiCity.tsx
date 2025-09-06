import { DestinationSearch } from "./DestinationSearch";
import OneWayInput from "./OneWayInput";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { add, deleteIcon, search } from "@/assets/icons";
import { Button } from "../ui/button";

const MultiCity = () => {
  const { fields, append, remove } = useFieldArray({
    name: "destinations",
    rules: { minLength: 1, maxLength: 6 },
  });

  const { control } = useFormContext();

  useEffect(() => {
    append("");
  }, []);

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col items-center gap-2 px-2 py-2 md:flex-row">
          <div className="w-full flex-1 rounded-xl border border-gray-200 px-2 py-3">
            <FormField
              control={control}
              name={`destinations.${index}.origin`}
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
          <div className="w-full flex-1 rounded-xl border border-gray-200 px-2 py-3">
            <FormField
              control={control}
              name={`destinations.${index}.destination`}
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
          <div className="w-full flex-1 rounded-xl border border-gray-200 px-2 py-3">
            <FormField
              control={control}
              name={`destinations.${index}.departureDate`}
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
          <div>
            {fields.length > 1 ? (
              <button type="button" onClick={() => remove(index)} className="flex items-center justify-center">
                <img src={deleteIcon} className="w-8" />
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
      <div className="px-3 pb-4 pt-2 sm:pb-0">
        {fields.length < 6 ? (
          <button type="button" onClick={() => append("")} className="flex items-center gap-1 text-gray-400">
            <img src={add} className="w-4" />
            <span className="text-sm font-semibold">Add Flight</span>
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="flex w-full justify-end px-2">
        <Button type="submit" className="h-[60px] w-full rounded-xl shadow-lg sm:w-[150px]">
          <span className="text-lg font-semibold">Search</span>
          <img src={search} className="w-5" />
        </Button>
      </div>
    </>
  );
};

export default MultiCity;
