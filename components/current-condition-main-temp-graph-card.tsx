import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { forecastType } from "../store/weather-slice";
import { arrayRotate, convertUnixToTime } from "../utilities/general-utilities";
import GetIconButton from "./get-icon-button";

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

const CurrentConditionMainTempGraphCard = () => {
  const forecastWeatherData: forecastType[] = useSelector(
    (state: any) => state.weather.forecast
  );

  const forecast24Hours = forecastWeatherData
    .slice(0, 8)
    .filter(function (_, i) {
      return i % 2 === 0;
    });

  function getXValues(): string[] {
    let xValues = ["Morning", "Afternoon", "Evening", "Night"];

    const forcastTime24Hours = forecast24Hours.map((item) =>
      parseInt(
        convertUnixToTime(item.time).toLocaleTimeString("en-US", {
          hour: "2-digit",
          hour12: false,
        })
      )
    );

    // console.log(forcastTime24Hours);

    // console.log(arrayRotate(xValues, 2));

    if (forcastTime24Hours[0] > 3 && forcastTime24Hours[0] <= 9) {
      //Morning
      xValues = arrayRotate(xValues, 0);
    } else if (forcastTime24Hours[0] > 9 && forcastTime24Hours[0] <= 15) {
      //Afternoon
      xValues = arrayRotate(xValues, 1);
    } else if (forcastTime24Hours[0] > 15 && forcastTime24Hours[0] <= 21) {
      //Evening
      xValues = arrayRotate(xValues, 2);
    } else {
      //night
      xValues = arrayRotate(xValues, 3);
    }

    return xValues;
  }

  function getYValues():number[] {
    const yValues = forecast24Hours.map((item) =>
      parseInt(item.temp.toString())
    );

    return yValues;
  }

  const mdata = {
    labels: getXValues(),

    datasets: [
      {
        data: getYValues(),
        backgroundColor: "rgba(61, 117, 219)",
        pointBackgroundColor: "rgba(242, 240, 240, 1)",
        pointBorderWidth: 5,
        borderColor: "rgba(61, 117, 219)",
        pointBorderColor: "rgba(242, 240, 240, 1)",
        lineTension: 0.5,
        pointHoverBackgroundColor: "rgba(2, 90, 250)",
        pointHoverBorderColor: "rgba(2, 90, 250)",
        pointHoverBorderWidth: 6,
        // cubicInterpolationMode: "monotone",
      },
    ],
  };

  return (
    <div className="bg-blue-200 h-full rounded-lg py-5 px-5">
      <div>Temperature</div>
      <div className="py-2"></div>
      <Line data={mdata} />
    </div>
  );
};

export default CurrentConditionMainTempGraphCard;
