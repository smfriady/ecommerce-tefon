import Link from "next/link";
import { useDispatch } from "react-redux";
import { formatRupiah } from "@/helpers/formatRupiah";
import { slugify } from "@/helpers/slug";
import { deleteProduct } from "@/features/actions/productActions";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import FormCreateProduct from "./FormProduct";

const CardProduct = ({ products, token, isAdmin }) => {
  const { _id, product_name, product_price, brand, product_image_url, product_info } =
    products;

  let regex = /[,-]/g;

  const router = useRouter();
  const dispatch = useDispatch();

  const handleDelete = (data) => {
    dispatch(deleteProduct(data))
      .then(({ message }) => {
        router.push("/");
        toast.success(message);
      })
      .catch((message) => toast.error(message));
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="w-full" src={product_image_url} alt={product_name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{`${product_name}`.split(regex)[0]}</div>
        <span className="inline-block bg-blue-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">
          {`${product_info === 0 ? "Stok Habis" : "Click & Pickup"}`}
        </span>
      </div>
      <div className="px-6">
        <div className="font-bold text-xl mb-2">{formatRupiah(product_price)}</div>
        <Link
          href={`/${slugify(product_name)}?id=${_id}`}
          className="inline-block bg-blue-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2"
        >
          Lihat Detail
        </Link>
        {isAdmin && (
          <button
            onClick={() => handleDelete({ id: _id, token })}
            className="inline-block bg-red-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2"
          >
            Delete
          </button>
        )}
        {isAdmin && <FormCreateProduct btnType="edit" products={products} token={token} />}
      </div>
      <div className="px-6 pt-2 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #{brand}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #{`${product_name}`.split(regex)[1]}
        </span>
      </div>
    </div>
  );
};

export default CardProduct;
