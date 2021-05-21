import React from 'react';
import clsx from 'clsx';
import { BG_GRADIENT } from '../../constants/tw.custom.helper';
import { ReactComponent as LoadingSVG } from '../../assets/img/loading.svg';
import { ReactComponent as SpinnerSVG } from '../../assets/img/spinner.svg';

const Button = ({ children, ...props }) => (
  <button
    className={clsx(
      BG_GRADIENT,
      "w-full text-white font-bold py-3 px-4",
      "rounded-full my-2 uppercase font-semibold text-sm tracking-wider",
      "hover:shadow-md focus:outline-none justify-center flex"
    )}
    {...props}
  >
    {props.isLoading ? (
      <SpinnerSVG />
    ) : (
      <>
        {children}
      </>
    )}
  </button>
);

export default Button;