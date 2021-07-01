import React from 'react';
import clsx from 'clsx';

const Card = ({ children, ...props }) => (
  <>
    <div className="bg-gray-700 color-white w-full rounded-2xl bg-white py-3 px-3 shadow-md hover:shadow-lg my-2 transition">
      {children}
    </div>
  </>
);

export default Card;
