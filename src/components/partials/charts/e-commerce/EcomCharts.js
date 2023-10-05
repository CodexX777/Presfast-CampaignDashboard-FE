import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import { Chart, CategoryScale, LinearScale, BarElement, PointElement, Tooltip, Legend, } from "chart.js";
Chart.register(CategoryScale, LinearScale, BarElement, PointElement, Tooltip, Legend,);

import {
  totalSales,
  averargeOrder,
  averargeOrderSet2,
  averargeOrderSet3,
  averargeOrderSet4,
  totalOrders,
  totalCustomers,
  trafficSources,
  trafficSourcesSet2,
  trafficSourcesSet4,
  trafficSourcesSet3,
  storeVisitors,
} from "./Data";

export const TotalSalesChart = () => {
  return (
    <Line
      className="ecommerce-line-chart-s1"
      data={totalSales}
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
                size: '10px',
              },
              titleColor: "#fff",
              titleMarginBottom: 4,
              bodyColor: "#fff",
              bodyFont: {
                size: '10px',
              },
              bodySpacing: 4,
              padding: 6,
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
                display: false,
                color: "transparent",
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
                display: false,
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

export const AverageOrderChart = ({ state }) => {
  const [data, setData] = useState(averargeOrder);
  useEffect(() => {
    if (state === "7") {
      setData(averargeOrderSet2);
    } else if (state === "15") {
      setData(averargeOrderSet3);
    } else {
      setData(averargeOrderSet4);
    }
  }, [state]);
  return (
    <Bar
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
                size: '9px',
              },
              titleColor: "#fff",
              titleMarginBottom: 6,
              bodyColor: "#fff",
              bodyFont: {
                size: '9px',
              },
              bodySpacing: 4,
              padding: 6,
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
          y: {
              display: true,
              ticks: {
                beginAtZero: false,
                color:"#9eaecf", 
                font: {
                  size: '12px',
                },
                padding: 0,
                display: false,
                stepSize: 100,
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
                zeroLineColor: "transparent",
                offsetGridLines: true,
              },
            },
        },
      }}
    ></Bar>
  );
};

export const TotalOrderChart = () => {
  return (
    <Line
      className="ecommerce-line-chart-s1"
      data={totalOrders}
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
                size: '10px',
              },
              titleColor: "#fff",
              titleMarginBottom: 4,
              bodyColor: "#fff",
              bodyFont: {
                size: '10px',
              },
              bodySpacing: 4,
              padding: 6,
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
                display: false,
                color: "transparent",
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
                display: false,
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

export const TotalCustomerChart = () => {
  return (
    <Line
      className="ecommerce-line-chart-s1"
      data={totalCustomers}
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
                size: '10px',
              },
              titleColor: "#fff",
              titleMarginBottom: 4,
              bodyColor: "#fff",
              bodyFont: {
                size: '10px',
              },
              bodySpacing: 4,
              padding: 6,
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
              gridLines: {
                display: false,
                color: "transparent",
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
                display: false,
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

export const TrafficSourcesChart = ({ state }) => {
  const [data, setData] = useState(trafficSources);
  useEffect(() => {
    if (state === "7") {
      setData(trafficSourcesSet2);
    } else if (state === "15") {
      setData(trafficSourcesSet3);
    } else {
      setData(trafficSourcesSet4);
    }
  }, [state]);
  return (
    <Doughnut
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
        rotation: 1,
        cutoutPercentage: 40,
        maintainAspectRatio: false,
      }}
    />
  );
};

export const StoreVisitorsChart = () => {
  return (
    <Line
      data={storeVisitors}
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
          y: {
              display: true,

              ticks: {
                color:"#9eaecf", 
                font: {
                  size: '12px',
                },
                padding: 8,
                stepSize: 2400,
                display: false,
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
                zeroLineColor: "transparent",
                offsetGridLines: true,
              },
            },
        },
      }}
    />
  );
};
