import React from 'react';
import clsx from 'clsx';
import Input from '.';
import IconButton from '../IconButton';

const InputWithButton = ({ isLoading, buttonDisabled, buttonIcon, handleButtonClick, ...props }) => (
  <div className="relative">
    <span
      className={clsx(
        buttonDisabled && 'opacity-30',
        'absolute right-0.5	bottom-0.5',
      )}
    >
      <IconButton
        isLoading={isLoading}
        iconStyle="success"
        Icon={buttonIcon}
        onClick={!buttonDisabled && handleButtonClick}
      />
    </span>
    <Input disabled={isLoading} {...props} />
  </div>
);

export default InputWithButton;
