import axios from "axios";
import store from "../store/store";
import {
  allWeatherType,
  currentConditionType,
  forecastType,
  locationType,
  setAllWeatherData,
} from "../store/weather-slice";

export async function getAllWeatherData(
  searchedCityName: string
): Promise<allWeatherType> {

  //the logic is hidden in the backend because it contains credentials
  const responseGet = await fetch(
    `/api/allWeatherData?searchedCityName=${searchedCityName}`
  );

  const allWeatherDataObj: allWeatherType = await responseGet.json();

  return allWeatherDataObj;
}

export function getIconImageUrl(iconId: string): string {
  return `http://openweathermap.org/img/wn/${iconId}@2x.png`;
}

export async function getDummyAllWeatherData(): Promise<allWeatherType> {
  return {
    location: {
      lat: 31.5656822,
      lon: 74.3141829,
      name: "Lahore",
      country: "PK",
    },
    currentCondition: {
      weatherDescription: "clear sky",
      cloud: 0,
      feels_like: 34.9,
      fetchTime: "2022-05-26T06:26:21.743Z",
      humidity: 31,
      iconId: "01d",
      pressure: 1004,
      sunrise: 1653523248,
      sunset: 1653573541,
      temp: 35.01,
      timezone: 18000,
      visibility: 7000,
      wind: {
        speed: 4.12,
        deg: 210,
      },
    },
    forecast: [
      {
        time: 1653555600,
        temp: 36.54,
        iconId: "01d",
      },
      {
        time: 1653566400,
        temp: 37.98,
        iconId: "01d",
      },
      {
        time: 1653577200,
        temp: 36.64,
        iconId: "01n",
      },
      {
        time: 1653588000,
        temp: 34.85,
        iconId: "01n",
      },
      {
        time: 1653598800,
        temp: 32.39,
        iconId: "01n",
      },
      {
        time: 1653609600,
        temp: 30.81,
        iconId: "01n",
      },
      {
        time: 1653620400,
        temp: 36.07,
        iconId: "01d",
      },
      {
        time: 1653631200,
        temp: 41.39,
        iconId: "01d",
      },
      {
        time: 1653642000,
        temp: 43.91,
        iconId: "01d",
      },
      {
        time: 1653652800,
        temp: 43.46,
        iconId: "01d",
      },
      {
        time: 1653663600,
        temp: 39.6,
        iconId: "01n",
      },
      {
        time: 1653674400,
        temp: 36.73,
        iconId: "01n",
      },
      {
        time: 1653685200,
        temp: 34.59,
        iconId: "01n",
      },
      {
        time: 1653696000,
        temp: 33.46,
        iconId: "01n",
      },
      {
        time: 1653706800,
        temp: 37.37,
        iconId: "01d",
      },
      {
        time: 1653717600,
        temp: 42.75,
        iconId: "01d",
      },
      {
        time: 1653728400,
        temp: 45.6,
        iconId: "01d",
      },
      {
        time: 1653739200,
        temp: 45.28,
        iconId: "01d",
      },
      {
        time: 1653750000,
        temp: 39.94,
        iconId: "01n",
      },
      {
        time: 1653760800,
        temp: 35.8,
        iconId: "01n",
      },
      {
        time: 1653771600,
        temp: 32.59,
        iconId: "01n",
      },
      {
        time: 1653782400,
        temp: 30.13,
        iconId: "01d",
      },
      {
        time: 1653793200,
        temp: 34.91,
        iconId: "01d",
      },
      {
        time: 1653804000,
        temp: 41.55,
        iconId: "01d",
      },
      {
        time: 1653814800,
        temp: 44.47,
        iconId: "01d",
      },
      {
        time: 1653825600,
        temp: 44.4,
        iconId: "01d",
      },
      {
        time: 1653836400,
        temp: 39.61,
        iconId: "01n",
      },
      {
        time: 1653847200,
        temp: 36.67,
        iconId: "01n",
      },
      {
        time: 1653858000,
        temp: 34.03,
        iconId: "01n",
      },
      {
        time: 1653868800,
        temp: 31.59,
        iconId: "01d",
      },
      {
        time: 1653879600,
        temp: 35.74,
        iconId: "03d",
      },
      {
        time: 1653890400,
        temp: 42.98,
        iconId: "03d",
      },
      {
        time: 1653901200,
        temp: 44.94,
        iconId: "02d",
      },
      {
        time: 1653912000,
        temp: 43.86,
        iconId: "01d",
      },
      {
        time: 1653922800,
        temp: 38.86,
        iconId: "01n",
      },
      {
        time: 1653933600,
        temp: 36.33,
        iconId: "01n",
      },
      {
        time: 1653944400,
        temp: 33.59,
        iconId: "01n",
      },
      {
        time: 1653955200,
        temp: 31.66,
        iconId: "01d",
      },
      {
        time: 1653966000,
        temp: 38.44,
        iconId: "01d",
      },
      {
        time: 1653976800,
        temp: 43.73,
        iconId: "01d",
      },
    ],
  };
}

export async function getCityNameFromIPA(): Promise<string> {
  const response = await fetch(
    `/api/currentLocation?lat=${0}&lng=${0}&useIPA=true`
  );

  return JSON.stringify(response);
}

// Step 1: Get user coordinates
export function setAllWeatherDataToCurrentCity(storeDispatch: any) {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  async function success(pos: any) {
    let currentCityName = "";

    var crd = pos.coords;
    var lat = crd.latitude.toString();
    var lng = crd.longitude.toString();

    //get city logic moved to backend because it requires .env variable that are only avaliblae in SSR and backend
    const responseGet = await fetch(
      `/api/currentLocation?lat=${lat}&lng=${lng}&useIPA=false`
    );
    currentCityName = await responseGet.json();

    const allWeatherData = await getAllWeatherData(currentCityName);
    storeDispatch(setAllWeatherData(allWeatherData));
  }

  function error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  //browser apis are not avalible in SSR or backend, so navigator must be used here
  navigator.geolocation.getCurrentPosition(success, error, options);
}
