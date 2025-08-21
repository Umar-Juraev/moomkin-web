"use client";
import api from "@/api/ axios";
import {
  ApiResponse,
  CompanyDTO,
  PaginatedResponse,
  PaginationParams,
} from "@/types/DTO";
import { useQuery } from "@tanstack/react-query";

const COMPANY_KEYS = {
  all: ["companies"],
  list: ["companies", "list"],
  detail: (id: number) => ["company", "detail", id],
};

export const useCompanies = (
  params: PaginationParams & {
    page?: number;
    limit?: number;
  },
) => {
  return useQuery({
    queryKey: [...COMPANY_KEYS.list, params],
    queryFn: async () => {
      const { page, limit } = params;
      const response = await api.get<
        ApiResponse<PaginatedResponse<CompanyDTO[]>>
      >("/company", {
        params: {
          page,
          limit
        },
      });
      return response.data;
    },
  });
};

// Get company by id
export const useCompany = (id: number) => {
  return useQuery({
    queryKey: COMPANY_KEYS.detail(id),
    queryFn: async () => {
      const response = await api.get<ApiResponse<CompanyDTO>>(
        `/company/${id}`
      );
      return response.data;
    },
    enabled: true,
  });
};
