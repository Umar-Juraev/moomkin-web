import { ContactTypeIdEnum, AttachmentTypeEnum } from "@/constants/enums";

export interface DiscountCreateDTO {
  name: string;
  percentage: number;
  code: string;
  isActive?: boolean;
  expiryDate?: string;
}

export interface PaginatedResponse<T> {
  data: T;
  total: number;
  page: number;
  limit: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface AttachmentByIdDTO {
  id: number;
  created_at: string;
  updated_at: string;
  size: number;
  content_type: string;
  file_id: string;
  original_filename: string;
}

export interface AttachmentDTO {
  id: number;
  size: number;
  url: string;
  file_name: string;
  content_type: string;
}

export interface AttachmentsDTO {
  id: number;
  attachment: AttachmentDTO;
  type: AttachmentTypeEnum;
}
export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface CategoryDTO {
  id: number;
  name: string;
  icon_url: string;
}

export interface CategoryByIdDTO {
  id: number;
  name: string;
  icon_url: string;
  sub_categories: CategoryDTO[];
}
export interface CompanyAddressDTO {
  id: number;
  region: string;
  street: string | null;
  city: string | null;
  home: string | null;
  lat: number;
  lng: number;
  name: string
  working_hours: WorkingHoursDTO[]
}

export interface LinkDTO {
  id: number;
  value: string;
  name: string;
  icon_url: string;
  company_id: number;
  type_id:ContactTypeIdEnum
}

export interface ContactLinkDTO {
  id: number;
  name: string;
  icon_url: string;
}


export interface WorkingHoursDTO {
  day_of_week: number;
  time_from: string;
  time_to: string;
}
export interface CompanyDTO {
  id: number;
  name: string;
  active: boolean;
  icon_url: string;
  addresses: CompanyAddressDTO[];
  links: LinkDTO[];
  working_hours: WorkingHoursDTO[]
}
export interface DiscountDTO {
  id: number;
  name: string;
  description: string;
  description_short: string | null;
  active: boolean;
  start_date: string;
  end_date: string;
  price: number;
  discount_price: number;
  off_percent: number;
  seen_count: number;
  attachments: AttachmentsDTO[];
  category: CategoryDTO;
  company: CompanyDTO;
  tags:DiscountTagDTO[]
}

export interface DiscountByIdDTO {
  id: number;
  name: string;
  description: string;
  description_short: string | null;
  active: boolean;
  start_date: string;
  end_date: string;
  price: number;
  discount_price: number;
  off_percent: number;
  seen_count: number;
  attachments: AttachmentByIdDTO[];
  category: CategoryDTO;
  company: CompanyDTO;
  tags:DiscountTagDTO[]
}


export interface DiscountTagDTO {
  id: number;
  created_at: string;
  updated_at: string;
  Name: string;
  Color: string;
  TextColor: string;
}

export interface StoriesDTO {
  id: number;
  name: string;
  description: string;
  description_short: string | null;
  active: boolean;
  start_date: string;
  end_date: string;
  price: number;
  discount_price: number;
  off_percent: number;
  seen_count: number;
  attachments: AttachmentsDTO[];
  category: CategoryDTO | null;
  company: CompanyDTO;
}