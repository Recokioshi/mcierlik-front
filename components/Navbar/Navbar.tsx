import React, { useCallback, useMemo } from 'react';
import { Box, Burger, Container, createStyles, Group, Header, Paper, Transition } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useBooleanToggle } from '@mantine/hooks';
import logo from '../../assets/images/logo-inverted.png';
import { LanguagePicker } from './LanguagePicker';
import { Cart } from './CartIcon';
import { LINKS } from '../../utils/constants/links';

const HEADER_HEIGHT = 80;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  mobileWrapper: {
    display: 'flex',
    gap: theme.spacing.md,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  burger: {
    marginRight: '1rem',
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
}));

interface HeaderResponsiveProps {
  links: { link: string; label: string }[];
}

export function Navbar({ links }: HeaderResponsiveProps) {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const router = useRouter();
  const { classes, cx } = useStyles();

  const active = useMemo(() => `/${router.pathname.split('/')[1]}`, [router.pathname]);

  const toggle = useCallback(() => {
    toggleOpened();
  }, [toggleOpened]);

  const handleClose = useCallback(() => {
    toggleOpened(false);
  }, [toggleOpened]);

  const items = useMemo(
    () =>
      links.map((link) => (
        <div
          key={link.label}
          className={cx(classes.link, { [classes.linkActive]: active === link.link })}
          onClick={handleClose}
        >
          <Link href={link.link}>{link.label}</Link>
        </div>
      )),
    [active, classes.link, classes.linkActive, cx, handleClose, links],
  );

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Image
          className="h-8 w-auto sm:h-10"
          src={logo}
          alt="logo"
          width={48}
          height={48}
          style={{
            maxWidth: '100%',
          }}
        />
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Box className={classes.mobileWrapper}>
          <Cart active={active === LINKS.CART} />
          <LanguagePicker />
          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
        </Box>

        <Transition transition="pop-top-right" duration={50} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
