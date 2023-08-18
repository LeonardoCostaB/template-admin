import { AppContext } from '@/context/AppContext';
import { useContext } from 'react';

export const useApp = () => useContext(AppContext);
