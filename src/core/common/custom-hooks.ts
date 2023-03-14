import React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Пользовательский хук, основанный на useLocation для разбора
 * строка запроса
 */
export function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
