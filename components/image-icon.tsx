import { getImageSize } from "next/dist/server/image-optimizer";
import Image from "next/image";
import { getIconImageUrl } from "../utilities/api-utilities";

const ImageIcon: React.FC<{
  iconId: string;
  imageSize?: number;
}> = ({ iconId, imageSize = 80 }) => {
  return (
    <div className="">
      <Image
        // loader={myLoader}
        src={getIconImageUrl(iconId)}
        alt={iconId}
        width={imageSize}
        height={imageSize}
        objectFit="fill"
      />
    </div>
  );
};

export default ImageIcon;
