"use client";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const AreaChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && chartRef.current) {
      import("apexcharts").then((ApexCharts) => {
        const series = {
          monthDataSeries1: {
            prices: [30, 40, 35, 50, 49, 60, 70, 91, 125],
            dates: [
              new Date("2022-01-01").getTime(),
              new Date("2022-02-01").getTime(),
              new Date("2022-03-01").getTime(),
              new Date("2022-04-01").getTime(),
              new Date("2022-05-01").getTime(),
              new Date("2022-06-01").getTime(),
              new Date("2022-07-01").getTime(),
              new Date("2022-08-01").getTime(),
              new Date("2022-09-01").getTime(),
            ],
          },
        };

        const options = {
          series: [
            {
              name: "STOCK ABC",
              data: series.monthDataSeries1.prices,
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
            text: "Fundamental Analysis of Stocks",
            align: "left",
          },
          subtitle: {
            text: "Price Movements",
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
      });
    }
  }, []);

  return <div id="chart" ref={chartRef}></div>;
};

export default AreaChart;
