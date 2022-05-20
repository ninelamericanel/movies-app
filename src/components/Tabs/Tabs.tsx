import React, { useEffect, useState } from 'react';

import './Tabs.scss';
import { HandleClickFunc, SetTabFunc } from 'types/app';

interface TabsProps {
  setTab: SetTabFunc;
}

const Tabs: React.FC<TabsProps> = ({ setTab }) => {
  const [activeButton, setActiveButton] = useState('search');
  const handleClick: HandleClickFunc = (event) => {
    if (event.target instanceof Element) {
      setActiveButton(event.target.id);
    }
  };

  useEffect(() => {
    setTab(activeButton);
  }, [activeButton]);
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
