import {
  Box, Button, createStyles, Space,
} from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import {
  MouseEventHandler, TouchEventHandler, useEffect, useMemo, useRef,
} from 'react';
import { useMediaQueryForBeakpoint } from '../../../utils/styling';
import { CarouselCard, CarouselCardProps } from './CarouselCard';

const scrollBy = (
  element: HTMLElement,
  offset: number,
  direction: 'left' | 'right',
) => {
  element.scrollBy({
    top: 0,
    left: direction === 'left' ? -offset : offset,
    behavior: 'smooth',
  });
};

type CarouselProps = {
  cards: CarouselCardProps[];
  height?: string;
};

const useStyles = createStyles((theme) => ({
  container: {
    position: 'relative',
    margin: 0,
    padding: 0,
  },
  flexCarousel: {
    display: 'flex',
    width: '100%',
    height: '100%',
    padding: theme.spacing.xs,
    overflowX: 'scroll',
    scrollBehavior: 'smooth',
    scrollWidth: 'none',
    scrollbarWidth: 'none',
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

const Carousel: React.FC<CarouselProps> = ({ cards, height }) => {
  const { classes } = useStyles();
  const carouselRef = useRef<HTMLDivElement>(null);

  const matchesXl = useMediaQueryForBeakpoint('xl');
  const matchesLg = useMediaQueryForBeakpoint('lg');
  const matchesMd = useMediaQueryForBeakpoint('md');
  const matchesSm = useMediaQueryForBeakpoint('sm');

  const maxItems = ((matchesLg || matchesXl) && 4) || (matchesMd && 3) || (matchesSm && 2) || 1;
  const itemWidth = useMemo(
    () => (carouselRef.current ? carouselRef.current.clientWidth / maxItems : 0),
    [maxItems],
  );

  const {
    scrollIntoView, targetRef, scrollableRef, cancel,
  } = useScrollIntoView<HTMLDivElement, HTMLDivElement>({
    axis: 'x',
    cancelable: false,
    duration: (7000 * cards.length) * (4 / maxItems),
    easing: (t: number) => t,
  });

  const shouldShowButtons = useMemo(() => cards.length > maxItems, [cards, maxItems]);

  useEffect(() => {
    if (carouselRef.current && shouldShowButtons) {
      scrollableRef.current = carouselRef.current;
      setTimeout(() => {
        scrollIntoView();
      }, 2000);
    }
  }, [scrollIntoView, scrollableRef, shouldShowButtons]);

  const onScrollClick = useMemo(
    () => (direction: 'left' | 'right') => () => carouselRef.current && scrollBy(carouselRef.current, itemWidth, direction),
    [itemWidth],
  );

  const onMouseEnter = useMemo<MouseEventHandler<HTMLDivElement>>(() => () => {
    cancel();
  }, [cancel]);

  const onTouchStart = useMemo<TouchEventHandler<HTMLDivElement>>(() => () => {
    cancel();
  }, [cancel]);

  return (
    <Box className={classes.container}>
      <Box
        className={classes.flexCarousel}
        sx={{ justifyContent: shouldShowButtons ? 'flex-start' : 'center' }}
        ref={carouselRef}
        onMouseEnter={onMouseEnter}
        onTouchStart={onTouchStart}
        style={{
          height: height || '200px',
        }}
      >
        {cards.map((card, index) => (
          <div key={`${card.title}${index}`} className={classes.cardWrapper}>
            <CarouselCard {...card} />
          </div>
        ))}
        <div ref={targetRef} />
      </Box>
      <Space h="lg" />
      {shouldShowButtons && (
        <>
          <Button variant="outline" color="gray" compact className={classes.buttonLeft} onClick={onScrollClick('left')}>
            {'<'}
          </Button>
          <Button variant="outline" color="gray" compact className={classes.buttonRight} onClick={onScrollClick('right')}>
            {'>'}
          </Button>
        </>
      )}
    </Box>
  );
};

export default Carousel;
