import { useSelector } from "react-redux";
import { forecastType } from "../store/weather-slice";
import ThisWeekForcastCard from "./this-week-forcast-card";
import TodayForcastCard from "./today-forcast-card";

import Slider from "react-slick";
import { convertUnixToTime } from "../utilities/general-utilities";

const GetTitle: React.FC<{
  text: string;
  additionClass?: string;
}> = ({ text, additionClass }) => {
  return <div className={"text-center p-5" + additionClass}><div className="font-semibold text-xl">{text}</div></div>;
};

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <button
      className={"cus-slick-next cus-slick-color"}
      // className={className}
      style={{ ...style }}
      onClick={() => {
        console.log("next");
        onClick();
      }}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;

  return (
    <button
      className={"cus-slick-prev cus-slick-color"}
      // className={className}
      style={{ ...style }}
      onClick={() => {
        console.log("prev");
        onClick();
      }}
    />
  );
}

const ForecastColumn = () => {
  const forecastWeatherData: forecastType[] = useSelector(
    (state: any) => state.weather.forecast
  );
  // console.log(
  //   "🚀 ~ file: forcast-column.tsx ~ line 14 ~ ForecastColumn ~ allWeatherData",
  //   forecastWeatherData
  // );

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    className: "mx-12",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots: any) => (
      <div
        style={{
          position: "static",
        }}
      >
        <ul style={{ margin: "30px" }}> {dots} </ul>
      </div>
    ),

    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col">
      <div className="py-5">
        <GetTitle text="Today" />
      </div>

      <div className="py-0 lg:px-0 md:px-32 sm:px-12">
        <Slider {...settings}>
          {forecastWeatherData
            .map((item: forecastType, index: number) => {
              return (
                <TodayForcastCard
                  key={index}
                  time={item.time}
                  iconId={item.iconId}
                  temp={item.temp}
                />
              );
            })
            .slice(0, 8)}
        </Slider>
      </div>

      <GetTitle text="This Week" additionClass="pt-0" />

      <div className="flex flex-col p-5">
        {forecastWeatherData
          .filter(
            (item) =>
              parseInt(
                convertUnixToTime(item.time).toISOString().substr(11, 2)
              ) === 12
          )
          .map((item, index) => (
            <ThisWeekForcastCard
              key={index}
              time={convertUnixToTime(item.time)}
              iconId={item.iconId}
              temp={item.temp}
            />
          ))}
      </div>
    </div>
  );
};

export default ForecastColumn;
