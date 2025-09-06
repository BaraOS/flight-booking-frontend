import { genderSelector } from "@/models/flightSearch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

const TravelerForm: FC<{ index: number }> = ({ index }) => {
  const { control } = useFormContext();

  return (
    <div>
      <h4 className="text-lg font-semibold">Traveler</h4>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-4">
        <FormField
          control={control}
          name={`travelers.${index}.name.firstName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="first name" {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`travelers.${index}.name.middleName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name</FormLabel>
              <FormControl>
                <Input placeholder="middle name" {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`travelers.${index}.name.lastName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="last name" {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`travelers.${index}.name.secondLastName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Second Last Name</FormLabel>
              <FormControl>
                <Input placeholder="second last name" {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`travelers.${index}.gender`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value ?? ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      {genderSelector.map((gender, genderIndex) => (
                        <SelectItem value={gender.value} key={genderIndex}>
                          {gender.value.toString()}
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
        <FormField
          control={control}
          name={`travelers.${index}.dateOfBirth`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of birth</FormLabel>
              <FormControl>
                <Input placeholder="date of birth" {...field} value={field.value ?? ""} />
              </FormControl>
              <FormDescription>Format yyyy-mm-dd</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default TravelerForm;
