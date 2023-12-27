import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To JCFits',
  description: 'Just Casual Fits For Casual Days',
  keywords: 'Clothing, Fashion, Casual, Fits, Casual Fits',
};

export default Meta;
