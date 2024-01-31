"use client";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useGetOrdersQuery } from "@/services/orderApi";

dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const AreaChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { data: orderData } = useGetOrdersQuery();

  useEffect(() => {
    if (typeof window !== "undefined" && chartRef.current) {
      import("apexcharts").then((ApexCharts) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        // const currentMonth = currentDate.getMonth();

        // const dates = Array.from({ length: 12 }, (_, index) => {
        //   const month = currentMonth - index;
        //   return new Date(currentYear, month, 1).getTime();
        // }).reverse();

        if (orderData?.data) {
          const getOrderCountByMonth = () => {
            // Initialize an array to store order counts for each month
            const orderCountByMonth: any = Array.from({ length: 12 }).fill(0);

            // Group orders by month
            orderData?.data?.forEach((data) => {
              const createdAt = new Date(data.createdAt as Date);
              const month = createdAt.getMonth();

              // Check if the order is from the current year
              if (createdAt.getFullYear() === currentYear) {
                // Increment the count for the corresponding month
                orderCountByMonth[month]++;
              }
            });

            return orderCountByMonth;
          };

          let orderCountByMonth = getOrderCountByMonth();

          // Move current month's data to the end of the array
          // orderCountByMonth.push(orderCountByMonth.shift());

          console.log("orderCountByMonth", orderCountByMonth);

          const series = {
            monthDataSeries1: {
              count: orderCountByMonth,
              dates: [
                new Date(`${currentYear}-01-01`).getTime(),
                new Date(`${currentYear}-02-01`).getTime(),
                new Date(`${currentYear}-03-01`).getTime(),
                new Date(`${currentYear}-04-01`).getTime(),
                new Date(`${currentYear}-05-01`).getTime(),
                new Date(`${currentYear}-06-01`).getTime(),
                new Date(`${currentYear}-07-01`).getTime(),
                new Date(`${currentYear}-08-01`).getTime(),
                new Date(`${currentYear}-09-01`).getTime(),
                new Date(`${currentYear}-10-01`).getTime(),
                new Date(`${currentYear}-11-01`).getTime(),
                new Date(`${currentYear}-12-01`).getTime(),
              ],
              // dates: dates,
            },
          };

          const options = {
            series: [
              {
                name: "Order",
                data: series.monthDataSeries1.count,
              },
            ],
            chart: {
              type: "area",
              height: 350,
              zoom: {
                enabled: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "straight",
            },
            title: {
              text: "Fundamental Analysis of Orders",
              align: "left",
            },
            subtitle: {
              text: "Number of Order",
              align: "left",
            },
            labels: series.monthDataSeries1.dates,
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              opposite: true,
            },
            legend: {
              horizontalAlign: "left",
            },
          };

          const chart = new ApexCharts.default(chartRef.current, options);
          chart.render();

          return () => {
            chart.destroy();
          };
        }
      });
    }
  }, [orderData?.data]);

  return <div id="chart" ref={chartRef}></div>;
};

export default AreaChart;
