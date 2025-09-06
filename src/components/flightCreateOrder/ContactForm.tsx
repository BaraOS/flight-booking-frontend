import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FC, useState } from "react";
import { phoneDeviceTypeSelector } from "@/models/flightSearch";
import CountryCallingCode from "./CountryCallingCode";
import { Input } from "@/components/ui/input";
import { add, deleteIcon } from "@/assets/icons";
import CountryCodeSearch from "./CountryCodeSearch";
import { Checkbox } from "../ui/checkbox";

const ContactForm: FC<{ index: number }> = ({ index }) => {
  const [displayForm, toggleDisplayForm] = useState<boolean>(false);

  const { control } = useFormContext();

  const handleToggleDisplayForm = () => {
    toggleDisplayForm(!displayForm);
    control.unregister(`travelers.${index}.contact`);
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <Checkbox checked={displayForm} onCheckedChange={handleToggleDisplayForm}></Checkbox>
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Select to provide contact information for this traveler
        </label>
      </div>

      {displayForm ? (
        <div>
          <h4 className="text-lg font-semibold">Contact</h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-4">
            <FormField
              control={control}
              name={`travelers.${index}.contact.addresseeName.firstName`}
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
              name={`travelers.${index}.contact.addresseeName.lastName`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="last name" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`travelers.${index}.contact.addresseeName.middleName`}
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
              name={`travelers.${index}.contact.addresseeName.secondLastName`}
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
              name={`travelers.${index}.contact.address.lines.0`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 1</FormLabel>
                  <FormControl>
                    <Input placeholder="address line 1" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`travelers.${index}.contact.address.lines.1`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 2</FormLabel>
                  <FormControl>
                    <Input placeholder="address line 2" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`travelers.${index}.contact.address.postalCode`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="postal code" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`travelers.${index}.contact.address.countryCode`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country Code</FormLabel>
                  <FormControl>
                    <CountryCodeSearch field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`travelers.${index}.contact.address.cityName`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City Name</FormLabel>
                  <FormControl>
                    <Input placeholder="city name" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`travelers.${index}.contact.address.stateName`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State Name</FormLabel>
                  <FormControl>
                    <Input placeholder="state name" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`travelers.${index}.contact.address.language`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Input placeholder="language" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`travelers.${index}.contact.address.emailAddress`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="email address" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`travelers.${index}.contact.address.companyName`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>company name</FormLabel>
                  <FormControl>
                    <Input placeholder="companyName" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Phones fieldIndex={index} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

const Phones: FC<{ fieldIndex: number }> = ({ fieldIndex }) => {
  const { control } = useFormContext();

  const {
    fields: phones,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control: control,
    name: `travelers.contact.${fieldIndex}.phones`,
  });

  return (
    <>
      {phones.map((phone, index) => (
        <div key={phone.id}>
          <div className="flex w-full justify-end">
            <button type="button" onClick={() => removePhone(index)} className="flex items-center justify-center">
              <img src={deleteIcon} className="w-8" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
            <FormField
              control={control}
              name={`travelers.${fieldIndex}.contact.phones.${index}.deviceType`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value ?? ""}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Device Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Device Type</SelectLabel>
                          {phoneDeviceTypeSelector.map((value, index) => (
                            <SelectItem value={value.value} key={index}>
                              {value.value.toString()}
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
              name={`travelers.${fieldIndex}.contact.phones.${index}.countryCallingCode`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Validity Country</FormLabel>
                  <FormControl>
                    <CountryCallingCode field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`travelers.${fieldIndex}.contact.phones.${index}.number`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone Number" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}
      <div className="py-2">
        {phones.length < 3 ? (
          <button type="button" onClick={() => appendPhone({})} className="flex items-center gap-1 text-gray-400">
            <img src={add} className="w-4" />
            <span className="text-sm font-semibold">Add Phone</span>
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ContactForm;
