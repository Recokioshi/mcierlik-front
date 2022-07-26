import React, { useCallback } from 'react';
import { Card, Text, createStyles, Box } from '@mantine/core';
import Link from 'next/link';
import { Photo } from '../../../utils/api/types/cms';
import { StrapiPhoto } from '../StrapiPhoto';

const useStyles = createStyles((theme, _params, getRef) => {
  const image = getRef('image');

  return {
    card: {
      position: 'relative',
      height: 280,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      cursor: 'pointer',

      [`&:hover .${image}`]: {
        transform: 'scale(1.03)',
      },
    },

    image: {
      ref: image,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundSize: 'cover',
      transition: 'transform 500ms ease',
    },

    overlay: {
      position: 'absolute',
      top: '20%',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)',
    },

    content: {
      height: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      zIndex: 1,
    },

    title: {
      color: theme.white,
      marginBottom: 5,
    },

    bodyText: {
      color: theme.colors.dark[2],
      marginLeft: 7,
    },

    author: {
      color: theme.colors.dark[2],
    },
  };
});

export interface CarouselCardProps {
  link?: string;
  photo: Photo;
  title?: string;
  id: string;
  onClick?: (id: string) => void;
}

export function CarouselCard({ photo, title, link, onClick, id }: CarouselCardProps) {
  const { classes } = useStyles();

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(id);
    }
  }, [id, onClick]);
  
  const CardContent = (
    <Card
        p="lg"
        shadow="sm"
        className={classes.card}
        radius="md"
        onClick={handleClick}
      >
        <StrapiPhoto photo={photo} height={512} width={512} isBackground />
        {title && <div className={classes.overlay} />}

        {title && <div className={classes.content}>
          <div>
            <Text size="lg" className={classes.title} weight={500}>
              {title}
            </Text>
          </div>
        </div>}
      </Card>
  );

  return link ? (
    <Link href={link!}>
      {CardContent}
    </Link>
  ) : (
    <Box>
      {CardContent}
    </Box>
  );
}