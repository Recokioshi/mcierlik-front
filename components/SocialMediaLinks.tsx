import { ActionIcon, Box, Group } from '@mantine/core';
import { BrandYoutube, BrandFacebook } from 'tabler-icons-react';

const links = [
  { link: 'https://www.facebook.com/people/Mariusz-Cierlik/100063744151193/', icon: BrandFacebook },
  { link: 'https://www.youtube.com/channel/UCnybCIBv3RFW5SxFKb2rt6Q', icon: BrandYoutube },
];

type SocialMediaLinksProps = {
  className?: string;
  iconClassName?: string;
};

export const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({ className = '', iconClassName = '', ...rest }) => {
  const linksComponents = links.map(({ link, icon }) => (
    <ActionIcon<'a'> size="lg" component="a" href={link} key={link} className={iconClassName}>
      <Box component={icon} size={18} href={link}/>
    </ActionIcon>
  ));

  return (
    <Group spacing={0} noWrap className={className} {...rest}>
      {linksComponents}
    </Group>
  );
};
