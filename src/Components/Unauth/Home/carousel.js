import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { map } from 'lodash';

import ban_1 from '../../../Assets/ban1.jpeg';
import ban_2 from '../../../Assets/ban2.jpeg';
import ban_3 from '../../../Assets/ban3.png';
import ban_4 from '../../../Assets/ban4.jpeg';

const Banner = () => {
  const carouselObj = [
    { img: ban_1, head: 'Best Laundry Award Winner', desc: 'Listed in top 10 service provider throughout America.' },
    { img: ban_2, head: 'Fast Service', desc: 'Fastest Laundey Service Throughout America.' },
    { img: ban_3, head: 'Cost Efficient Service', desc: 'Best Rates For All Services' },
    { img: ban_4, head: 'We Are Growing Fast', desc: 'Reaching to more areas with new services.' },
  ]
  return (
    <section id="home">
      <Carousel controls={false} interval={5000}>
        {map(carouselObj, (obj, index) => (
          <Carousel.Item key={`${index}-carousel`}>
            <img
              className="d-block w-100 banner"
              src={obj.img}
              alt="slide"
            />
            <Carousel.Caption>
              <h3 className="carousel-caption-h3">{obj.head}</h3>
              <p className="carousel-caption-p">{obj.desc}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;
