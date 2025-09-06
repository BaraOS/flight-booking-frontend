"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatDateToISO } from "@/utils/utils";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const RoundTripInput = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const { setValue } = useFormContext();

  const handleUpdateDates = (e: DateRange | undefined) => {
    setDate(e);
    if (e?.from) setValue(`destinations.0.departureDate`, formatDateToISO(e.from));
    if (e?.to) setValue(`destinations.1.departureDate`, formatDateToISO(e.to));
  };

  return (
    <div className="grid" style={{ marginTop: "0" }}>
      <Popover>
        <PopoverTrigger asChild className="border-none">
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-[300px] justify-start text-left font-normal py-0", !date && "text-muted-foreground")}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleUpdateDates}
            numberOfMonths={2}
            fromDate={new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default RoundTripInput;
