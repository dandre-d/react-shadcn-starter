import { useState, useEffect } from "react";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/DateRangePicker";
import { DateRange } from "react-day-picker";
import { addDays, startOfMonth, format, addMonths, formatDate } from "date-fns";
import { Badge } from "@/components/ui/badge"; // Assuming Badge component for pills
import MenuItemTable from "@/components/User/MenuItemTable";
import MenuItem from "@/components/User/MenuItemTable";
import { Sheet, SheetContent, SheetClose, SheetTitle, SheetHeader, SheetDescription } from "@/components/ui/sheet"; // Shadcn Sheet components
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile"
import { NumericKeys } from "react-hook-form/dist/types/path/common";
// Function to get default month range
const getDefaultMonth = () => {
  const today = new Date();
  const start = startOfMonth(today);
  const end = addDays(addMonths(start, 1), -1);
  return { from: start, to: end };
};

const getDaysInRange = (startDate: Date, endDate: Date) => {
  const days = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return days;
};

export default function OrderCalendar() {
  const defaultDateRange = getDefaultMonth();
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>(defaultDateRange);
  const isMobile = useIsMobile()
  const [daysInRange, setDaysInRange] = useState<Date[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [orderedItems, setOrderedItems] = useState<Record<string, string[]>>({});
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const availableItems = ["Pizza", "Burger", "Pasta", "Salad"]; // Mock available items
  const [filterDay, setFilterDay] = useState<string>();
  const [clickedDay, setClickedDay] = useState<Date | null>(null);

  useEffect(() => {
    if (selectedDateRange?.from && selectedDateRange?.to) {
      const allDays = getDaysInRange(selectedDateRange.from, selectedDateRange.to);
      setDaysInRange(allDays.filter((day) => day.getDay() !== 0 && day.getDay() !== 6)); // Filter out weekends
    }
  }, [selectedDateRange]);

  const handleDateRangeChange = (dateRange: DateRange | undefined) => {
    setSelectedDateRange(dateRange);
  };

  const handleDayClick = (day: Date,) => {
    setSelectedDay(day);
    setFilterDay(format(day, "yyyy-MM-dd"));
    if (clickedDay === day) {
      setClickedDay(null);
    } else {
      setClickedDay(day);
    }
    if (isMobile) {
      setIsSheetOpen(true);
    }
  
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const firstDayOffset = daysInRange.length > 0 ? daysInRange[0].getDay() - 1 : 0; // Offset for Monday
  const leadingPlaceholders = Array(firstDayOffset < 0 ? 6 : firstDayOffset).fill(null); // Fill missing days before Monday
  
  return (
    <> <div className="sticky top-0 z-0 p-4 bg-background/90 backdrop-blur ">
        <div className="mb-4">
          <DatePickerWithRange onChange={handleDateRangeChange} />
        </div>
      </div>
  <div className="lg:grid grid-cols-4 max-h-screen">
        
      <div className="lg:col-span-3 ">
     

      {/* Weekday Headers */}
      <div className="hidden md:grid lg:grid sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 rounded text-center font-semibold">
        {weekdays.map((weekday, idx) => (
          <div key={idx} className="py-2">
            {weekday}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-0 p-1 bg-background/50 rounded">
        {leadingPlaceholders.map((_, idx) => (
          <div key={idx} className="bg-foreground/20 border  border-foreground/20 "></div>
        ))}

        {daysInRange.map((day, index) => {
          const formattedDate = format(day, "yyyy-MM-dd");
          const dayOrders = orderedItems[formattedDate] || [];

          return (
            <Card
              key={index}
              className={`cursor-pointer lg:hover:scale-125 lg:focus:bg-red-700 hover:z-40 hover:shadow-lg transition h-28 rounded-none pt-3 ${
              clickedDay ===day ? "bg-accent" : "bg-background"
              }`}
              onClick={() => handleDayClick(day)}
            >
              <CardContent>
                <CardTitle>
                  <a className="lg:hidden md:hidden">{format(day, "EEE, MMM")}</a>
                  <a className="lg:visible">{format(day, "d")}</a>
                </CardTitle>
                <div className="mt-2 flex flex-wrap gap-2">
                  {dayOrders.map((item, idx) => (
                    <Badge className="hover:bg-ring" key={idx}>
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>


    <div aria-describedby="menu items" className=" mt-1 hidden lg:block grid-cols-1 ">
     
      <div className="max-h-screen overflow-y-auto">
    <MenuItem startDate={filterDay} endDate={filterDay} />
    </div>
    </div>
  </div>

      {/* Sheet */}
      <Sheet  open={isSheetOpen} onOpenChange={setIsSheetOpen}>

        <SheetContent className=" min-w-[80vw] max-h-[100vh] " >
        <SheetHeader>
      <SheetTitle>Add Orders for {filterDay}</SheetTitle>
      <SheetDescription>
        Select a Vendor and choose a category to view selected Items 
      </SheetDescription>
    </SheetHeader>
          <MenuItem startDate={filterDay} endDate={filterDay} />
    
        </SheetContent>
   
      </Sheet>
    </>
  );


}
