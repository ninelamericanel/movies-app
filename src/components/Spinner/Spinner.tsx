import React from 'react';

import './Spinner.scss';

interface SpinnerProps {}

const Spinner: React.FC<SpinnerProps> = () => {
  return (
    <div className="spinner">
      <div className="loadingio-spinner-eclipse-qka85v5szjk">
        <div className="ldio-a323zksey1f">
          <div></div>
        </div>
      </div>
      <p className="spinner__text">We are search movies...</p>
    </div>
  );
};

export default Spinner;
