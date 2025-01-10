"use client";

import * as React from "react";
import {
  addDays,
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  addMonths,
} from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DatePickerWithRangeProps {
  className?: string;
  onChange: (dateRange: DateRange | undefined) => void;
  defaultValue?: string;
}

export function DatePickerWithRange({
  className,
  onChange, // Accept the onChange prop
  defaultValue,
}: DatePickerWithRangeProps) {
  // Calculate the start (Monday) and end (Friday) of the current week
  const getDefaultWorkWeek = () => {
    const today = new Date();
    const monday = startOfWeek(today, { weekStartsOn: 1 }); // Week starts on Monday
    const friday = addDays(monday, 4); // Friday is 4 days after Monday
    return { from: monday, to: friday };
  };
  const getDefaultMonth = () => {
    const today = new Date();
    const start = startOfMonth(today); // Week starts on Monday
    const end = addDays(addMonths(start, 1), -1); // Friday is 4 days after Monday
    return { from: start, to: end };
  };
  const getDefault = () => {
    const values =
      defaultValue === "w" ? getDefaultWorkWeek() : getDefaultMonth();
    return values;
  };

  // Set the default range to the current workweek
  const [date, setDate] = React.useState<DateRange | undefined>(getDefault());

  // Handle date selection and pass it to the onChange prop
  const handleSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    onChange(selectedDate); // Pass the selected date range to the parent component
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
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
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from} // Start the calendar at the current month
            selected={date}
            onSelect={handleSelect} // Call handleSelect when a date is selected
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
