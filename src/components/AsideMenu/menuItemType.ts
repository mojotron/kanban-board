import { ReactNode } from 'react';

export type MenuItemType = {
  text: string;
  handleClick: () => void;
  icon: ReactNode | undefined;
};
