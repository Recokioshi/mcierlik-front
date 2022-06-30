import { BaseAttributes, ContentResponse } from "../../utils/api/types/common";

export type ProductAttributes = BaseAttributes & {
  Name: string;
  Active: boolean,
  SaleFrom: string,
  Price: number,
};

export type ProductResponse = ContentResponse<ProductAttributes>;