import { useEffect } from 'react';

export const useCloseOnEscape = (handleClose: () => void) => {
  const handleCloseModal = (event: KeyboardEvent) => {
    if (event.key === 'Escape') handleClose();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleCloseModal);
    return () => window.removeEventListener('keydown', handleCloseModal);
  }, []);
};
