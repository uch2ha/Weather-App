import React from 'react';
import './ErrorMessages.css';

const ErrorMessages = ({
  otherError,
  locationKeyError,
  duplicateCitiesError,
}) => {
  return (
    <>
      {otherError && <div className='error-message'>ERROR</div>}
      {locationKeyError && <div className='error-message'>city not found</div>}
      {duplicateCitiesError && (
        <div className='error-message'>this city is already added</div>
      )}
    </>
  );
};

export default ErrorMessages;
