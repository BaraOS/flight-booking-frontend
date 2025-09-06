import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FC, useState } from "react";
import { formatDateToISO } from "@/utils/utils";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

const OneWayInput: FC<{ field: ControllerRenderProps<FieldValues, any> }> = ({ field }) => {
  const [date, setDate] = useState<Date | undefined>();

  const handleUpdateDate = (e: Date | undefined) => {
    setDate(e);
    if (e) {
      field.onChange(formatDateToISO(e));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal border-none py-0",
            !date && "text-muted-foreground"
          )}
          style={{ marginTop: "0" }}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={handleUpdateDate} fromDate={new Date()} initialFocus />
      </PopoverContent>
    </Popover>
  );
};

export default OneWayInput;
