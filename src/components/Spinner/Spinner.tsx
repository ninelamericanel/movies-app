import React from 'react';
import './Spinner.scss';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface SpinnerProps {}

const Spinner: React.FC<SpinnerProps> = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
  return (
    <div className="spinner">
      <Spin indicator={antIcon} />
      <p className="spinner__text">We are search movies...</p>
    </div>
  );
};

export default Spinner;
