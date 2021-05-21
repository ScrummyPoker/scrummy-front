
import React from 'react';
import clsx from 'clsx';
import { BG_GRADIENT } from '../../constants/tw.custom.helper';

const IconButton = ({ children, Icon, ...props }) => (
  <button
    className={clsx(
      props.primary && BG_GRADIENT,
      props.light && 'bg-white bg-opacity-10',
      'p-2 rounded-full',
      'hover:text-white focus:outline-none focus:ring-2',
      'focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white',
    )}
    {...props}
  >
    {props.label && <span className="sr-only">{props.label}</span>}
    <Icon 
      className={clsx(
        "h-5 w-5 stroke-current",
        props.iconStyle === "primary" && "text-primary",
        props.iconStyle === "secondary" && "text-secondary",
        props.iconStyle === "dark" && "text-gray-800",
      )}
      aria-hidden="true" />
  </button>
);

export default IconButton;
