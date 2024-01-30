"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useGetStockDtlsQuery } from "@/services/productApi";
import { useGetSubCategoriesQuery } from "@/services/subcategory";
import { map } from "jquery";

dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const PieChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  const url = `${process.env.API_URL}/api/v1/product/categories`;
  var subCategoryId = "";
  let designerWear = 0;
  let bridalLehenga = 0;
  let bridalShara = 0;
  let bridalGrown = 0;
  let bridalGhara = 0;
  let bridalSaree = 0;
  let readySaree = 0;
  let partyGown = 0;
  let cropTop = 0;
  let bridalPamploom = 0;
  let semiBridalLehenga = 0;
  const [subCategoryList, setSubCategoryList] = useState({});

  var dataArray: string[] = [];
  var dataLabel: string[] = [];
  const { data: productDtls, isLoading } = useGetStockDtlsQuery();
  const { data: subCategoryDtls } = useGetSubCategoriesQuery();

  subCategoryDtls?.data.map((d, i) => {
    dataArray.push(d.title);
  });

  if (productDtls) {
    productDtls.product.map((elem, i) => {
      subCategoryId = elem.subCategory;
      subCategoryDtls?.data.map((el, i) => {
        if (subCategoryId === el._id) {
          for (let i = 0; i < dataArray.length; i++) {
            if (el.title === dataArray[i]) {
              dataLabel.push(dataArray[i]);
            }
          }
          if (el.title === "Designer Wear") designerWear++;
          else if (el.title === "Ready Sharee") readySaree++;
          else if (el.title === "Crop Top Skirt") cropTop++;
          else if (el.title === "Party Gown") partyGown++;
          else if (el.title === "Bridal Lehenga") bridalLehenga++;
          else if (el.title === "Bridal Sharara") bridalShara++;
          else if (el.title === "Bridal Gown") bridalGrown++;
          else if (el.title === "Bridal Saree") bridalSaree++;
          else if (el.title === "Bridal Gharara") bridalGhara++;
          else if (el.title === "Bridal Pamploom") bridalPamploom++;
          else if (el.title === "Semi Bridal Lehenga") semiBridalLehenga++;
        }
      });
    });
  }

  useEffect(() => {
    const fetchApexCharts = async () => {
      const ApexCharts = await import("apexcharts");
      if (productDtls && subCategoryDtls) {
        const options = {
          series: [
            designerWear,
            readySaree,
            cropTop,
            partyGown,
            bridalLehenga,
            bridalShara,
            bridalGrown,
            bridalSaree,
            bridalGhara,
            bridalPamploom,
            semiBridalLehenga,
          ],
          chart: {
            width: 500,
            type: "pie",
          },
          labels: dataArray,
          responsive: [
            {
              breakpoint: 500,
              options: {
                chart: {
                  width: 300,
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
  }, [productDtls, subCategoryDtls]);

  return <div id="chart" ref={chartRef}></div>;
};

export default PieChart;
