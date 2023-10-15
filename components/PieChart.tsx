"use client";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const PieChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  const url = `${process.env.API_URL}/api/v1/product/categories`;

  useEffect(() => {
    const fetchApexCharts = async () => {
      const ApexCharts = await import("apexcharts");
      const options = {
        series: [4, 8, 1, 1, 1, 1, 1, 1],
        chart: {
          width: 480,
          type: "pie",
        },
        labels: [
          `BRIDAL GOWN ${4}`,
          `BRIDAL LEHENGA ${8}`,
          `BRIDAL SHARARA ${1}`,
          `DESIGNER WEAR ${1}`,
          `DUPATTA ${1}`,
          `JACKET ${1}`,
          `PARTY GOWN ${1}`,
          `SAREE ${1}`,
        ],
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
