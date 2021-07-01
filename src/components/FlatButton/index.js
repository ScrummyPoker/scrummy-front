import React from 'react';
import clsx from 'clsx';
import { ReactComponent as SpinnerSVG } from '../../assets/img/spinner.svg';

const FlatButton = ({
  children,
  isLoading,
  icon: Icon,
  vertical,
  primary,
  onClick,
  ...props
}) => (
  <button
    onClick={onClick}
    className={clsx(
      'w-full text-white py-3 px-4',
      'rounded-full my-2 uppercase font-semibold tracking-wider',
      'focus:outline-none justify-center flex',
    )}>
    {isLoading ? (
      <SpinnerSVG />
    ) : (
      <div className="w-full grid grid-cols-5 text-center justify-center flex">
        {Icon && (
          <div className={clsx(vertical && "col-span-5 mx-auto m-2 text-secondary")}>
            <Icon className="w-5 h-5 " />
          </div>
        )}

        <div className={clsx(vertical ? "col-span-5 text-xs" : "col-span-4")}>{children}</div>
      </div>
    )}
  </button>
);

export default FlatButton;
