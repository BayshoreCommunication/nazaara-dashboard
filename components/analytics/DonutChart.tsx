"use client";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useGetStockDtlsQuery } from "@/services/productApi";
import Loader from "../Loader";

dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const DonutChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { data: result, isLoading: isStockLoading } = useGetStockDtlsQuery();

  let stockIn = 0;
  let stockOut = 0;
  let draftCount = 0;
  if (result) {
    result.product.map((el) => {
      if (el.stock > 0) {
        stockIn++;
      }
      if (el.stock < 1) {
        stockOut++;
      }
      if (el.status === "draft") {
        draftCount++;
      }
    });
  }

  useEffect(() => {
    const fetchApexCharts = async () => {
      const ApexCharts = await import("apexcharts");
      if (result && !isStockLoading) {
        const options = {
          series: [stockIn, stockOut, draftCount],
          chart: {
            width: 480,
            type: "donut",
          },
          labels: [`In Stock `, `Stock Out `, `On Draft`],
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
      }
    };

    fetchApexCharts();
  }, [draftCount, isStockLoading, result, stockIn, stockOut]);

  return (
    <>
      {isStockLoading ? (
        <Loader height="h-[40vh]" />
      ) : (
        <div id="chart" ref={chartRef}></div>
      )}
    </>
  );
};

export default DonutChart;
