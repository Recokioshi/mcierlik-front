import { useMemo } from "react";
import Carousel from ".";
import { Photo } from "../../../utils/api/types/cms";

export const GalleryCarousel = ({ gallery, onClick }: { gallery: Photo[], onClick?: (id: string) => void}) => {
  const cards = useMemo(() => 
    gallery.map((photo) => ({
      photo: photo,
      id: photo.id,
      onClick
    })), [gallery, onClick]);

  return (
    <Carousel
      cards={cards}
    />
  );
}
