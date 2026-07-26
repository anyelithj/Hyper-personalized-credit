import { api } from '@/services/api';
import type { DashboardMetrics } from '@/types/metrics';


export const metricsService = {
  get: () => api.get<DashboardMetrics>('/metrics').then((res) => res.data),
};
