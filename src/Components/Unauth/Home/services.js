import React from 'react';

import '../../../Stylesheets/services.css';
import '../../../Stylesheets/home300to800.css';
import wash from '../../../Assets/service/wash.png';
import dryer from '../../../Assets/service/dryer.png';
import fold from '../../../Assets/service/fold.png';
import pickup from '../../../Assets/service/pickup.png';
import iron from '../../../Assets/service/iron.png';
import service from '../../../Assets/service/service.jpg';
import Counter from './counter';

const OurServices = () => {
  return (
    <section id="service">
      <Counter />
      <div className="service">
        <h1 className="content-title">Our Services</h1>
        <div className="service-blocks">
          <div className="service-description">
            <div className="content-image-service">
              <img src={wash} alt="dummy-img" />
            </div>
            <div className="content-desc-container-service">
              <h3>Wash</h3>
              <p>
                Schedule your laundry pickup at your convenience from your device through your online account. Drop your
                clothes at our front desk.
              </p>
            </div>
          </div>
          <div className="service-description">
            <div className="content-image-service">
              <img src={dryer} alt="dummy-img" />
            </div>
            <div className="content-desc-container-service">
              <h3>Dryer</h3>
              <p>
                Our personnel will wash your clothes according to your needs with hot, warm or cold water. You can choose
                from a variety of detergents while opting for extra sensitive care.
              </p>
            </div>
          </div>
          <div className="service-description">
            <div className="content-image-service">
              <img src={iron} alt="dummy-img" />
            </div>
            <div className="content-desc-container-service">
              <h3>Iron</h3>
              <p>
                After the wash cycle, we will dry your clothes base on your preferences. We do air drying and machine
                drying. We use low heat for delicates, medium heat for permanent press and high heat for regular clothes.
              </p>
            </div>
          </div>
          <div className="service-description">
            <div className="content-image-service">
              <img src={fold} alt="dummy-img" />
            </div>
            <div className="content-desc-container-service">
              <h3>Fold</h3>
              <p>
                Once the clothes are dried, we iron and fold them for you.
              </p>
            </div>
          </div>
          <div className="service-description">
            <div className="content-image-service">
              <img src={pickup} alt="dummy-img" />
            </div>
            <div className="content-desc-container-service">
              <h3>Pick Up/ Drop Service</h3>
              <p>
                Once the task has completed, we will notify you. You can come and pick up your clothes.
              </p>
            </div>
          </div>
          <div className="service-description">
            <div className="content-image-service">
              <img src={service} alt="dummy-img" />
            </div>
            <div className="content-desc-container-service">
              <h3>24/7 Service</h3>
              <p>
                Our services are available 24/7 at all our service centres. Our customer support agents are available 24/7
                to chat with you and can answer all your queries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;