import type { ComponentType } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export interface WithLoadingProps {
  isLoading?: boolean;
}


export function withLoading<P extends object>(Component: ComponentType<P>) {
  function ComponentWithLoading({ isLoading = false, ...props }: P & WithLoadingProps) {
    if (isLoading) {
      return (
        <Stack spacing={1.5} aria-live="polite" aria-busy="true">
          <Skeleton variant="rounded" height={28} width="40%" />
          <Skeleton variant="rounded" height={120} />
        </Stack>
      );
    }
    return <Component {...(props as P)} />;
  }

  ComponentWithLoading.displayName = `withLoading(${Component.displayName || Component.name || 'Component'})`;
  return ComponentWithLoading;
}
