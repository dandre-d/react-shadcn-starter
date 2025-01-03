import {  useEffect, useState } from "react";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import MenuItem from "@/components/User/MenuItemTable";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/DateRangePicker";
import { DateRange } from "react-day-picker";
import { addDays, startOfWeek } from "date-fns";


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
  return (
    <>

    
      <PageHeader>
        <PageHeaderHeading>Manage Orders</PageHeaderHeading>
      </PageHeader>
   
      {/* Date Range Picker */}
      <div className="mb-4">
        <DatePickerWithRange onChange={handleDateRangeChange} />
      </div>
   
      <div>
        {/* <h2>Selected Date Range:</h2> */}
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
          // const dayName = day.toLocaleString("en-US", { weekday: "long" }); // Get the day of the week
          const date = day.toDateString();
          return (
            <div key={index}>
               <br/>
             <Card >
              <CardHeader>
                <CardTitle>{date} </CardTitle>
              </CardHeader>
              <CardContent>
                <MenuItem />
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
