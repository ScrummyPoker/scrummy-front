import React from 'react';

const DashLayoutContext = React.createContext({});
export const DashLayoutProvider = DashLayoutContext.Provider;
export const DashLayoutConsumer = DashLayoutContext.Consumer;

export default DashLayoutContext;