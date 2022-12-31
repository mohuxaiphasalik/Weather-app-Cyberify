import axios from "axios";
import {
  currentConditionType,
  forecastType,
  locationType,
} from "../../store/weather-slice";

export default async function handler(req: any, res: any) {
  //api keys
  const APIKeyOpenWeatherMap = process.env.REACT_APP_Open_Weather_Map_API;

  //function
  async function getLocationCoordinates(
    cityName: string
  ): Promise<locationType> {
    const geoLocationAPI: string =
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
      cityName +
      "&appid=" +
      APIKeyOpenWeatherMap;

    const locationRes = await axios.get(geoLocationAPI);
    const locationData = locationRes.data;

    //location will only return one result, so no need for mapping
    const location: locationType = {
      lat: locationData[0].lat,
      lon: locationData[0].lon,
      name: locationData[0].name,
      country: locationData[0].country,
    };

    return location;
  }

  async function getCurrentCondition(
    mLocation: locationType
  ): Promise<currentConditionType> {
    const currentConditionAPI: string =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      mLocation.lat +
      "&lon=" +
      mLocation.lon +
      "&units=metric&appid=" +
      APIKeyOpenWeatherMap;

    const currentConditionRes = await axios.get(currentConditionAPI);
    const currentConditionData = currentConditionRes.data;

    const currentTime = new Date();

    //location will only return one result, so no need for mapping
    const mCurrentCondition: currentConditionType = {
      weatherDescription: currentConditionData.weather[0].description,
      cloud: currentConditionData.clouds.all,
      feels_like: currentConditionData.main.feels_like,
      fetchTime: currentTime.toISOString(),
      humidity: currentConditionData.main.humidity,
      iconId: currentConditionData.weather[0].icon,
      pressure: currentConditionData.main.pressure,
      sunrise: currentConditionData.sys.sunrise,
      sunset: currentConditionData.sys.sunset,
      temp: currentConditionData.main.temp,
      timezone: currentConditionData.timezone,
      visibility: currentConditionData.visibility,
      wind: {
        speed: currentConditionData.wind.speed,
        deg: currentConditionData.wind.deg,
      },
    };

    return mCurrentCondition;
  }

  async function get5days3hoursForecase(
    mLocation: locationType
  ): Promise<forecastType[]> {
    const forecastAPI: string =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      mLocation.lat +
      "&lon=" +
      mLocation.lon +
      "&units=metric&appid=" +
      APIKeyOpenWeatherMap;

    const forecastRes = await axios.get(forecastAPI);
    const forecastDataList: forecastType[] = forecastRes.data.list.map(
      (item: any) => {
        return {
          time: item.dt,
          temp: item.main.temp,
          iconId: item.weather[0].icon,
        };
      }
    );

    return forecastDataList;
  }

  switch (req.method) {
    case "GET": {
      const quertData = req.query;

      const searchedCityName = quertData.searchedCityName;

      //data types

      //logic
      const location: locationType = await getLocationCoordinates(
        searchedCityName
      );
      const currentCondition: currentConditionType = await getCurrentCondition(
        location
      );

      const forecast: forecastType[] = await get5days3hoursForecase(location);

      const responseObj = {
        location,
        currentCondition,
        forecast,
      };

      res.status(200).json(responseObj);

      break;
    }

    default: {
      res.status(404).json("Req Not Found");
      break;
    }
  }
}
