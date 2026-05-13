import { useState, useTransition } from 'react';

interface UseSafeSelectReturn {
  handleValueChange: (value: string) => void;
  isTransitioning: boolean;
}

export function useSafeSelect(initialValue: string): UseSafeSelectReturn {
  const [, startTransition] = useTransition();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleValueChange = (value: string) => {
    setIsTransitioning(true);

    startTransition(() => {
      // La transición ocurre en el componente padre que maneja el setState
      setIsTransitioning(false);
    });
  };

  return {
    handleValueChange,
    isTransitioning,
  };
}
