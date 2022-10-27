import React from 'react';
import './ErrorMessages.css';

const ErrorMessages = ({ otherError, duplicateCitiesError }) => {
  return (
    <>
      {otherError && (
        <div className='error-message'>City not found or connection lost</div>
      )}
      {duplicateCitiesError && (
        <div className='error-message'>This city is already added</div>
      )}
    </>
  );
};

export default ErrorMessages;
