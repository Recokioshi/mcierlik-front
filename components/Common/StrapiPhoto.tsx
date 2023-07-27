import Image from 'next/image';
import { Photo } from '../../utils/api/types/cms';

type StrapiPhotoProps = {
  photo: Photo;
  width?: number;
  height?: number;
  isBackground?: boolean;
};

export const StrapiPhoto: React.FC<StrapiPhotoProps> = ({ photo, width, height, isBackground }) => {
  const { formats } = photo;
  const fullFormat = formats?.large || formats?.medium || formats?.small || photo;
  const thumbnailFormat = formats?.thumbnail || undefined;
  return (
    <Image
      src={fullFormat.url}
      alt={photo.caption}
      width={width}
      height={height}
      objectFit="contain"
      placeholder={thumbnailFormat?.url ? 'blur' : 'empty'}
      layout={isBackground ? 'fill' : 'responsive'}
      objectPosition="center"
      blurDataURL={thumbnailFormat?.url}
    />
  );
};
