import { Photo } from "../../utils/api/types/cms";
import Image from "next/image";

type StrapiPhotoProps = {
  photo: Photo;
  width?: number;
  height?: number;
  isBackground?: boolean;
};

export const StrapiPhoto: React.FC<StrapiPhotoProps> = ({ photo, width, height, isBackground }) => {
  return (<Image 
    src={photo.formats.large.url}
    alt={photo.caption}
    width={width}
    height={height}
    objectFit="cover"
    placeholder='blur'
    layout={isBackground ? 'fill' : 'responsive'}
    objectPosition="center"
    blurDataURL={photo?.formats.thumbnail.url}

  />
)}
