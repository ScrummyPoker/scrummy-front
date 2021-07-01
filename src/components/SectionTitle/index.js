import React from 'react';
import clsx from 'clsx';

const SectionTitle = ({
  title,
  icon: Icon,
  centered,
  ...props 
}) => (
  <div className={clsx(
    "flex",
    centered ? "w-full justify-center text-center" : "text-left"
    )}>
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
