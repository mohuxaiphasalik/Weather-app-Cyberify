import ImageIcon from "./image-icon";

const Spacer: React.FC<{}> = ({}) => {
  return <div className="px-3"></div>;
};

const ThisWeekForcastCard: React.FC<{
  time: Date;
  iconId: string;
  temp: number;
}> = ({ time, iconId, temp }) => {
  function getWeekDayName() {
    return time.toLocaleDateString("en-GB", {
      weekday: "long",
    });
  }

  return (
    <div className="flex flex-row justify-evenly items-center py-2">
      <div
        style={{
          paddingRight: `${Math.max(10 - getWeekDayName().length, 0) + 3}px`,
        }}
      >
        <div>{`${getWeekDayName()}`}</div>
        <div>
          {time.toLocaleDateString("en-GB", {
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      <Spacer />
      <ImageIcon iconId={iconId} />
      <Spacer />

      <div>{parseInt(temp.toString())}°</div>
    </div>
  );
};

export default ThisWeekForcastCard;
