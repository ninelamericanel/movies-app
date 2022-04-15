import React, { useState } from 'react';

import './Tabs.scss';

type HandleClickFunc = (event: React.MouseEvent<HTMLElement>) => void;

const Tabs: React.FC = () => {
  const [activeButton, setActiveButton] = useState('search');
  const handleClick: HandleClickFunc = (event) => {
    if (event.target instanceof Element) {
      setActiveButton(event.target.id);
    }
  };
  const buttons = ['Search', 'Rated'];
  const viewButtons = buttons.map((buttonName) => {
    const className = buttonName.toLowerCase() === activeButton ? 'tabs__btn btn--active' : 'tabs__btn';
    return (
      <button key={buttonName} id={buttonName.toLowerCase()} className={className}>
        {buttonName}
      </button>
    );
  });

  return (
    <div className="tabs" onClick={handleClick}>
      {viewButtons}
    </div>
  );
};

export default Tabs;
