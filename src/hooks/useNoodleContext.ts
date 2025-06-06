
"use client";
import { useContext } from 'react';
import { NoodleContext } from '@/context/NoodleContext';

export const useNoodleContext = () => {
  const context = useContext(NoodleContext);
  if (context === undefined) {
    throw new Error('useNoodleContext must be used within a NoodleProvider');
  }
  return context;
};
