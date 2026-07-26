import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function DashboardLoading() {
  return (
    <Stack spacing={2} aria-live="polite" aria-busy="true">
      <Skeleton variant="text" width={220} height={40} />
      <Skeleton variant="rounded" height={140} />
    </Stack>
  );
}
