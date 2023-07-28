import { GetStaticProps } from 'next';
import { TFunction, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Text, Container, Title, SimpleGrid, createStyles } from '@mantine/core';
import { useMemo } from 'react';
import { BuildingWarehouse, ClockOff, Users, BuildingStore } from 'tabler-icons-react';

const nodes = {
  first: BuildingWarehouse,
  second: ClockOff,
  third: Users,
  fourth: BuildingStore,
} as const;

const getDataFromTranslationNode = (t: TFunction, node: string) => ({
  title: t(`${node}.title`),
  description: t(`${node}.description`),
});

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: 80,
    paddingBottom: 50,
  },

  item: {
    display: 'flex',
  },

  itemIcon: {
    padding: theme.spacing.xs,
    marginRight: theme.spacing.md,
  },

  itemTitle: {
    marginBottom: theme.spacing.xs / 2,
  },

  supTitle: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 800,
    fontSize: theme.fontSizes.sm,
    color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 8],
    letterSpacing: 0.5,
  },

  title: {
    lineHeight: 1,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },

  description: {
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },

  highlight: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
        : theme.colors[theme.primaryColor][0],
    padding: 5,
    paddingTop: 0,
    borderRadius: theme.radius.sm,
    display: 'inline-block',
    color: theme.colorScheme === 'dark' ? theme.white : 'inherit',
  },
}));

export function About() {
  const { classes } = useStyles();

  const { t } = useTranslation('about');

  const translatedData = useMemo(
    () =>
      Object.keys(nodes).map((node) => ({
        data: getDataFromTranslationNode(t, `points.${node}`),
        icon: nodes[node as keyof typeof nodes],
      })),
    [t],
  );

  const items = translatedData.map(({ data, icon: Icon }) => (
    <div className={classes.item} key={data.title}>
      <div>
        <Icon size={40} className={classes.itemIcon} />
        <Text weight={700} size="lg" className={classes.itemTitle}>
          {data.title}
        </Text>
        <Text color="dimmed">{data.description}</Text>
      </div>
    </div>
  ));

  return (
    <Container size={700} className={classes.wrapper}>
      <Text className={classes.supTitle}>{t('subTitle')}</Text>

      <Title className={classes.title} order={2}>
        {t('title')}
      </Title>

      <Container size={660} p={0}>
        <Text color="dimmed" className={classes.description}>
          {t('description')}
        </Text>
      </Container>

      <SimpleGrid
        cols={2}
        spacing={50}
        breakpoints={[{ maxWidth: 550, cols: 1, spacing: 40 }]}
        style={{ marginTop: 30 }}
      >
        {items}
      </SimpleGrid>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || '', ['navigation', 'about'])),
  },
});

export default About;
