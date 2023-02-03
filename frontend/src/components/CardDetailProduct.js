import { formatRupiah } from "@/helpers/formatRupiah";

const CardDetailProduct = ({ products }) => {
  const { _id, product_name, product_price, brand, product_image_url, product_info } =
    products;
  let regex = /[,-]/g;

  return (
    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="object-cover w-full md:w-1/2"
        src={product_image_url}
        alt={product_name}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {`${product_name}`.split(regex)[0]}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Price: {formatRupiah(product_price)}
        </p>
        <p>
          <span className="inline-block bg-blue-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">
            {product_info}
          </span>
        </p>
        <div className="px-6 pt-2 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{brand}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{`${product_name}`.split(regex)[1]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardDetailProduct;
