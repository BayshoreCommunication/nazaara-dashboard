"use client";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  useGetProductsQuery,
  useGetSubCategoryProductCountQuery,
} from "@/services/productApi";

dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const PieChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  const { data: subCategoryProductsCount } =
    useGetSubCategoryProductCountQuery();

  // console.log("productsData", subCategoryProductsCount);

  useEffect(() => {
    const fetchApexCharts = async () => {
      const ApexCharts = await import("apexcharts");
      const options = {
        series: subCategoryProductsCount.result.map((data: any) => data.count),
        chart: {
          width: 480,
          type: "pie",
        },
        labels: subCategoryProductsCount.result.map((data: any) => data.label),
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

    if (subCategoryProductsCount?.result?.length > 0) {
      fetchApexCharts();
    }
  }, [subCategoryProductsCount]);

  return (
    <div id="chart" ref={chartRef}>
      <h1 className="mb-4 font-bold text-gray-500">
        Product Stocks Analysis Using Category:
      </h1>
    </div>
  );
};

export default PieChart;
