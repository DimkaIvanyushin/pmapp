import { useCallback } from 'react';

export function useAutoFocus<T extends HTMLElement>(autofocus :boolean) {
  const inputRef = useCallback((inputElement: T) => {
    if (inputElement && autofocus) {
      inputElement.focus();
    }
  }, []);

  return inputRef;
}
