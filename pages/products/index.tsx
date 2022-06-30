import { useMemo } from "react";
import { cmsFetch } from "../../utils/api/fetch";
import { BaseAttributes, ContentResponse } from "../../utils/api/types/common";

export type ProductAttributes = BaseAttributes & {
  Name: string;
  Active: boolean,
  SaleFrom: string,
  Price: number,
};

export type ProductResponse = ContentResponse<ProductAttributes>;

const Product = ({ product }: { product: ProductAttributes }) => {
  return (
    <div>
      <h1>{product.Name}</h1>
      <p>{product.Active}</p>
      <p>{product.Price}</p>
    </div>
  );
}

// Products page fetches products from the CMS and renders them as a list.
const Products = ({ response }: { response: ProductResponse}) => {
  const products = useMemo(() => {
    return response?.data.map((product) => {
      return <Product key={product.id} product={product.attributes} />;
    });
  }, [response]);
      

  return (
    <div>
      <h1>Products</h1>
      {products}
    </div>
  );
}

export async function getStaticProps() {
  const res = await cmsFetch("products");
  const response = await res.json();
  return {
    props: {
      response
    }
  };
}

export default Products;