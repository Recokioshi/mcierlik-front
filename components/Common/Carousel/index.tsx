import { Box, Button, Container, createStyles, Space, Text, useMantineTheme } from "@mantine/core";
import { useMemo, useRef } from "react";
import { useMediaQueryForBeakpoint } from "../../../utils/styling";
import { CarouselCard, CarouselCardProps } from "./CarouselCard";

const scrollByWithPeriod = (
  element: HTMLElement,
  offset: number,
  direction: "left" | "right"
) => {
  element.scrollBy({
    top: 0,
    left: direction === "left" ? -offset : offset,
    behavior: "smooth",
  });
};


type CarouselProps = {
  cards: CarouselCardProps[]
};

const useStyles = createStyles((theme) => ({
  container: {
    position: 'relative',
    margin: 0,
    padding: 0,
  },
  flexCarousel: {
    display: "flex",
    width: '100%',
    padding: theme.spacing.xs,
    overflowX: 'scroll',
    scrollBehavior: 'smooth',
    scrollWidth: 'none',
    '&::-webkit-scrollbar': { 
      display: 'none',
    },
  },
  cardWrapper: {
    margin: theme.spacing.xs,
    minWidth: `calc(100% - ${theme.spacing.xs}px)`,
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      minWidth: `calc(50% - ${theme.spacing.xs * 2}px)`,
    },
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      minWidth: `calc(33.33% - ${theme.spacing.xs * 2}px)`,
    },
    [`@media (min-width: ${theme.breakpoints.lg}px)`]: {
      minWidth: `calc(25% - ${theme.spacing.xs * 2}px)`,
    },
  },

  buttonLeft: {
    position: 'absolute',
    bottom: `calc(50% - ${theme.spacing.lg}px)`,
    left: theme.spacing.xs,
    zIndex: 1,
  },

  buttonRight: {
    position: 'absolute',
    bottom: `calc(50% - ${theme.spacing.lg}px)`,
    right: theme.spacing.xs,
    zIndex: 1,
  },
}));

const Carousel: React.FC<CarouselProps> = ({ cards }) => {
  const { classes } = useStyles();
  const carouselRef = useRef<HTMLDivElement>(null);

  const theme = useMantineTheme();

  const matchesXl = useMediaQueryForBeakpoint('xl');
  const matchesLg = useMediaQueryForBeakpoint('lg');
  const matchesMd = useMediaQueryForBeakpoint('md');
  const matchesSm = useMediaQueryForBeakpoint('sm');

  const maxItems = (matchesLg || matchesXl) ? 4 : matchesMd ? 3 : matchesSm ? 2 : 1;
  const itemWidth = useMemo(() => carouselRef.current ? carouselRef.current.clientWidth / maxItems : 0,
    [maxItems]);

  const shouldShowButtons = useMemo(() => cards.length > maxItems, [cards, maxItems]);

  const onScrollClick = useMemo(() => (direction: "left" | "right") => 
    () => scrollByWithPeriod(carouselRef.current!, itemWidth, direction)
  , [itemWidth]);

  return (
    <Container className={classes.container}>
      <Text size="xl" color="primary" align="center">
        {`CHECK OUT OUR LATEST PRODUCT${cards.length > 1 ? "S" : ""}`}
      </Text>
      <Space h="lg" />
      <Box className={classes.flexCarousel} sx={{justifyContent: shouldShowButtons ? 'flex-start' : 'center'}} ref={carouselRef} >
        {cards.map((card, index) => (
          <div key={`${card.title}${index}`} className={classes.cardWrapper}>
            <CarouselCard {...card} />
          </div>
        ))}
      </Box>
      <Space h="lg" />
      {shouldShowButtons && (
        <>
          <Button variant="outline" color="gray" compact className={classes.buttonLeft} onClick={onScrollClick('left')}>
            {`<`}
          </Button>
          <Button variant="outline" color="gray" compact className={classes.buttonRight} onClick={onScrollClick('right')}>
            {`>`}
          </Button>
        </>
      )}
      
    </Container>
  );
}

export default Carousel;