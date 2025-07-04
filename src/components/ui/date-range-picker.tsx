import * as React from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { assets } from "@/constants";

export function DatePickerWithRange({
  className,
  handleChange,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> &
  Partial<{
    disabled: boolean;
    handleChange(rang: string): void;
  }>) {
  const [date, setDate] = React.useState<DateRange | undefined>();

  const onSelect = (range: DateRange | undefined) => {
    setDate(range);
    if (range?.from && range?.to) {
      const from = new Date(range.from);
			from.setDate(from.getDate() + 1);

			const to = new Date(range.to);
			to.setDate(to.getDate() + 1);

			const rangeString = `${from.toISOString()} - ${to.toISOString()}`;
      if (handleChange) {
        handleChange(rangeString);
      }
    }
  };

  return (
    <div className={cn("grid gap-2", className)} {...rest}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "hide-scrollbar w-fit justify-start overflow-x-auto text-left font-normal",
              !date && "text-muted-foreground",
            )}
            disabled={rest.disabled}
          >
            <img src={assets.calendar_icon_01} alt="calendar icon" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Select Date Range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
