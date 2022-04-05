import React from 'react';
import './ErrorComponent.scss';
import { Alert } from 'antd';

interface ErrorProps {}

const ErrorComponent: React.FC<ErrorProps> = () => {
  return <Alert className="alert" message="ErrorComponent" description="Something wrong happen" type="error" />;
};

export default ErrorComponent;
