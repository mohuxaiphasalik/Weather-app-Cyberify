import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faLocationDot,
  faClock,
  faCloud,
  faTemperatureHalf,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { allWeatherType } from "../store/weather-slice";
import { convertUnixToTime } from "../utilities/general-utilities";
import CurrentConditionMainTempGraphCard from "./current-condition-main-temp-graph-card";
import GetIconButton from "./get-icon-button";
import ImageIcon from "./image-icon";

const DisplayIconWithText: React.FC<{
  iconProp: IconProp;
  text: string;
}> = ({ iconProp, text }) => {
  return (
    <div className="flex flex-row">
      <GetIconButton iconProp={iconProp} isDisabled={true}/>
      <div>{text}</div>
    </div>
  );
};

const PaddingWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <div className="py-5 px-8">{children}</div>;
};

const CurrentConditionMainCard = () => {
  const allWeatherData: allWeatherType = useSelector(
    (state: any) => state.weather
  );

  const timeZoneInt = parseInt(
    (allWeatherData.currentCondition!.timezone / 3600).toString()
  );

  const mFetchTime = new Date(allWeatherData.currentCondition!.fetchTime);

  return (
    // row that divides graph and info
    <div className="primary-color p-5 flex md:flex-row flex-col rounded-lg min-width-main-cards">
      <div className="md:w-2/4 w-full">
        {/* column for info */}
        <div className="flex flex-col text-gray-50">
          <PaddingWrapper>
            <div className="flex flex-row justify-between">
              <DisplayIconWithText
                iconProp={faLocationDot}
                // text={"Lahore, PK"}
                text={`${allWeatherData.location!.name}, ${
                  allWeatherData.location!.country
                }`}
              />

              {/* <div>Today: 00:32 PM</div> */}

              <DisplayIconWithText
                iconProp={faClock}
                text={`Today:
                ${mFetchTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  // hour12: false,
                })}`}
              />
            </div>
          </PaddingWrapper>

          <div className="m-auto">
            <PaddingWrapper>
              <div className="flex flex-row justify-center items-center">
                <ImageIcon
                  iconId={allWeatherData.currentCondition!.iconId}
                  imageSize={150}
                />
                <div className="flex flex-col items-center">
                  <div className="text-7xl">
                    {parseInt(allWeatherData.currentCondition!.temp.toString())}
                    °
                  </div>
                  <div className="text-lg pr-3">
                    {allWeatherData.currentCondition!.weatherDescription}
                  </div>
                </div>
              </div>
            </PaddingWrapper>
          </div>

          <PaddingWrapper>
            <div className="flex flex-row justify-between">
              <DisplayIconWithText
                iconProp={faCloud}
                text={`${allWeatherData.currentCondition!.cloud} %`}
              />
              {
                <DisplayIconWithText
                  iconProp={faGlobe}
                  text={`${timeZoneInt > 0 ? "+" : ""}${timeZoneInt} GMT`}
                />
              }
              <DisplayIconWithText
                iconProp={faTemperatureHalf}
                text={`${parseInt(allWeatherData.currentCondition!.feels_like.toString())} °`}
              />
            </div>
          </PaddingWrapper>
        </div>
      </div>

      {/* graph card */}
      <div className="md:w-2/4 w-full pt-4 pb-2 md:py-2">
        <CurrentConditionMainTempGraphCard />
      </div>
    </div>
  );
};

export default CurrentConditionMainCard;
