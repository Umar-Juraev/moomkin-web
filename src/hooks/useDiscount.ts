"use client";
import api from "@/api/ axios";
import {
  ApiResponse,
  DiscountCreateDTO,
  DiscountDTO,
  PaginatedResponse,
  PaginationParams,
  StoriesDTO,
} from "@/types/DTO";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Simple query keys
const DISCOUNT_KEYS = {
  all: ["discounts"],
  list: ["discounts", "list"],
  stories: ["stories"],
  suggestions: ["suggestions"],
  detail: (id: number) => ["discount", "detail", id],
};

// Get discounts with pagination
export const useDiscounts = (
  params: PaginationParams & {
    category_id?: number;
    company_id?: number;
    search?: string;
    order?: string;
    tags?: number[];
    page?: number;
    limit?: number;
  },
) => {
  return useQuery({
    queryKey: [...DISCOUNT_KEYS.list, params],
    queryFn: async () => {
      const { page, limit, category_id, company_id, search, order, tags } = params;
      const response = await api.get<
        ApiResponse<PaginatedResponse<DiscountDTO[]>>
      >("/discount", {
        params: {
          page,
          limit,
          ...(category_id ? { category_id } : {}),
          ...(company_id ? { company_id } : {}),
          ...(search ? { search } : {}),
          ...(order ? { order } : {}),
          ...(tags && tags.length > 0 ? { tags: tags.join(",") } : {}),
        },
      });
      return response.data;
    },
  });
};


// Get discount by id
export const useDiscount = (id: number) => {
  return useQuery({
    queryKey: DISCOUNT_KEYS.detail(id),
    queryFn: async () => {
      const response = await api.get<ApiResponse<DiscountDTO>>(
        `/discount/${id}`
      );
      return response.data;
    },
    enabled: true,
  });
};

export const useDiscountStories = () => {
  return useQuery({
    queryKey: DISCOUNT_KEYS.stories,
    queryFn: async () => {
      const response = await api.get<ApiResponse<StoriesDTO[]>>(
        `/discount/stories`
      );
      return response.data;
    },
    enabled: true,
  });
};

// Search
export const useSearchSuggestions = (
  params: {
    search?: string;
  },
) => {
  return useQuery({
    queryKey: [...DISCOUNT_KEYS.suggestions, params],
    queryFn: async () => {
      const { search } = params;
      const response = await api.get<
        ApiResponse<string[]>
      >("/discount/suggestions", {
        params: {
          ...(search ? { search } : {}),
        },
      });
      return response.data;
    },
    enabled: !!params.search && params.search.length >= 1,
  });
};
// Seen discount
export const useSeenDiscount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return api
        .post<DiscountDTO>(`/discount/${id}/seen`)
        .then((response) => response.data);
    },
    onSuccess: () => {
      // Invalidate list query
      // queryClient.invalidateQueries({ queryKey: DISCOUNT_KEYS.list });
    },
  });
};

// // Update discount
// export const useUpdateDiscount = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({
//       id,
//       data,
//     }: {
//       id: number;
//       data: Partial<DiscountCreateDTO>;
//     }) => {
//       return api
//         .put<DiscountDTO>(`/discounts/${id}`, data)
//         .then((response) => response.data);
//     },
//     onSuccess: (data) => {
//       // Invalidate affected queries
//       queryClient.invalidateQueries({
//         queryKey: DISCOUNT_KEYS.detail(data.id),
//       });
//       queryClient.invalidateQueries({ queryKey: DISCOUNT_KEYS.list });
//     },
//   });
// };

// // Delete discount
// export const useDeleteDiscount = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (id: number) => {
//       return api.delete(`/discounts/${id}`).then(() => id);
//     },
//     onSuccess: (id) => {
//       // Invalidate affected queries
//       queryClient.invalidateQueries({ queryKey: DISCOUNT_KEYS.list });
//       queryClient.invalidateQueries({ queryKey: DISCOUNT_KEYS.detail(id) });
//     },
//   });
// };
