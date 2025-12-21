import type { OperationType, PropertyFilters, PropertyType } from '../domain/property';

const operationValues: OperationType[] = ['venta', 'renta'];
const propertyTypeValues: PropertyType[] = [
  'casa',
  'departamento',
  'terreno',
  'comercial',
  'bodega',
];

type NormalizedSearchParams = Record<string, string | string[] | undefined>;
type AllowedSearchParams =
  | NormalizedSearchParams
  | URLSearchParams
  | {
      getAll(name: string): string[];
      keys(): IterableIterator<string>;
    }
  | null
  | undefined;

const isURLSearchParamsLike = (
  value: AllowedSearchParams
): value is { getAll(name: string): string[]; keys(): IterableIterator<string> } => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'getAll' in value &&
    typeof (value as { getAll?: unknown }).getAll === 'function' &&
    'keys' in value &&
    typeof (value as { keys?: unknown }).keys === 'function'
  );
};

const normalizeSearchParams = (searchParams: AllowedSearchParams): NormalizedSearchParams => {
  if (!searchParams) return {};

  if (searchParams instanceof URLSearchParams) {
    const result: NormalizedSearchParams = {};
    for (const key of searchParams.keys()) {
      const values = searchParams.getAll(key);
      result[key] = values.length > 1 ? values : values[0];
    }
    return result;
  }

  if (isURLSearchParamsLike(searchParams)) {
    const result: NormalizedSearchParams = {};
    for (const key of searchParams.keys()) {
      const values = searchParams.getAll(key);
      result[key] = values.length > 1 ? values : values[0];
    }
    return result;
  }

  return searchParams as NormalizedSearchParams;
};

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
  searchParams: AllowedSearchParams = {}
): PropertyFilters {
  const params = normalizeSearchParams(searchParams);

  const filters: PropertyFilters = {
    page: 1,
    pageSize: 12,
  };

  const operation = getFirst(params.operation);
  if (operation && isOperationType(operation)) {
    filters.operation = operation;
  }

  const type = getFirst(params.type);
  if (type && isPropertyType(type)) {
    filters.type = type;
  }

  const zone = getFirst(params.zone)?.trim();
  if (zone) {
    filters.zone = zone;
  }

  const minPrice = toNumber(getFirst(params.min));
  if (minPrice !== null) {
    filters.minPrice = minPrice;
  }

  const maxPrice = toNumber(getFirst(params.max));
  if (maxPrice !== null) {
    filters.maxPrice = maxPrice;
  }

  const bedrooms = toNumber(getFirst(params.bed));
  if (bedrooms !== null) {
    filters.bedrooms = bedrooms;
  }

  const bathrooms = toNumber(getFirst(params.bath));
  if (bathrooms !== null) {
    filters.bathrooms = bathrooms;
  }

  const parking = toNumber(getFirst(params.park));
  if (parking !== null) {
    filters.parking = parking;
  }

  const q = getFirst(params.q)?.trim();
  if (q) {
    filters.q = q;
  }

  const page = toNumber(getFirst(params.page));
  if (page !== null && page >= 1) {
    filters.page = page;
  }

  const pageSize = toNumber(getFirst(params.pageSize));
  if (pageSize !== null && pageSize >= 6 && pageSize <= 48) {
    filters.pageSize = pageSize;
  }

  return filters;
}