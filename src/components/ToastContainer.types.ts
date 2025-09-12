// src/components/ToastContainer.types.ts
export interface ToastOptions {
  duration?: number;
  title?: string;
}

export type Type = 'success' | 'warning' | 'error' | 'info';

export interface ToastAPI {
  success: (message: string, options?: ToastOptions) => number;
  error: (message: string, options?: ToastOptions) => number;
  warning: (message: string, options?: ToastOptions) => number;
  info: (message: string, options?: ToastOptions) => number;
  clear: () => void;
}

declare global {
  interface Window {
    toast?: ToastAPI;
  }
}