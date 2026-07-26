import { api } from '@/services/api';
import type { CategoryDefinition } from '@/types/category';


export const categoryService = {
  list: () => api.get<CategoryDefinition[]>('/categories').then((res) => res.data),
};
