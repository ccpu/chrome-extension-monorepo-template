import React from 'react';
import '../../globals.css';

export interface ViewProviderProps extends React.PropsWithChildren {}

const ViewProvider: React.FC<ViewProviderProps> = (props) => {
  const { children } = props;

  return <React.StrictMode>{children}</React.StrictMode>;
};

ViewProvider.displayName = 'ViewProvider';

export { ViewProvider };
