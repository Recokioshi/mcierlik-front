import { features } from "process";
import { cmsFetch, cmsFetchSingle } from "./fetch";
import { BData, ContentResponse, Product, ProductAttributes } from "./types/cms";
import { Color } from "./types/common";

export type ProductResponse = ContentResponse<ProductAttributes>;

const getBaseQuery = (locale?: string) => `populate=photo&populate=gallery&filters[isActive][$eq]=true${locale ? `&locale=${locale}` : ''}`;

const isStringArray = (arr: any | any[]): arr is string[] => {
  return arr && Array.isArray(arr) && arr.every(item => typeof item === 'string');
}

const isObjectOfColor = (obj: any): obj is Record<string, Color> => {
  return obj && 
    typeof obj === 'object' &&
    Object.keys(obj).every(key => typeof obj[key] === 'string');
}

const parseProduct = (product: BData<ProductAttributes>): Product => {
  const {
    photo,
    gallery,
    features,
    colors,
  } = product.attributes;
  const { id } = product;
  try {
    const photoObject = {...photo.data?.attributes, id: photo.data?.id};
    const galleryArray = (gallery?.data || []).map(item => ({...item.attributes, id: item.id})); 
    return {
      ...product.attributes,
      photo: photoObject,
      gallery: galleryArray,
      features: isStringArray(features) ? features : [],
      colors: isObjectOfColor(colors) ? colors : {},
      id,
    }
  }
  catch (e) {
    console.error(e);
    throw e;
  }
}

export const getProducts = async (locale?: string) => {
  try {
    const response = await cmsFetch<ProductAttributes>(`products?${getBaseQuery(locale)}`);
    return response.data.map(product => parseProduct(product));
  } catch (er) {
    console.error(er);
    return [];
  }
}

export const getProduct = async (id: string, locale?: string) => {
  try {
    const response = await cmsFetchSingle<ProductAttributes>(`products/${id}/?${getBaseQuery(locale)}`);
    return parseProduct(response.data);
  } catch (er) {
    console.error(er);
    return null;
  }
}