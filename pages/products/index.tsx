import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { getProducts, ProductResponse } from "../../utils/api/products";

const Products = ({ productsResponse }: { productsResponse: ProductResponse | null}) => {
  const products = useMemo(() => {
    return productsResponse?.data.filter(product => product.attributes.isActive).map((product) => ({
      ...product.attributes,
      id: product.id,
    }))}
  , [productsResponse]);

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Our products</h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products?.map((product) => (
            <div key={product.id} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <Image
                  src={product.photo.data.attributes.url}
                  alt={product.photo.data.attributes.caption}
                  width={product.photo.data.attributes.width}
                  height={product.photo.data.attributes.height}
                  objectFit={"cover"}
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700 cursor-pointer">
                    <Link href={`/products/${product.id}`}>
                      <div>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </div>
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.shortDescription}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
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