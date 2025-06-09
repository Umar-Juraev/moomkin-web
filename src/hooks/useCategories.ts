"use client";
import api from "@/api/ axios";
import {ApiResponse, CategoryDTO } from "@/types/DTO";
import { useQuery } from "@tanstack/react-query";


const DISCOUNT_KEYS = {
  all: ["categories"],
  list: ["categories", "list"],
  detail: (id: number) => ["category", "detail", id],
};

export const useCategories = () => {
  return useQuery({
    queryKey: DISCOUNT_KEYS.list,
    queryFn: async () => {
      const response = await api.get<ApiResponse<CategoryDTO[]>>("/category");
      return response.data;
    },
  });
};

export const useCategory = (id: number) => {
  return useQuery({
    queryKey: DISCOUNT_KEYS.detail(id),
    queryFn: async () => {
      const response = await api.get<CategoryDTO>(`/category/${id}`);
      return response.data;
    },
    enabled: false,
  });
};

// export const useCreateCategory = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (newDiscount: DiscountCreateDTO) => {
//       return api
//         .post<DiscountDTO>("/category", newDiscount)
//         .then((response) => response.data);
//     },
//     onSuccess: () => {
//       // Invalidate list query
//       queryClient.invalidateQueries({ queryKey: DISCOUNT_KEYS.list });
//     },
//   });
// };
