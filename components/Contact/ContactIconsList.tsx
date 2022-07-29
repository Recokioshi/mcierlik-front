import React, { SVGAttributes } from 'react';
import {
  createStyles, ThemeIcon, Text, Group, Box,
} from '@mantine/core';
import {
  Sun, Phone, MapPin, At,
} from 'tabler-icons-react';
import { useTranslation } from 'next-i18next';

type ContactIconVariant = 'white' | 'gradient';

interface ContactIconStyles {
  variant: ContactIconVariant;
}

const useStyles = createStyles((theme, { variant }: ContactIconStyles) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    color: theme.white,
  },

  icon: {
    marginRight: theme.spacing.md,
    backgroundImage:
      variant === 'gradient'
        ? `linear-gradient(135deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
          theme.colors[theme.primaryColor][6]
        } 100%)`
        : 'none',
    backgroundColor: 'transparent',
  },

  title: {
    color: variant === 'gradient' ? theme.colors.gray[6] : theme.colors[theme.primaryColor][0],
  },

  description: {
    color: variant === 'gradient' ? theme.black : theme.white,
  },
}));

type IconProps = SVGAttributes<SVGElement> & {
  color?: string;
  size?: string | number;
}
interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  icon: React.FC<IconProps>;
  title: React.ReactNode;
  description: React.ReactNode;
  variant?: ContactIconVariant;
}

function ContactIcon({
  icon: Icon,
  title,
  description,
  variant = 'gradient',
  className,
  ...others
}: ContactIconProps) {
  const { classes, cx } = useStyles({ variant });
  return (
    <div className={cx(classes.wrapper, className)} {...others}>
      {variant === 'gradient' ? (
        <ThemeIcon size={40} radius="md" className={classes.icon}>
          <Icon size={24} />
        </ThemeIcon>
      ) : (
        <Box mr="md">
          <Icon size={24} />
        </Box>
      )}

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}

interface ContactIconsListProps {
  data?: ContactIconProps[];
  variant?: ContactIconVariant;
}

const MOCKDATA = [
  { title: 'emailLabel', description: 'snahonet@o2.pl', icon: At },
  { title: 'phoneLabel', description: '+48 662 266 686', icon: Phone },
  { title: 'addressLabel', description: '02826 Sachsen - Görlitz', icon: MapPin },
  { title: 'workingHoursLabel', description: '4 p.m. – 9 p.m.', icon: Sun },
];

export function ContactIconsList({ data = MOCKDATA, variant }: ContactIconsListProps) {
  const { t } = useTranslation('contact');
  const items = data.map(({ title, ...rest }, index) => <ContactIcon
      key={index}
      variant={variant}
      title={t(`leftSection.${title}`)}
      {...rest}
    />);
  return <Group direction="column">{items}</Group>;
}
