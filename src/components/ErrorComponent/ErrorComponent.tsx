import React from 'react';
import './ErrorComponent.scss';
import { Alert } from 'antd';

interface ErrorProps {
  errorInfo: string;
}

const ErrorComponent: React.FC<ErrorProps> = ({ errorInfo }) => {
  return <Alert className="alert" message="Error" description={errorInfo} type="error" />;
};

export default ErrorComponent;
