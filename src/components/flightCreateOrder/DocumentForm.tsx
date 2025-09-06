import { documentTypeSelector } from "@/models/flightSearch";
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
import CountryCodeSearch from "./CountryCodeSearch";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { add, deleteIcon } from "@/assets/icons";

const DocumentForm: FC<{ index: number }> = ({ index }) => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: `travelers.${index}.documents`,
    rules: { minLength: 1, maxLength: 6 },
  });

  return (
    <div>
      <h4 className="text-lg font-semibold">Documents</h4>
      {fields.map((field, fieldIndex) => (
        <div key={field.id}>
          <div className="flex w-full justify-end">
            <button type="button" onClick={() => remove(fieldIndex)} className="flex items-center justify-center">
              <img src={deleteIcon} className="w-8" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-4">
            <FormField
              control={control}
              name={`travelers.${index}.documents.${fieldIndex}.documentType`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value ?? ""}>
                      <SelectTrigger>
                        <SelectValue placeholder="select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Document Type</SelectLabel>
                          {documentTypeSelector.map((value, index) => (
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
              name={`travelers.${index}.documents.${fieldIndex}.number`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Number</FormLabel>
                  <FormControl>
                    <Input placeholder="document number" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`travelers.${index}.documents.${fieldIndex}.issuanceDate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issuance Date</FormLabel>
                  <FormControl>
                    <Input placeholder="date issued" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormDescription>Format yyyy-mm-dd</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`travelers.${index}.documents.${fieldIndex}.expiryDate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input placeholder="date expired" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormDescription>Format yyyy-mm-dd</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`travelers.${index}.documents.${fieldIndex}.issuanceCountry`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issuance Country</FormLabel>
                  <FormControl>
                    <CountryCodeSearch field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`travelers.${index}.documents.${fieldIndex}.issuanceLocation`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issuance Location</FormLabel>
                  <FormControl>
                    <Input placeholder="location issued" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`travelers.${index}.documents.${fieldIndex}.nationality`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality</FormLabel>
                  <FormControl>
                    <CountryCodeSearch field={field} />
                    {/* <Input placeholder="yyyy-mm-dd" {...field} value={field.value ?? ""} /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`travelers.${index}.documents.${fieldIndex}.birthPlace`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birth Place</FormLabel>
                  <FormControl>
                    <Input placeholder="place you were born" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`travelers.${index}.documents.${fieldIndex}.validityCountry`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Validity Country</FormLabel>
                  <FormControl>
                    <CountryCodeSearch field={field} />
                    {/* <Input placeholder="yyyy-mm-dd" {...field} value={field.value ?? ""} /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`travelers.${index}.documents.${fieldIndex}.birthCountry`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birth Country</FormLabel>
                  <FormControl>
                    <CountryCodeSearch field={field} />
                    {/* <Input placeholder="yyyy-mm-dd" {...field} value={field.value ?? ""} /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`travelers.${index}.documents.${fieldIndex}.holder`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Holder</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-center gap-2">
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      <FormDescription>Select if you are the holder of this document</FormDescription>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}
      <div className="py-2">
        <button type="button" onClick={() => append("")} className="flex items-center gap-1 text-gray-400">
          <img src={add} className="w-4" />
          <span className="text-sm font-semibold">Add Document</span>
        </button>
      </div>
    </div>
  );
};

export default DocumentForm;
