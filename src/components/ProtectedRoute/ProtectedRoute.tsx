import {
  Navigate,
  NavigateOptions,
  RegisteredRoutesInfo,
  ToOptions,
} from '@tanstack/router';
import { ReactNode } from 'react';

type PropsType = {
  children: ReactNode;
  goto: NavigateOptions<RegisteredRoutesInfo, TFrom, TTo>;
  conditional: boolean;
};

const ProtectedRoute = ({ children, goto, conditional }: PropsType) => {
  if (conditional) {
    return children;
  } else {
    return <Navigate to={goto} />;
  }
};

export default ProtectedRoute;
