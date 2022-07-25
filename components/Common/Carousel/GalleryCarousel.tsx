import { useMemo } from "react";
import Carousel from ".";
import { Photo } from "../../../utils/api/types/cms";

export const GalleryCarousel = ({ gallery, onClick }: { gallery: Photo[], onClick?: () => void}) => {
  const cards = useMemo(() => 
    gallery.map((photo) => ({
      photo: photo,
    })), [gallery]);

  return (
    <Carousel
      cards={cards}
    />
  );
}
