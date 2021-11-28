import React, { useState } from 'react';
import { isEqual, map } from 'lodash';

import Logo from '../../../Assets/logo.png';
import AuthModal from '../Login';

const Header = ({ selectMenu, selectedMenu }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const menuOptions = [
    { id: 'home', label: "Home" },
    { id: 'about-us', label: "About Us" },
    { id: 'blog', label: "Blog" },
    { id: 'service', label: "Our Services" },
    { id: 'contactUs', label: "Contact Us" },
    { id: 'auth', label: "Login" },
  ];

  const handleCloseModal = () => {
    setShowAuthModal(false);
  }

  const menuManager = (id) => {
    if (isEqual(id, 'blog')) {
      window.location.href = 'http://vxm9256.uta.cloud/blog/';
    } else if (isEqual(id, 'auth')) setShowAuthModal(true)
    else selectMenu(id);
  }

  return (
    <>
      <div className="header">
        <img src={Logo} alt="Logo" className="logo" />
        <div className="menu-options">
          {map(menuOptions, (menu, index) => (
            <a
              href={`#${menu.id}`}
              className={`menu-btn ${isEqual(selectedMenu, menu.id) ? 'active' : ''}`}
              key={`${index}-menu-options`}
              onClick={() => menuManager(menu.id)}
            >
              {menu.label}
            </a>
          ))}
        </div>
      </div>
      <AuthModal show={showAuthModal} handleClose={handleCloseModal} />
    </>
  );
};

export default Header;
