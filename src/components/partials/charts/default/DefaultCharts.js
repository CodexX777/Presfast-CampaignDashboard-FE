import React, { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";

import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Filler, Legend, } from "chart.js";
Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Filler, Legend,);

import {
  salesStatistics,
  todayCustomers,
  todayOrders,
  todayRevenue,
  todayVisitors,
  salesStatisticsSet2,
  salesStatisticsSet3,
  salesStatisticsSet4,
  orderStatistics,
} from "./DefaultData";

export const DefaultOrderChart = () => {
  return (
    <Line
      className="ecommerce-line-s3"
      data={todayOrders}
      options={{
        plugins: {
          legend: {
              display: false,
          },
          tooltip: {
              enabled: true,
              displayColors: false,
              backgroundColor: "#1c2b46",
              titleFont: {
                size: '8px',
              },
              titleColor: "#fff",
              titleMarginBottom: 4,
              bodyColor: "#fff",
              bodyFont: {
                size: '8px',
              },
              bodySpacing: 4,
              padding: 6,
              footerMarginTop: 0,
              callbacks: {
                title: function () {
                  return false; 
                },
                label: function (context) {
                    return context.parsed.y;
                },
              },
          },
        },
        maintainAspectRatio: false,
        scales: {
          y:{
              display: false,
              ticks: {
                beginAtZero: false,
                color:"#9eaecf", 
                font: {
                  size: '12px',
                },
                padding: 0,
              },
              grid: {
                color: "rgba(82, 100, 132, 0.2)",
                tickMarkLength: 0,
                zeroLineColor: "rgba(82, 100, 132, 0.2)",
              },
            },
          x:{
              display: false,
              ticks: {
                color:"#9eaecf", 
                font: {
                  size: '12px',
                },
                source: "auto",
                padding: 0,
              },
              grid: {
                color: "transparent",
                tickMarkLength: 0,
                zeroLineColor: "rgba(82, 100, 132, 0.2)",
                offsetGridLines: true,
              },
            },
        },
      }}
    />
  );
};

export const DefaultCustomerChart = () => {
  return (
    <Line
      className="ecommerce-line-s3"
      data={todayCustomers}
      options={{
        plugins: {
          legend: {
              display: false,
          },
          tooltip: {
              enabled: true,
              displayColors: false,
              backgroundColor: "#1c2b46",
              titleFont: {
                size: '8px',
              },
              titleColor: "#fff",
              titleMarginBottom: 4,
              bodyColor: "#fff",
              bodyFont: {
                size: '8px',
              },
              bodySpacing: 4,
              padding: 6,
              footerMarginTop: 0,
              callbacks: {
                title: function () {
                  return false; 
                },
                label: function (context) {
                    return context.parsed.y;
                },
              },
          },
        },
        maintainAspectRatio: false,
        scales: {
          y: {
              display: false,
              ticks: {
                beginAtZero: false,
                color:"#9eaecf", 
                font: {
                  size: '12px',
                },
                padding: 0,
              },
              grid: {
                color: "rgba(82, 100, 132, 0.2)",
                tickMarkLength: 0,
                zeroLineColor: "rgba(82, 100, 132, 0.2)",
              },
            },
          x:{
              display: false,
              ticks: {
                color:"#9eaecf", 
                font: {
                  size: '12px',
                },
                source: "auto",
                padding: 0,
              },
              grid: {
                color: "transparent",
                tickMarkLength: 0,
                zeroLineColor: "rgba(82, 100, 132, 0.2)",
                offsetGridLines: true,
              },
            },
        },
      }}
    />
  );
};

export const DefaultRevenueChart = () => {
  return (
    <Line
      className="ecommerce-line-s3"
      data={todayRevenue}
      options={{
        plugins: {
          legend: {
              display: false,
          },
          tooltip: {
              enabled: true,
              displayColors: false,
              backgroundColor: "#1c2b46",
              titleFont: {
                size: '8px',
              },
              titleColor: "#fff",
              titleMarginBottom: 4,
              bodyColor: "#fff",
              bodyFont: {
                size: '8px',
              },
              bodySpacing: 4,
              padding: 6,
              footerMarginTop: 0,
              callbacks: {
                title: function () {
                  return false; 
                },
                label: function (context) {
                    return context.parsed.y;
                },
              },
          },
        },
        maintainAspectRatio: false,
        scales: {
          y: {
              display: false,
              ticks: {
                beginAtZero: false,
                color:"#9eaecf", 
                font: {
                  size: '12px',
                },
                padding: 0,
              },
              grid: {
                color: "rgba(82, 100, 132, 0.2)",
                tickMarkLength: 0,
                zeroLineColor: "rgba(82, 100, 132, 0.2)",
              },
            },
          x: {
              display: false,
              ticks: {
                color:"#9eaecf", 
                font: {
                  size: '12px',
                },
                source: "auto",
                padding: 0,
              },
              grid: {
                color: "transparent",
                tickMarkLength: 0,
                zeroLineColor: "rgba(82, 100, 132, 0.2)",
                offsetGridLines: true,
              },
            },
        },
      }}
    />
  );
};

