import React from 'react';
import clsx from 'clsx';

const SectionTitle = ({ title, icon: Icon, ...props }) => (
  <div className="w-full text-center flex justify-center ">
    {Icon && (
      <div className="mr-2">
        <Icon className="w-5 h-5" />
      </div>
    )}

    <div className="font-semibold">
      {title}
    </div>
  </div>
);

export default SectionTitle;
