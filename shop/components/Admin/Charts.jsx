import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { subDays, addDays, format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Chart from "chart.js/auto";

const today = new Date();
today.setDate(new Date().getDate() + 1);
const pastWeekStart = subDays(today, 7);

const Charts = () => {
  const [orderCount, setOrderCount] = useState();
  const [orderDate, setOrderDate] = useState();
  const formatDate = (dateString) => {
    const parsedDate = new Date(dateString);
    return format(parsedDate, "yyyy-MM-dd");
  };

  const defaultSelected = {
    from: pastWeekStart,
    to: today,
  };

  const [range, setRange] = useState(defaultSelected);

  useEffect(() => {
    const fetchData = async () => {
      if (!range || !range.from) {
        return;
      }

      try {
        const axios = require("axios");
        const response = await axios.get(
          `http://localhost:8080/api/v2/orders/get-chart-statistics/?start_date=${formatDate(
            range.from
          )}&end_date=${formatDate(range.to)}`
        );
        console.log(response.data.data);
        setOrderCount(response.data.data.orderCount);
        setOrderDate(response.data.data.orderDate);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [range]);

  return (
    <div className="flex justify-between items-start">
      <div className="mt-3">
        <DayPicker
          id="test"
          mode="range"
          defaultMonth={today}
          selected={range}
          onSelect={setRange}
        />
      </div>
      <div
        style={{
          height: "60vh",
          width: "50%",
          position: "relative",
        }}
      >
        <Bar
          data={{
            labels: orderDate,

            datasets: [
              {
                label: "",
                backgroundColor: [
                  "#3e95cd",
                  "#8e5ea2",
                  "#3cba9f",
                  "#e8c3b9",
                  "#c45850",
                ],
                data: orderCount,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Orders",
              },
            },
            legend: { display: false },
          }}
        />
      </div>
    </div>
  );
};

export default Charts;