export const DefaultVisitorChart = () => {
  return (
    <Line
      className="ecommerce-line-s3"
      data={todayVisitors}
      options={{
        plugins: {
          legend: {
              display: false,
          },
          tooltip: {
              enabled: true,
              displayColors: false,
              backgroundColor: "#1c2b46",
              titleFont: {
                size: '8px',
              },
              titleColor: "#fff",
              titleMarginBottom: 4,
              bodyColor: "#fff",
              bodyFont: {
                size: '8px',
              },
              bodySpacing: 4,
              padding: 6,
              footerMarginTop: 0,
              callbacks: {
                title: function () {
                  return false; 
                },
                label: function (context) {
                    return context.parsed.y;
                },
              },
          },
        },
        maintainAspectRatio: false,
        scales: {
          y: {
              display: false,
              ticks: {
                beginAtZero: false,
                color:"#9eaecf", 
                font: {
                  size: '12px',
                },
                padding: 0,
              },
              grid: {
                color: "rgba(82, 100, 132, 0.2)",
                tickMarkLength: 0,
                zeroLineColor: "rgba(82, 100, 132, 0.2)",
              },
            },
          x:{
              display: false,
              ticks: {
                color:"#9eaecf", 
                font: {
                  size: '12px',
                },
                source: "auto",
                padding: 0,
              },
              grid: {
                color: "transparent",
                tickMarkLength: 0,
                zeroLineColor: "rgba(82, 100, 132, 0.2)",
                offsetGridLines: true,
              },
            },
        },
      }}
    />
  );
};

export const DefaultSalesStatistics = ({ state }) => {
  const [data, setData] = useState(salesStatistics);
  useEffect(() => {
    let object;
    if (state === "Daily") {
      object = salesStatisticsSet2;
    } else if (state === "Monthly") {
      object = salesStatisticsSet3;
    } else {
      object = salesStatisticsSet4;
    }
    setData(object);
  }, [state]);
  return (
    <Line
      className="ecommerce-line-s4"
      data={data}
      options={{
        plugins: {
          legend: {
              display: false,
          },
          tooltip: {
              enabled: true,
              displayColors: false,
              backgroundColor: "#1c2b46",
              titleFont: {
                size: '13px',
              },
              titleColor: "#fff",
              titleMarginBottom: 6,
              bodyColor: "#fff",
              bodyFont: {
                size: '12px',
              },
              bodySpacing: 4,
              padding: 10,
              footerMarginTop: 0,
              callbacks: {
                label: function (context) {
                    return context.parsed.y;
                },
              },
          },
        },
        maintainAspectRatio: false,
        scales: {
          y:{
              display: true,
              ticks: {
                beginAtZero: true,
                color:"#9eaecf", 
                font: {
                  size: '11px',
                },
                padding: 10,
                callback: function (value, index, values) {
                  return "$ " + value;
                },
                min: 0,
                stepSize: 3000,
              },
              grid: {
                color: "rgba(82, 100, 132, 0.2)",
                tickMarkLength: 0,
                zeroLineColor: "rgba(82, 100, 132, 0.2)",
              },
            },
          x:{
              display: false,
              ticks: {
                color:"#9eaecf", 
                font: {
                  size: '9px',
                },
                source: "auto",
                padding: 10,
              },
              grid: {
                color: "transparent",
                tickMarkLength: 0,
                zeroLineColor: "transparent",
              },
            },
        },
      }}
    />
  );
};

export const DefaultOrderStatistics = () => {
  return (
    <Doughnut
      data={orderStatistics}
      options={{
        plugins: {
          legend: {
              display: false,
          },
          tooltip: {
              enabled: true,
              displayColors: false,
              backgroundColor: "#1c2b46",
              titleFont: {
                size: '13px',
              },
              titleColor: "#fff",
              titleMarginBottom: 6,
              bodyColor: "#fff",
              bodyFont: {
                size: '12px',
              },
              bodySpacing: 4,
              padding: 10,
              footerMarginTop: 0,
              callbacks: {
                label: function (context) {
                    return context.parsed.y;
                },
              },
          },
        },
        rotation: -1.5,
        cutoutPercentage: 70,
        maintainAspectRatio: false,
      }}
    />
  );
};
