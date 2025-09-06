import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const PassengerSelector = () => {
  const [travlerCount, updateTravelerCount] = useState<number>(0);
  const { control, setValue } = useFormContext();

  const handleUpdatePassenger = (name: string, value: any, amount: number) => {
    setValue(name, value + amount);
    updateTravelerCount(travlerCount + amount);
  };

  return (
    <Popover>
      <PopoverTrigger asChild className="w-[140px] border-none">
        <Button variant="outline" size="icon">
          <p>Passenger {travlerCount}</p>
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col gap-2">
          {/* adults */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex justify-evenly">
              <p>Adults:</p>
            </div>
            <div className="flex justify-evenly gap-3">
              <FormField
                control={control}
                name={`travelers.adults`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex justify-evenly gap-3">
                        <Button
                          className="h-[30px] w-[30px] rounded-sm text-white"
                          onClick={() => handleUpdatePassenger(`travelers.adults`, field.value, 1)}
                        >
                          +
                        </Button>
                        <p className="w-[20px] text-center">{field.value}</p>
                        <Input type="hidden" {...field} />
                        <Button
                          className="h-[30px] w-[30px] rounded-sm text-white"
                          onClick={() =>
                            field.value > 0 ? handleUpdatePassenger(`travelers.adults`, field.value, -1) : ""
                          }
                        >
                          -
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* children */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex justify-evenly">
              <p>Children:</p>
            </div>
            <div className="flex justify-evenly gap-3">
              <FormField
                control={control}
                name={`travelers.children`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex justify-evenly gap-3">
                        <Button
                          className="h-[30px] w-[30px] rounded-sm text-white"
                          onClick={() => handleUpdatePassenger(`travelers.children`, field.value, 1)}
                        >
                          +
                        </Button>
                        <p className="w-[20px] text-center">{field.value}</p>
                        <Input type="hidden" {...field} />
                        <Button
                          className="h-[30px] w-[30px] rounded-sm text-white"
                          onClick={() =>
                            field.value > 0 ? handleUpdatePassenger(`travelers.children`, field.value, -1) : ""
                          }
                        >
                          -
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Infants on Lap */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex justify-evenly">
              <p>Infants on lap:</p>
            </div>
            <div className="flex justify-evenly gap-3">
              <FormField
                control={control}
                name={`travelers.infantsOnLap`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex justify-evenly gap-3">
                        <Button
                          className="h-[30px] w-[30px] rounded-sm text-white"
                          onClick={() => handleUpdatePassenger(`travelers.infantsOnLap`, field.value, 1)}
                        >
                          +
                        </Button>
                        <p className="w-[20px] text-center">{field.value}</p>
                        <Input type="hidden" {...field} />
                        <Button
                          className="h-[30px] w-[30px] rounded-sm text-white"
                          onClick={() =>
                            field.value > 0 ? handleUpdatePassenger(`travelers.infantsOnLap`, field.value, -1) : ""
                          }
                        >
                          -
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Infants on seat */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex justify-evenly">
              <p>Infants on seat:</p>
            </div>
            <div className="flex justify-evenly gap-3">
              <FormField
                control={control}
                name={`travelers.infantsOnSeat`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex justify-evenly gap-3">
                        <Button
                          className="h-[30px] w-[30px] rounded-sm text-white"
                          onClick={() => handleUpdatePassenger(`travelers.infantsOnSeat`, field.value, 1)}
                        >
                          +
                        </Button>
                        <p className="w-[20px] text-center">{field.value}</p>
                        <Input type="hidden" {...field} />
                        <Button
                          className="h-[30px] w-[30px] rounded-sm text-white"
                          onClick={() =>
                            field.value > 0 ? handleUpdatePassenger(`travelers.infantsOnSeat`, field.value, -1) : ""
                          }
                        >
                          -
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PassengerSelector;
