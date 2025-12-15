import { ReactNode } from 'react';

export interface MessageBlockProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export interface LoadingOverlayProps {
  isLoading: boolean;
}