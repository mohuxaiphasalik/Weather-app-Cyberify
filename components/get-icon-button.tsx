import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GetIconButton: React.FC<{
  iconProp: IconProp;
  isHoverPrimaryColor?: boolean;
  isDisabled?: boolean;
}> = ({ iconProp, isHoverPrimaryColor = false,isDisabled=false }) => {
  return (
    <button className={isHoverPrimaryColor ? "text-primary-color" : ""} disabled={isDisabled}>
      <FontAwesomeIcon className="sm:px-4 px-1" icon={iconProp} size={"lg"} />
    </button>
  );
};

export default GetIconButton;
