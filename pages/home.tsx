import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import CurrentConditionColumn from "../components/current-condition-column";
import ForecastColumn from "../components/forcast-column";
import SearchBar from "../components/search-bar";
import { wrapper } from "../store/store";
import {
  allWeatherType,
  currentConditionType,
  forecastType,
  locationType,
  setAllWeatherData,
} from "../store/weather-slice";
import {
  getAllWeatherData,
  getCityNameFromIPA,
  getDummyAllWeatherData,
  setAllWeatherDataToCurrentCity,
} from "../utilities/api-utilities";
import { convertUnixToTime } from "../utilities/general-utilities";

import { server } from "../config";
import { useEffect } from "react";

import { Rings } from "react-loader-spinner";

const HomeScreen = (props: any) => {
  const allWeatherData: allWeatherType = useSelector(
    (state: any) => state.weather
  );

  const dispatch = useDispatch();
  // console.log(
  //   "🚀 ~ file: home.tsx ~ line 16 ~ HomeScreen ~ allWeatherData",
  //   allWeatherData
  // );

  useEffect(() => {
    setAllWeatherDataToCurrentCity(dispatch);
  }, [dispatch]);

  return allWeatherData.location === undefined ? (
    // "grid h-screen place-items-center" to center a div both vertically and horizontally 
    <div className="grid h-screen place-items-center">
      <Rings height="150" width="150" color="#0070f3" ariaLabel="loading" />
    </div>
  ) : (
    <div className="w-full lg:flex lg:flex-row" style={{ minWidth: "400px" }}>
      <div className="main-column-width-child-1">
        <CurrentConditionColumn />
      </div>
      <div className="border-r-2 mx-2"></div>
      <div className="main-column-width-child-2 min-width-main-cards">
        <ForecastColumn />
      </div>
    </div>
  );
};

export default HomeScreen;
