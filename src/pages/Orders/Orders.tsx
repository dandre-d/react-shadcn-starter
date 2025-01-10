import { useEffect, useState } from "react";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import MenuItem from "@/components/User/MenuItemTable";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/DateRangePicker";
import { DateRange } from "react-day-picker";
import { addDays, startOfWeek, format } from "date-fns";

// Function to get the default workweek (Monday to Friday)
const getDefaultWorkWeek = (): DateRange => {
  const today = new Date();
  const monday = startOfWeek(today, { weekStartsOn: 1 });
  const friday = addDays(monday, 4);
  return { from: monday, to: friday };
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

export default function Orders() {
  // Initialize state with the default workweek
  const defaultDateRange = getDefaultWorkWeek();
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>(defaultDateRange);

  // Generate the list of days if the date range is selected
  const daysInRange = selectedDateRange?.from && selectedDateRange?.to
    ? getDaysInRange(selectedDateRange.from, selectedDateRange.to)
    : [];

  useEffect(() => {
    // Log the initial range to verify it's correctly set
    console.log("Initial Date Range:", selectedDateRange);
  }, [selectedDateRange]);

  const handleDateRangeChange = (dateRange: DateRange | undefined) => {
    setSelectedDateRange(dateRange);
    console.log("Selected Date Range:", dateRange);
  };

  const [yearAndMonth, setYearAndMonth] = useState([2021, 9]);
  return (

    <>

      <div className="sticky top-[2rem] z-40  p-0 w-full border-b supports-backdrop-blur:bg-background/60  bg-background/90 backdrop-blur">
     
        <PageHeader>
          <PageHeaderHeading>Manage Orders</PageHeaderHeading>
        </PageHeader>

        {/* Date Range Picker */}
        <div className="mb-4">
          <DatePickerWithRange onChange={handleDateRangeChange} defaultValue={"w"}/>
        </div>
      </div>

      <div>
        {selectedDateRange ? (
          <p>
            {/* From: {selectedDateRange.from?.toLocaleDateString()} - To:{" "}
            {selectedDateRange.to?.toLocaleDateString()} */}
          </p>
        ) : (
          <p>No date range selected</p>
        )}
      </div>

      {/* Loop through the selected days and render cards */}
      {daysInRange.length > 0 ? (
        daysInRange.map((day, index) => {
          // Format the date as 'yyyy-MM-dd' for each day
          const formattedDate = format(day, 'yyyy-MM-dd');  // Format to '2023-12-31'
          const date = day.toDateString();
          return (
            <div key={index}>
              <br/>
              <Card>
                <CardHeader>
                  <CardTitle>{date}</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Pass the formatted date as startDate and endDate */}
                  <MenuItem startDate={formattedDate} endDate={formattedDate} />
                </CardContent>
              </Card>
            </div>
          );
        })
      ) : (
        <p>Select a date range</p>
      )}
    </>
  );
}
