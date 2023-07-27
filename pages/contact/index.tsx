import React, { useCallback } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation, TFunction } from 'next-i18next';
import {
  createStyles,
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  Container,
  Space,
  Notification,
  Popper,
} from '@mantine/core';
import { Check, X } from 'tabler-icons-react';
import { useClickOutside } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { SocialMediaLinks } from '../../components/SocialMediaLinks';
import { ContactIconsList } from '../../components/Contact/ContactIconsList';

const getPreselectedProductMessage = (t: TFunction, product?: string) =>
  product ? t('rightSection.preselectedProduct', { productName: product }) : '';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 400,
    boxSizing: 'border-box',
    backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
      theme.colors[theme.primaryColor][7]
    } 100%)`,
    borderRadius: theme.radius.md,
    padding: theme.spacing.xl * 2.5,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: theme.spacing.xl * 1.5,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.white,
    lineHeight: 1,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    maxWidth: 300,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  form: {
    backgroundColor: theme.white,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
  },

  social: {
    color: theme.white,

    '&:hover': {
      color: theme.colors[theme.primaryColor][1],
    },
  },

  input: {
    backgroundColor: theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,

    '&::placeholder': {
      color: theme.colors.gray[5],
    },
  },

  inputLabel: {
    color: theme.black,
  },

  control: {
    backgroundColor: theme.colors[theme.primaryColor][6],
  },
}));

const onSendEmail = (email: string, name: string, message: string) =>
  fetch('/api/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      name,
      message,
    }),
  });

function ContactUs() {
  const { classes } = useStyles();

  const { t } = useTranslation('contact');

  const router = useRouter();
  const { product } = router.query;

  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [message, setMessage] = React.useState(getPreselectedProductMessage(t, product as string));
  const [error, setError] = React.useState('');
  const [sentSuccessfully, setSentSuccessfully] = React.useState(false);

  const buttonRef = useClickOutside(() => {
    setSentSuccessfully(false);
    setError('');
  });

  const handleSubmit = useCallback(() => {
    if (!email || !name || !message) {
      setError(t('messages.emptyFields'));
      return;
    }
    setError('');
    setSentSuccessfully(true);
    onSendEmail(email, name, message)
      .then((res) => {
        if (res.status === 200) {
          setEmail('');
          setName('');
          setMessage('');
          setSentSuccessfully(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(t('messages.unknownError'));
      });
  }, [email, name, message, t]);

  const onInputChange = useCallback(
    (fieldSetter: React.Dispatch<React.SetStateAction<string>>) =>
      (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        fieldSetter(event.target.value);
      },
    [],
  );

  return (
    <Container mt={30} mb={30} size="lg">
      <div className={classes.wrapper}>
        <SimpleGrid cols={2} spacing={50} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <div>
            <Title className={classes.title}>{t('leftSection.header')}</Title>
            <Text className={classes.description} mt="sm" mb={30}>
              {t('leftSection.headerDescription')}
            </Text>

            <ContactIconsList variant="white" />

            <Space h="lg" />
            <SocialMediaLinks iconClassName={classes.social} />
          </div>
          <div className={classes.form}>
            <TextInput
              label={t('rightSection.emailLabel')}
              placeholder={t('rightSection.emailPlaceholder')}
              required
              classNames={{ input: classes.input, label: classes.inputLabel }}
              value={email}
              onChange={onInputChange(setEmail)}
            />
            <TextInput
              label={t('rightSection.nameLabel')}
              placeholder={t('rightSection.namePlaceholder')}
              mt="md"
              classNames={{ input: classes.input, label: classes.inputLabel }}
              value={name}
              onChange={onInputChange(setName)}
              required
            />
            <Textarea
              required
              label={t('rightSection.messageLabel')}
              placeholder={t('rightSection.messagePlaceholder')}
              minRows={4}
              mt="md"
              classNames={{ input: classes.input, label: classes.inputLabel }}
              value={message}
              onChange={onInputChange(setMessage)}
            />

            <Group position="right" mt="md">
              <Button className={classes.control} onClick={handleSubmit} ref={buttonRef}>
                {t('rightSection.sendButton')}
              </Button>
            </Group>
            <Popper
              position="bottom"
              placement="end"
              arrowSize={0}
              mounted={error !== '' || sentSuccessfully}
              referenceElement={buttonRef.current}
              transition="pop-top-left"
              transitionDuration={200}
            >
              {error && (
                <Notification icon={<X size={18} />} color="red" disallowClose={true}>
                  {error}
                </Notification>
              )}
              {sentSuccessfully && (
                <Notification icon={<Check size={18} />} color="teal" title="Success!" disallowClose={true}>
                  {t('messages.success')}
                </Notification>
              )}
            </Popper>
          </div>
        </SimpleGrid>
      </div>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || '', ['contact', 'navigation'])),
  },
});

export default ContactUs;
