import React from 'react';

const Tabs: React.FC = () => {
  return (
    <div className="tabs">
      <div className="tabs__search">
        <p>Search</p>
      </div>
      <div className="tabs__rated">
        <p>Rated</p>
      </div>
    </div>
  );
};

export default Tabs;
