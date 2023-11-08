import { ReactNode } from 'react';

type PropsType = {
  children: ReactNode;
};

const RequestList = ({ children }: PropsType) => {
  return <ul>{children}</ul>;
};

export default RequestList;
