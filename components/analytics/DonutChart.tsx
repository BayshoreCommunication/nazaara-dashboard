"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useGetStockDtlsQuery } from "@/services/productApi";
import { useGetTopOrdersProductQuery } from "@/services/orderApi";

dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const DonutChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { data: result } = useGetStockDtlsQuery();
  const { data: orderResult } = useGetTopOrdersProductQuery();

  let stockIn = 0;
  let stockOut = 0;
  let draftCount = 0;
  let onDelivery = 0;
  let onDelivered = 0;
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
  if (orderResult) {
    orderResult.data.map((elem: any) => {
      if (
        elem.deliveryStatus === "order received" ||
        elem.deliveryStatus === "shipped" ||
        elem.deliveryStatus === "on process" ||
        elem.deliveryStatus === "ready to deliver" ||
        elem.deliveryStatus === "pending"
      ) {
        onDelivery++;
      }

      if (elem.deliveryStatus === "delivered") {
        onDelivered++;
      }
    });
  }

  useEffect(() => {
    const fetchApexCharts = async () => {
      const ApexCharts = await import("apexcharts");
      if (result && orderResult) {
        const options = {
          series: [stockIn, stockOut, onDelivery, draftCount, onDelivered],
          chart: {
            width: 480,
            type: "donut",
          },
          labels: [
            `In Stock `,
            `Stock Out `,
            `On Delivery`,
            `On Draft`,
            "On Delivered",
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
      }
    };

    fetchApexCharts();
  }, [
    result,
    orderResult,
    stockIn,
    stockOut,
    onDelivery,
    draftCount,
    onDelivered,
  ]);

  return <div id="chart" ref={chartRef}></div>;
};

export default DonutChart;
