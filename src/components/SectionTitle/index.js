import React from 'react';
import clsx from 'clsx';

const SectionTitle = ({ title, icon: Icon, ...props }) => (
  <div className="flex items-center">
    {Icon && (
      <div className="mr-2">
        <Icon className="w-5 h-5" />
      </div>
    )}

    <div>
      {title}
    </div>
  </div>
);

export default SectionTitle;
