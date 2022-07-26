import React, { useCallback, useState } from 'react';
import { createStyles, UnstyledButton, Menu, Image, Group } from '@mantine/core';
import { ChevronDown } from 'tabler-icons-react';
import { useRouter } from 'next/router';

type LanguageElement = {
  label: string;
  image: string;
  code: string;
};

const data: LanguageElement[] = [
  { label: 'English', image: '🇺🇸', code: 'en' },
  { label: 'German', image: '🇩🇪', code: 'de' },
  { label: 'Polish', image: '🇵🇱', code: 'pl' },
];

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
  control: {
    width: 80,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 15px',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]
    }`,
    transition: 'background-color 150ms ease',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[opened ? 5 : 6]
        : opened
        ? theme.colors.gray[0]
        : theme.white,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  label: {
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
  },

  icon: {
    transition: 'transform 150ms ease',
    transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
  },
}));

export function LanguagePicker() {
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;

  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });
  const [selected, setSelected] = useState(data.find(({ code }) => code === locale) || data[0]);
  

  const handleLanguageChange = useCallback((language: LanguageElement) => () => {
    setSelected(language);
    document.cookie = `NEXT_LOCALE=${language.code}`;
    router.push({ pathname, query }, asPath, { locale: language.code });
  }, [asPath, pathname, query, router]);

  const items = data.map((item) => (
    <Menu.Item
      onClick={handleLanguageChange(item)}
      key={item.label}
    >
      {item.image} {item.label}
    </Menu.Item>
  ));

  return (
    <Menu
      transition="pop"
      transitionDuration={150}
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      control={
        <UnstyledButton className={classes.control}>
          <Group spacing="xs">
            <span className={classes.label}>{selected.image}</span>
          </Group>
          <ChevronDown size={16} className={classes.icon} />
        </UnstyledButton>
      }
    >
      {items}
    </Menu>
  );
}