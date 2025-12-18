import type { OperationType, PropertyFilters, PropertyType } from '../domain/property';

const operationValues: OperationType[] = ['venta', 'renta'];
const propertyTypeValues: PropertyType[] = [
  'casa',
  'departamento',
  'terreno',
  'comercial',
  'bodega',
];

const getFirst = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

const toNumber = (value?: string): number | null => {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const isOperationType = (value: string): value is OperationType =>
  operationValues.includes(value as OperationType);

const isPropertyType = (value: string): value is PropertyType =>
  propertyTypeValues.includes(value as PropertyType);

export function parsePropertyFilters(
  searchParams: Record<string, string | string[] | undefined>
): PropertyFilters {
  const filters: PropertyFilters = {
    page: 1,
    pageSize: 12,
  };

  const operation = getFirst(searchParams.operation);
  if (operation && isOperationType(operation)) {
    filters.operation = operation;
  }

  const type = getFirst(searchParams.type);
  if (type && isPropertyType(type)) {
    filters.type = type;
  }

  const zone = getFirst(searchParams.zone)?.trim();
  if (zone) {
    filters.zone = zone;
  }

  const minPrice = toNumber(getFirst(searchParams.min));
  if (minPrice !== null) {
    filters.minPrice = minPrice;
  }

  const maxPrice = toNumber(getFirst(searchParams.max));
  if (maxPrice !== null) {
    filters.maxPrice = maxPrice;
  }

  const bedrooms = toNumber(getFirst(searchParams.bed));
  if (bedrooms !== null) {
    filters.bedrooms = bedrooms;
  }

  const bathrooms = toNumber(getFirst(searchParams.bath));
  if (bathrooms !== null) {
    filters.bathrooms = bathrooms;
  }

  const parking = toNumber(getFirst(searchParams.park));
  if (parking !== null) {
    filters.parking = parking;
  }

  const q = getFirst(searchParams.q)?.trim();
  if (q) {
    filters.q = q;
  }

  const page = toNumber(getFirst(searchParams.page));
  if (page !== null && page >= 1) {
    filters.page = page;
  }

  const pageSize = toNumber(getFirst(searchParams.pageSize));
  if (pageSize !== null && pageSize >= 6 && pageSize <= 48) {
    filters.pageSize = pageSize;
  }

  return filters;
}
