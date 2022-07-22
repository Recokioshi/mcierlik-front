import Image from "next/image"
import { Box, Skeleton } from "@mantine/core"
import { useCallback, useState } from "react";

type ImageWithSkeletonProps = {
  url: string
  alt: string
  width: number
  height: number
  objectFit?: React.ComponentProps<typeof Image>["objectFit"]
  className?: string
  onLoad?: () => void
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({ 
  url,
  alt,
  height,
  width,
  className = '',
  onLoad,
  objectFit = "cover",
 }) => {
  const [loading, setLoading] = useState(true);
  
  const onLoadHandler = useCallback(() => {
    setLoading(false);
    onLoad && onLoad();
  }, [onLoad]);

  return (
    <Box>
      <Skeleton sx={{ display: loading ? 'block' : 'none' }} height={480} width={480} className={className}/>
      <Box sx={{ display: loading ? 'none' : 'block' }}>
        <Image 
          src={url}
          alt={alt}
          width={width}
          height={height}
          objectFit={objectFit}
          onLoad={onLoadHandler}
        />
      </Box>
    </Box>
  );
}