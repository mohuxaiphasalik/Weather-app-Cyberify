import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

const AdditionalInfoCard: React.FC<{
  value: number;
  title: string;
  description: string;
  unit: string;
  maxValue: number;
  minValue: number;
  lowValue: number;
  normalValue: number;
}> = ({
  value,
  title,
  description,
  unit,
  maxValue,
  minValue,
  lowValue,
  normalValue,
}) => {
  let mBackGroundColor: string[];
  let statusText: string;
  let statusTextRightPadding: number = 0;

  if (value <= lowValue) {
    mBackGroundColor = ["#00FF00AB", "#00FF00"];
    statusText = "Low";
    statusTextRightPadding = 50;
  } else if (value > lowValue && value <= normalValue) {
    mBackGroundColor = ["#FFFF00AB", "#FFFF00"];
    statusText = "Normal";
    statusTextRightPadding = 40;
  } else {
    mBackGroundColor = ["#FF0000AB", "#FF0000"];
    statusText = "High";
    statusTextRightPadding = 45;
  }

  const mdata = {
    datasets: [
      {
        data: [value - minValue, maxValue - value],
        borderWidth: 0,
        backgroundColor: [mBackGroundColor[0], "#FFFFFFAB"],
        hoverBackgroundColor: [mBackGroundColor[1], "#FFFFFF"],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    // labels: ["Low", "Normal", "High"],
  };

  return (
    <div className="bg-gray-400 rounded-lg px-12 sm:py-7 pb-32 flex flex-col sm:flex-row justify-between sm:items-stretch min-width-main-cards">
      <div className="py-4 sm:w-1/2 w-full">
        <div className="font-medium text-lg">{title}</div>
        {/* <div>{description}</div> */}
        <div className="text-lg">{`${value} ${unit}`}</div>
        <div className="py-3"></div>
      </div>

      {/* stacked elements */}
      <div className="sm:w-1/2 w-full">
        <div className="bg-red-500 relative">
          <div className="absolute right-3">
            <Doughnut
              data={mdata}
              height={70}
              width={105}
              options={{ cutout: 40 }}
            />
          </div>
          {/* change right-10 according to high, low and normal*/}
          <div
            className={`absolute top-10`}
            style={{ right: `${statusTextRightPadding}px` }}
          >
            {statusText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoCard;
