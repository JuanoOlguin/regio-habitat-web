import { supabase } from '../supabase/client';
import type { Property, PropertyFilters, PropertyImage } from '../domain/property';

export type PropertyListItem = Pick<
  Property,
  | 'id'
  | 'title'
  | 'slug'
  | 'price_mxn'
  | 'bedrooms'
  | 'bathrooms'
  | 'parking'
  | 'zone'
  | 'neighborhood'
  | 'lat'
  | 'lng'
>;

export async function listProperties(
  filters: PropertyFilters = {}
): Promise<{ data: PropertyListItem[]; count: number }> {
  const {
    operation,
    type,
    zone,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    parking,
    q,
    page = 1,
    pageSize = 12,
  } = filters;

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('properties')
    .select(
      'id, title, slug, price_mxn, bedrooms, bathrooms, parking, zone, neighborhood, lat, lng',
      { count: 'exact' }
    )
    .eq('status', 'published')
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (operation) {
    query = query.eq('operation', operation);
  }

  if (type) {
    query = query.eq('type', type);
  }

  if (zone) {
    query = query.eq('zone', zone);
  }

  if (typeof minPrice === 'number') {
    query = query.gte('price_mxn', minPrice);
  }

  if (typeof maxPrice === 'number') {
    query = query.lte('price_mxn', maxPrice);
  }

  if (typeof bedrooms === 'number') {
    query = query.gte('bedrooms', bedrooms);
  }

  if (typeof bathrooms === 'number') {
    query = query.gte('bathrooms', bathrooms);
  }

  if (typeof parking === 'number') {
    query = query.gte('parking', parking);
  }

  const qTerm = q?.trim();
  if (qTerm) {
    const pattern = `%${qTerm}%`;
    query = query.or(`title.ilike.${pattern},neighborhood.ilike.${pattern}`);
  }

  const { data, count, error } = await query;

  if (error) {
    throw new Error(`Error fetching properties: ${error.message}`);
  }

  return { data: data ?? [], count: count ?? 0 };
}

export type PropertyWithImages = Property & { property_images: PropertyImage[] };

export async function getPropertyBySlug(
  slug: string
): Promise<PropertyWithImages | null> {
  const { data, error } = await supabase
    .from('properties')
    .select('*, property_images(*)')
    .eq('slug', slug)
    .eq('status', 'published')
    .order('is_cover', { ascending: false, foreignTable: 'property_images' })
    .order('sort_order', { ascending: true, foreignTable: 'property_images' })
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Error fetching property: ${error.message}`);
  }

  return data as PropertyWithImages;
}
