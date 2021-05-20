import React from 'react';
import clsx from 'clsx';
import { ReactComponent as LoadingSVG } from '../../assets/img/loading.svg';

const ScreenLoading = ({ children, id, ...props }) => (
  <div className="w-full h-screen bg-black fixed flex top-0 left-0 opacity-75 z-50 items-center">
    <LoadingSVG className="align-middle"/>
  </div>
);

export default ScreenLoading;
