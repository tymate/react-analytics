import { useContext } from 'react';
import { TCFContext } from './contexts';

export const useTCF = () => {
  const context = useContext(TCFContext);
  return context;
};
