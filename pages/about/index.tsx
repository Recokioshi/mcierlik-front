import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <p>This is the about page</p>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...await serverSideTranslations(locale || '', ['navigation']),
    }
  };
}


export default About;