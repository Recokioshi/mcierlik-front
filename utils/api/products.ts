import { cmsFetch, cmsFetchSingle } from "./fetch";
import { BData, ContentResponse, Product, ProductAttributes } from "./types/cms";

export type ProductResponse = ContentResponse<ProductAttributes>;

const BASE_QUERY = `populate=photo&populate=gallery&filters[isActive][$eq]=true`;

const parseProduct = (product: BData<ProductAttributes>): Product => {
  const {
    photo,
    gallery,
  } = product.attributes;
  const { id } = product;
  try {
    const photoObject = {...photo.data.attributes, id: photo.data.id};
    const galleryArray = gallery.data.map(item => ({...item.attributes, id: item.id}));
    return {
      ...product.attributes,
      photo: photoObject,
      gallery: galleryArray,
      id,
    }
  }
  catch (e) {
    console.error(e);
    throw e;
  }
}

export const getProducts = async () => {
  try {
    const response = await cmsFetch<ProductAttributes>(`products?${BASE_QUERY}`);
    return response.data.map(product => parseProduct(product));
  } catch (er) {
    console.error(er);
    return [];
  }
}

export const getProduct = async (id: string) => {
  try {
    const response = await cmsFetchSingle<ProductAttributes>(`products/${id}/?${BASE_QUERY}`);
    return parseProduct(response.data);
  } catch (er) {
    console.error(er);
    return null;
  }
}