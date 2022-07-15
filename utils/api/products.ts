import { cmsFetch, cmsFetchSingle } from "./fetch";
import { BaseAttributes, ContentResponse, ProductAttributes } from "./types/cms";

export type ProductResponse = ContentResponse<ProductAttributes>;

export const getProducts = async () => {
  try {
    return await cmsFetch<ProductAttributes>("products?populate=photo");
  } catch (er) {
    console.error(er);
    return null;
  }
}

export const getProduct = async (id: string) => {
  try {
    return await cmsFetchSingle<ProductAttributes>(`products/${id}/?populate=photo`);
  } catch (er) {
    console.error(er);
    return null;
  }
}