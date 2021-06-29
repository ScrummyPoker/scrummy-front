import React from 'react';
import clsx from 'clsx';
import { BG_GRADIENT } from '../../constants/tw.custom.helper';
import { ReactComponent as SpinnerSVG } from '../../assets/img/spinner.svg';

const IconButton = ({
  children,
  Icon,
  iconStyle,
  primary,
  light,
  isLoading,
  ...props 
}) => (
  <button
    className={clsx(
      primary && BG_GRADIENT,
      light && 'bg-white bg-opacity-10',
      'p-2 rounded-full',
      'hover:text-white focus:outline-none focus:ring-2',
      'focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white',
    )}
    {...props}
  >
    {props.label && <span className="sr-only">{props.label}</span>}

    {isLoading ? (
      <SpinnerSVG />
    ) : (
      <Icon
        className={clsx(
          'h-5 w-5 stroke-current',
          iconStyle === 'primary' && 'text-primary',
          iconStyle === 'secondary' && 'text-secondary',
          iconStyle === 'dark' && 'text-gray-800',
          iconStyle === 'success' && 'text-green-400',
        )}
        aria-hidden="true"
      />
    )}
  </button>
);

export default IconButton;
