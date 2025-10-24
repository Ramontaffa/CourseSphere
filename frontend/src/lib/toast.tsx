import toast from 'react-hot-toast';
import React from 'react';

/**
 * Centralized toast helpers (TSX because we render JSX in the custom toast)
 */

export const showSuccess = (message: string, id?: string) => {
  return toast.success(message, { id });
};

export const showError = (message: string, id?: string) => {
  return toast.error(message, { id });
};

export const showLoading = (message = 'Carregando...', id?: string) => {
  return toast.loading(message, { id });
};

export const dismiss = (id?: string) => toast.dismiss(id);

/**
 * Example of a custom toast using `toast.custom` that renders arbitrary JSX.
 * `t.visible` can be used to animate entrance/exit.
 */
export const showCustom = (content: React.ReactNode, id?: string) => {
  return toast.custom((t) => (
    <div
      className={`flex items-center gap-3 p-3 rounded-md shadow-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100`}
      style={{
        opacity: t.visible ? 1 : 0,
        marginBottom: 8,
        transition: 'opacity 160ms ease-in-out',
      }}
    >
      {content}
    </div>
  ), { id });
};

const toastHelpers = {
  showSuccess,
  showError,
  showLoading,
  dismiss,
  showCustom,
};

export default toastHelpers;
