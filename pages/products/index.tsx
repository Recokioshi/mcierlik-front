import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { getProducts, ProductResponse } from "../../utils/api/products";
import { ProductAttributes } from "../../utils/api/types/cms";

const Product = ({ product }: { product: ProductAttributes & { id: string } }) => {
  const { name, photo: { data: { attributes: photo } }, price, id } = product;
  return (
    <Link href={`/products/${id}`} >
      <div className="products-wrapper">
        <div className="inline-block rounded-full ring-3 ring-white bg-gray-300 overflow-hidden cursor-pointer">
          <Image src={photo.url} alt={product.name} width={120} height={120} objectFit={"cover"} />
        </div>
        <h1 className="products-header">{name}</h1>
        <p className='products-price'>{price}</p>
      </div>
    </Link>
  );
}

const Products = ({ productsResponse }: { productsResponse: ProductResponse | null}) => {
  const products = useMemo(() => {
    return productsResponse?.data.filter(product => product.attributes.isActive).map((product) => {
      return <Product key={product.id} product={{...product.attributes, id: product.id}} />;
    });
  }, [productsResponse]);

  return (
    <div>
      <h1>Products</h1>
      {products}
    </div>
  );
}

export async function getStaticProps() {
  const productsResponse = await getProducts();
  return {
    props: {
      productsResponse
    }
  };
}

export default Products;