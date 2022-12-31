import { useSelector } from "react-redux";
import { currentConditionType, forecastType } from "../store/weather-slice";
import { degToCompass } from "../utilities/general-utilities";
import AdditionalInfoCard from "./additional-info-card";
import CurrentConditionMainCard from "./current-condition-main-card";
import SearchBar from "./search-bar";


const CurrentConditionColumn = () => {
  const currentConditionData: currentConditionType = useSelector(
    (state: any) => state.weather.currentCondition
  );

  return (
    <div className="lg:px-10 md:px-5 sm:px-3 px-2">
      <SearchBar />
      <div className="py-3"></div>
      <CurrentConditionMainCard />
      <div className="py-1"></div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-12">
        <AdditionalInfoCard
          value={currentConditionData.wind.speed}
          title="Wind"
          description="Today's Wind Speed"
          unit={`${"Km/h"} (${degToCompass(currentConditionData.wind.deg)})`}
          minValue={0}
          maxValue={220}
          lowValue={29}
          normalValue={62}
        />
        
        <AdditionalInfoCard
          value={1003}
          title="Pressure"
          description="Today's Pressure"
          unit="hPa"
          minValue={850}
          maxValue={1100}
          lowValue={950}
          normalValue={1020}
        />

        <AdditionalInfoCard
          value={7000}
          title="Visibility"
          description="Today's Visibility"
          unit="m"
          minValue={100}
          maxValue={20000}
          lowValue={5000}
          normalValue={15000}
        />

        <AdditionalInfoCard
          value={32}
          title="Humidity"
          description="Today's Humidity"
          unit="%"
          minValue={0}
          maxValue={100}
          lowValue={25}
          normalValue={40}
        />
      </div>
    </div>
  );
};

export default CurrentConditionColumn;
