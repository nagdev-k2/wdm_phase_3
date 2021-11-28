import React, {useState} from 'react';

import Header from './header';
import Footer from './footer';
import './style.css';

const Layout = ({ children }) => {
  const [selectedMenu, setMenu] = useState('home');
  
  const selectMenu = (id) => {
    setMenu(id);
  };

  return (
    <>
      <Header selectedMenu={selectedMenu} selectMenu={selectMenu} />
      <div className="container">
        {children}
      </div>
      <Footer />
    </>
  )
}

export default Layout;
