"use client";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const PieChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchApexCharts = async () => {
      const ApexCharts = await import("apexcharts");
      const options = {
        series: [44, 55, 13, 43, 22],
        chart: {
          width: 480,
          type: "pie",
        },
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      };

      const chart = new ApexCharts.default(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    };

    fetchApexCharts();
  }, []);

  return <div id="chart" ref={chartRef}></div>;
};

export default PieChart;
