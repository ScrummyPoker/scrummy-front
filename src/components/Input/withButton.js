import React from 'react';
import clsx from 'clsx';
import Input from '.';
import IconButton from '../IconButton';

const InputWithButton = ({ buttonDisabled, buttonIcon, handleButtonClick, ...props }) => (
  <div className="relative">
    <span
      className={clsx(
        buttonDisabled && 'opacity-10',
        'absolute right-0.5	bottom-0.5',
      )}
    >
      <IconButton
        iconStyle="primary"
        Icon={buttonIcon}
        onClick={!buttonDisabled && handleButtonClick}
      />
    </span>
    <Input {...props} />
  </div>
);

export default InputWithButton;
