"use client";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useGetOrdersQuery } from "@/services/orderApi";
import Loader from "../Loader";

dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const OrderDonutChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { data: orderResult, isLoading: isOrderLoading } = useGetOrdersQuery();

  // console.log("order result", orderResult);

  let pending = 0;
  let orderReceived = 0;
  let onProcess = 0;
  let readyToDeliver = 0;
  let shipped = 0;
  let delivered = 0;

  if (orderResult) {
    orderResult.data.map((elem: any) => {
      if (elem.deliveryStatus === "pending") {
        pending++;
      }
      if (elem.deliveryStatus === "order received") {
        orderReceived++;
      }
      if (elem.deliveryStatus === "on process") {
        onProcess++;
      }
      if (elem.deliveryStatus === "ready to deliver") {
        readyToDeliver++;
      }
      if (elem.deliveryStatus === "shipped") {
        shipped++;
      }
      if (elem.deliveryStatus === "delivered") {
        delivered++;
      }
    });
  }

  // console.log("order result", orderResult);

  useEffect(() => {
    const fetchApexCharts = async () => {
      const ApexCharts = await import("apexcharts");
      if ((orderResult && orderResult?.data?.length > 0) as any) {
        const options = {
          series: [
            pending,
            orderReceived,
            onProcess,
            readyToDeliver,
            shipped,
            delivered,
          ],
          chart: {
            width: 480,
            type: "donut",
          },
          labels: [
            `Pending`,
            `Order Received`,
            `On Process`,
            `Ready to Deliver`,
            "Shipped",
            "Delivered",
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
    delivered,
    onProcess,
    orderReceived,
    orderResult,
    pending,
    readyToDeliver,
    shipped,
  ]);

  return (
    <>
      {isOrderLoading ? (
        <Loader height="h-[40vh]" />
      ) : (
        <>
          {((orderResult && orderResult?.data?.length > 0) as any) ? (
            <div id="chart" ref={chartRef}></div>
          ) : (
            <p>No order yet</p>
          )}
        </>
      )}
    </>
  );
};

export default OrderDonutChart;
