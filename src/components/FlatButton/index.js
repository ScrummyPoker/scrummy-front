import React from 'react';
import clsx from 'clsx';
import { ReactComponent as SpinnerSVG } from '../../assets/img/spinner.svg';

const FlatButton = ({ children, isLoading, icon: Icon, ...props }) => (
  <button
    className={clsx(
      'w-auto text-white font-bold py-3 px-4',
      'rounded-full my-2 uppercase font-semibold text-sm tracking-wider',
      'hover:shadow-md focus:outline-none justify-center flex',
    )}
    {...props}
  >
    {isLoading ? (
      <SpinnerSVG />
    ) : (
      <div className="grid grid-cols-5 text-center">
        {Icon && (
          <div className="">
            <Icon className="w-5 h-5"/>
          </div>
        )}

        <div className="col-span-4">{children}</div>
      </div>
    )}
  </button>
);

export default FlatButton;
