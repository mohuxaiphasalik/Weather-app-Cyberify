import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";

//data types
export interface locationType {
  lat: number;
  lon: number;
  name: string;
  country: string;
}

export interface weatherType {
  iconId: string;
  temp: number;
}

export interface currentConditionType extends weatherType {
  weatherDescription: string;

  feels_like: number;
  pressure: number;
  humidity: number;
  visibility: number;
  wind: { speed: number; deg: number };
  cloud: number;
  sunrise: number;
  sunset: number;
  timezone: number;
  fetchTime: string;
}

export interface forecastType extends weatherType {
  time: number;
}

export interface allWeatherType {
  location?: locationType;
  currentCondition?: currentConditionType;
  forecast?: forecastType[];
}

// Define the initial state using that type
const initialState: allWeatherType = {
  location: undefined,
  currentCondition: undefined,
  forecast: undefined,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setAllWeatherData: (state, action: PayloadAction<allWeatherType>) => {
      // state.currentCondition = action.payload.currentCondition;
      // state.location = action.payload.location;
      // state.forecast = action.payload.forecast;

      return action.payload;
    },
  },
  extraReducers: {
    // Each time when pages that have getStaticProps or getServerSideProps are opened by user the HYDRATE action will be dispatched. This may happen during initial page load and during regular page navigation. The payload of this action will contain the state at the moment of static generation or server side rendering, so your reducer must merge it with existing client state properly.
    [HYDRATE]: (state, action) => {
      // state.currentCondition = action.payload.weather.currentCondition;
      // state.location = action.payload.weather.location;
      // state.forecast = action.payload.weather.forecast;

      return {
        ...state,
        ...action.payload.weather,
      };
    },
  },
});

export const { setAllWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;
