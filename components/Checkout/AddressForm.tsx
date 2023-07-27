import React from 'react';
import {
  Box,
  Button,
  Container,
  createStyles,
  Divider,
  Grid,
  SimpleGrid,
  Space,
  TextInput,
  Title,
} from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';
import { CartState, selectAddress, selectCustomer } from '../../store/cartSlice';

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  },

  cityAndZip: {
    display: 'flex',
    gap: theme.spacing.md,
  },

  spaceFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  input: {
    height: '3rem',
    paddingTop: '1rem',
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },

  button: {
    marginLeft: 'auto',
  },
}));

const addressFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
});

type AddressFormValues = z.infer<typeof addressFormSchema>;

type AddressFormProps = {
  onSubmit: (formData: CartState['address'] & CartState['customer']) => void;
};

export const AddressForm: React.FC<AddressFormProps> = ({ onSubmit }) => {
  const { classes } = useStyles();
  const { t } = useTranslation('addressForm');

  const customer = useSelector(selectCustomer);
  const address = useSelector(selectAddress);

  const { register, handleSubmit } = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    values: { ...address, ...customer },
  });

  return (
    <Container>
      <SimpleGrid cols={1}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <Box className={classes.spaceFlex}>
            <Title order={3}>{`${t('customerHeader')}`}</Title>
          </Box>
          <TextInput
            {...register('firstName')}
            label={`${t('form.firstName.label')}`}
            placeholder={`${t('form.firstName.placeholder')}`}
            classNames={classes}
          />
          <TextInput
            {...register('lastName')}
            label={`${t('form.lastName.label')}`}
            placeholder={`${t('form.lastName.placeholder')}`}
            classNames={classes}
          />
          <TextInput
            {...register('email')}
            label={`${t('form.email.label')}`}
            placeholder={`${t('form.email.placeholder')}`}
            classNames={classes}
          />
          <TextInput
            {...register('phone')}
            label={`${t('form.phone.label')}`}
            placeholder={`${t('form.phone.placeholder')}`}
            classNames={classes}
          />
          <Divider />
          <Box className={classes.spaceFlex}>
            <Title order={3}>{`${t('addressHeader')}`}</Title>
          </Box>
          <TextInput
            {...register('street')}
            label={`${t('form.street.label')}`}
            placeholder={`${t('form.street.placeholder')}`}
            classNames={classes}
          />
          <TextInput
            {...register('state')}
            label={`${t('form.state.label')}`}
            placeholder={`${t('form.state.placeholder')}`}
            classNames={classes}
          />
          <Grid>
            <Grid.Col span={4}>
              <TextInput
                {...register('zip')}
                label={`${t('form.zip.label')}`}
                placeholder={`${t('form.zip.placeholder')}`}
                classNames={classes}
              />
            </Grid.Col>
            <Grid.Col span={8}>
              <TextInput
                {...register('city')}
                label={`${t('form.city.label')}`}
                placeholder={`${t('form.city.placeholder')}`}
                classNames={classes}
              />
            </Grid.Col>
          </Grid>
          <TextInput
            {...register('country')}
            label={`${t('form.country.label')}`}
            placeholder={`${t('form.country.placeholder')}`}
            classNames={classes}
          />
          <Button type="submit" variant="light" color="blue" radius="md" styles={{ root: { marginLeft: 'auto' } }}>
            {`${t('form.submit')}`}
          </Button>
          <Space h="sm" />
        </form>
      </SimpleGrid>
    </Container>
  );
};
