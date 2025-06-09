"use client";
import api from "@/api/ axios";
import { ApiResponse, DiscountCreateDTO, DiscountDTO, PaginatedResponse, PaginationParams } from "@/types/DTO";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


// Simple query keys
const DISCOUNT_KEYS = {
  all: ["discounts"],
  list: ["discounts", "list"],
  detail: (id: number) => ["discount", "detail", id],
};

// Get discounts with pagination
export const useDiscounts = (
  params: PaginationParams & { category_id: number }
) => {
  return useQuery({
    queryKey: [...DISCOUNT_KEYS.list, params],
    queryFn: async () => {
      const { page, limit, category_id } = params;
      const response = await api.get<ApiResponse<PaginatedResponse<DiscountDTO[]>>>(
        "/discount",
        {
          params: { page, limit, ...(category_id ? { category_id } : {}) },
        }
      );
      return response.data;
    },
  });
};

// Get discount by id
export const useDiscount = (id: number) => {
  return useQuery({
    queryKey: DISCOUNT_KEYS.detail(id),
    queryFn: async () => {
      const response = await api.get<ApiResponse<DiscountDTO>>(`/discount/${id}`);
      return response.data;
    },
    enabled: true,
  });
};

// // Create discount
export const useCreateDiscount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newDiscount: DiscountCreateDTO) => {
      return api
        .post<DiscountDTO>("/discount", newDiscount)
        .then((response) => response.data);
    },
    onSuccess: () => {
      // Invalidate list query
      queryClient.invalidateQueries({ queryKey: DISCOUNT_KEYS.list });
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
