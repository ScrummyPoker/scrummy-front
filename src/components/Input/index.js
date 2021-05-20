import React from 'react';
import clsx from 'clsx';

const Input = ({ children, id, ...props }) => (
  <div className={props.styleClass}>
    {props.label && (
      <label
        className="block text-sm font-bold mb-2"
        htmlFor={id}
      >
        {props.label}
      </label>
    )}
    <input
      className={clsx(
        "shadow appearance-none border rounded w-full bg-white bg-opacity-10",
        "py-3 px-4 font-semibold leading-tight rounded-full border-none",
        "focus:outline-none focus:shadow-outline text-sm"
      )}
      id={id}
      {...props}
    />
  </div>
);

export default Input;
