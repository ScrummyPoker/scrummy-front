import React from 'react';
import clsx from 'clsx';
import { BG_GRADIENT } from '../../constants/tw.custom.helper';

const DeckCard = ({
  children,
  value,
  onClick,
  small,
  ...props
}) => (
  <>
    <div className={clsx(
        "mx-auto bg-white shadow-md hover:shadow-lg rounded-lg my-2 transition",
        small ? "p-1 w-20" : "p-2 w-full"
      )}

       onClick={onClick}>
      <div className={clsx(
        BG_GRADIENT,
        "cursor-pointer w-full h-full rounded-lg",
        "text-center text-white font-md",
        small ? "py-10 text-lg" : "py-20 text-5xl"
      )}>
        {value}
      </div>
    </div>
  </>
);

export default DeckCard;
