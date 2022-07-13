import { useMemo } from "react";
import { cmsFetch } from "../../utils/api/fetch";
import { BaseAttributes, ContentResponse } from "../../utils/api/types/cms";

export type ProductAttributes = BaseAttributes & {
  Name: string;
  Active: boolean,
  SaleFrom: string,
  Price: number,
};

export type ProductResponse = ContentResponse<ProductAttributes>;

const Product = ({ product }: { product: ProductAttributes }) => {
  return (
    <div className="products-wrapper">
      <h1 className="products-header">{product.Name}</h1>
      <p className="products-active">{product.Active}</p>
      <p className='products-price'>{product.Price}</p>
    </div>
  );
}

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