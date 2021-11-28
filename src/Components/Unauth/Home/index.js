import React from 'react';

import '../../../Stylesheets/index.css';
import './style.css';
import Layout from '../Layout';
import Banner from './carousel';
import AboutUs from './about';
import OurServices from './services';
import ContactUs from './contactUs';
const Home = () => {
  return (
    <Layout>
      <>
        <Banner />
        <AboutUs />
        <OurServices />
        <ContactUs />
      </>
    </Layout>
  );
}

export default Home;
