import React from 'react';

import Video from '../../../Assets/video.mp4';
import ConnectImg from '../../../Assets/connect_2.jpg';
import GreenImg from '../../../Assets/green.jpg';

const AboutUs = () => (
  <section id="about-us" className="content">
    <h1 className="content-title">About Us</h1>
    <div className="aboutus-description">
      <div className="content-media-container">
        <video width="90%" he ight="100%" controls>
          <source src={Video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="content-desc-container">
        <h3 className="content-title left">Our History</h3>
        <p>
          Laundry is stressful. Anyone who has ever shrunk a sweater down to teddy bear size, knows what I am talking
          about. InstaWash is an alternative to your typical laundry experience. From your whites to colors, linen to
          delicate fabrics our staff is very knowledgeable about the way your clothes are treated.We treat your clothes
          with the highest care at Instawash. Don't bother about sorting your colors; we'll take care of it! Simply let
          us know if any of your clothes require special handling and we'll be good to go.<br />We at Instawash take a
          unique and creative approach to life's most mundane task: laundry. We are a green, environmentally-conscious
          business, on a mission to keep garments clean while also considering your health and that of our planet. Our
          service is powered by renewable energy, and our high-efficiency washers save water and electricity. We
          exclusively use non-toxic, biodegradable, and phosphate-free detergents, ensuring that our wash and fold
          services are completely safe for both you and the environment.
        </p>
      </div>
    </div>
    <div className="aboutus-description">
      <div className="content-desc-container">
        <h3 className="content-title left">Our Mission</h3>
        <p>
          Our reputation is everything to us. At each site, we are dedicated to having the best-trained and most efficient personnel. We are devoted to providing our workers with chances for advancement. We will always try to promote from inside first. Our objective is to give chances for advancement in a variety of areas, including job experience, education, relationships, and financial security. We are dedicated to providing our clients with prompt, informative, and engaging service. Over several years, Instawash has been a close-knit, family-owned business. All of our customers, workers, key partners, and vendors are treated like family members.
        </p>
      </div>
      <div className="content-media-container">
        <img src={ConnectImg} alt="our-mission-img" width="90%" he ight="100%" />
      </div>


    </div>
    <div className="aboutus-description">
      <div className="content-media-container">
        <img className="content-media-container" src={GreenImg} alt="our-mission-img" width="90%" he ight="100%" />
      </div>
      <div className="content-desc-container">
        <h3 className="content-title left">Our Goal</h3>
        <p>
          Client's clothes are treated with the utmost care, as if they were our own. We don't cut corners on quality or service to save money. Because while cleaning our customer's clothes, it's critical that we maintain a strict dedication to cleanliness in our facilities and equipment. Our connection with our clients is built on integrity. With our customers, suppliers, we are open and honest. We are dedicated to assisting workers and key partners in their growth and success. To give our clients the exquisite service, we will always utilize the best quality materials and products
        </p>
      </div>
    </div>
  </section>
);

export default AboutUs;
