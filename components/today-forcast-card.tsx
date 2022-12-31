import Image from "next/image";
import { getIconImageUrl } from "../utilities/api-utilities";
import {
  checkForTodayOrTommorow,
  convertUnixToTime,
} from "../utilities/general-utilities";
import ImageIcon from "./image-icon";

const TodayForcastCard: React.FC<{
  time: number;
  iconId: string;
  temp: number;
}> = ({ time, iconId, temp }) => {
  const convertedTime = convertUnixToTime(time);

  // console.log(time);
  return (
    <div className="flex flex-col items-center">
      <div>
        {convertedTime.toLocaleTimeString("en-US", {
          // en-US can be set to 'default' to use user's browser settings
          hour: "2-digit",
          // minute: "2-digit",
          // hour12: false,
        })}
      </div>
      <div className="text-xs">{checkForTodayOrTommorow(convertedTime)}</div>
      <ImageIcon iconId={iconId} />
      <div>{parseInt(temp.toString())}°</div>
    </div>
  );
};

export default TodayForcastCard;
