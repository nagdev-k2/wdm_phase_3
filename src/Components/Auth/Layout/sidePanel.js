import React from 'react';
import { isEqual, map } from 'lodash';
import { Button } from 'react-bootstrap';

const SidePanel = ({ availableMenu, selectMenu, selectedMenu}) => {
  return (
    <div className="sidepanel" id="sidepanel">
      {map(availableMenu, (item, index)=> (
        <Button
          key={`menu-${index}-${item.id}`}
          variant="transparent"
          className={`auth-menu-options ${isEqual(selectedMenu, item.id) ? 'menu-active' : ''} `}
          onClick={() => selectMenu(item.id)}
        >
          {item.label}
        </Button>
      ))}
   </div>
  );
};

export default SidePanel;