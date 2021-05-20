import React from 'react';
import clsx from 'clsx';
import { BG_GRADIENT } from '../../constants/tw.custom.helper';

const DeckCard = ({ children, ...props }) => (
  <>
    <div className="w-48 bg-white p-2 shadow-md hover:shadow-lg rounded-lg my-2 transition">
      <div className={clsx(
        BG_GRADIENT,
        "cursor-pointer w-full h-full  py-24 rounded-lg",
        "text-center text-white font-md text-5xl"
        )}>
        7
      </div>
    </div>
  </>
);

export default DeckCard;
