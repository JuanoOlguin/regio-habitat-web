export type PropertyStatus = 'draft' | 'published' | 'sold' | 'rented';

export type OperationType = 'venta' | 'renta';

export type PropertyType =
  | 'casa'
  | 'departamento'
  | 'terreno'
  | 'comercial'
  | 'bodega';

export interface Property {
  id: string;
  status: PropertyStatus;
  operation: OperationType;
  type: PropertyType;
  title: string;
  slug: string;
  price_mxn: number | null;
  currency: string;
  bedrooms: number | null;
  bathrooms: number | null;
  parking: number | null;
  built_m2: number | null;
  lot_m2: number | null;
  zone: string | null;
  neighborhood: string | null;
  address_text: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  lat: number | null;
  lng: number | null;
  description: string | null;
  features: Record<string, unknown> | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  storage_path: string;
  alt_text: string | null;
  sort_order: number | null;
  is_cover: boolean;
  created_at: string;
}

export interface PropertyFilters {
  operation?: OperationType;
  type?: PropertyType;
  zone?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  q?: string;
  page?: number;
  pageSize?: number;
}
