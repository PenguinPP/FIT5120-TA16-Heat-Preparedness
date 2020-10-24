import React from "react";
import hotDayData from "./hotDayData.json";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";
import { useTheme } from "@material-ui/core/styles";

export default function HotDays() {
  const theme = useTheme();

  let dates = [];
  let heatDays = [];

  for (let key in hotDayData) {
    dates.push(key);
    heatDays.push(hotDayData[key]);
  }

  console.log(dates, heatDays);
  return (
    <ReactEcharts
      style={{ minHeight: "400px" }}
      option={{
        title: {
          text: "Unusually Hot Days in Victoria",
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "white",
          borderColor: theme.palette.primary.light,
          borderWidth: "1",
          textStyle: {
            color: "black",
          },
        },
        xAxis: {
          data: dates,
          axisLabel: {
            inside: false,
            textStyle: {
              color: "black",
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          z: 10,
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#999",
            },
          },
        },
        dataZoom: [
          {
            type: "inside",
          },
        ],
        series: [
          {
            type: "bar",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: theme.palette.secondary.dark },
                { offset: 0.5, color: theme.palette.secondary.main },
                { offset: 1, color: theme.palette.secondary.light },
              ]),
            },
            name: "Unusually hot days",
            data: heatDays,
          },
        ],
      }}
    />
  );
}
