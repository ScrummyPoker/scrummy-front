import React from 'react';
import clsx from 'clsx';
import { BG_GRADIENT, BG_GRADIENT_ALTERNATIVE } from '../../constants/tw.custom.helper';
import { ReactComponent as SpinnerSVG } from '../../assets/img/spinner.svg';

const Button = ({
  children,
  isLoading,
  primary,
  alternative,
  transparent,
  small,
  icon: Icon,
  ...props
}) => (
  <button
    className={clsx(
      'w-full text-white font-bold py-3 px-4',
      'rounded-full my-2 uppercase font-semibold text-sm tracking-wider',
      'hover:shadow-md focus:outline-none focus:shadow-lg justify-center flex',
      primary && BG_GRADIENT,
      alternative && BG_GRADIENT_ALTERNATIVE,
      transparent && "bg-transparent text-secondary border-orange-400 border-2",
      small && "py-1 px-2"
    )}
    {...props}
  >
    {isLoading ? (
      <SpinnerSVG />
    ) : (
      <>
        {Icon ? (
          <div className="grid grid-cols-5 gap-4 text-center">
            <div className="col-span-4 mx-auto">{children}</div>
            <div className="">
              <Icon className="w-5 h-5" />
            </div>
          </div>
        ) : (
          <div className="mx-auto">{children}</div>
        )}
      </>
    )}
  </button>
);

export default Button;
