import { ModalContext } from "@/context/ModalContext";
import { addProduct, editProduct } from "@/features/actions/productActions";
import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import FormInput from "./FormInput";

const FormCreateProduct = ({ token, products, btnType }) => {
  let { handleModal } = useContext(ModalContext);
  if (btnType === "edit") {
    return (
      <button
        className="inline-block bg-green-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2"
        onClick={() =>
          handleModal(<FormProduct token={token} products={products} type={btnType} />)
        }
      >
        Edit Product
      </button>
    );
  }
  return (
    <button
      className="space-x-1 flex flex-row items-center justify-center"
      onClick={() => handleModal(<FormProduct token={token} products={products} />)}
    >
      <FaPlus /> <span>Add Product</span>
    </button>
  );
};

export default FormCreateProduct;

function FormProduct({ token, products, type }) {
  let { handleModal } = useContext(ModalContext);

  const [form, setForm] = useState({
    id: products?._id ?? "",
    product_name: products?.product_name ?? "",
    product_price: products?.product_price ?? 0,
    brand: products?.brand ?? "",
    product_image_url: products?.product_image_url ?? "",
    product_info: products?.product_info ?? 0,
  });

  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  let loading = false;

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      editProduct({
        ...form,
        token,
      })
    )
      .then(({ message }) => {
        setForm({
          product_name: "",
          product_price: 0,
          brand: "",
          product_image_url: "",
          product_info: 0,
        });
        toast.success(message);
        handleModal();
      })
      .catch((message) => toast.error(message));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addProduct({
        ...form,
        token,
      })
    )
      .then(({ message }) => {
        setForm({
          product_name: "",
          product_price: 0,
          brand: "",
          product_image_url: "",
          product_info: 0,
        });
        toast.success(message);
        handleModal();
      })
      .catch((message) => toast.error(message));
  };
  return (
    <form onSubmit={type === "edit" ? handleEditSubmit : handleSubmit}>
      <div className="rounded overflow-hidden shadow-lg mx-auto p-5">
        <h1 className="text-center text-xl capitalize">{type} Product</h1>

        <FormInput
          value={form.product_name}
          name="product_name"
          type="text"
          onChange={onChangeHandler}
          label="product name"
          placeholder="Input your product name"
        />

        <FormInput
          value={form.product_price}
          name="product_price"
          type="number"
          onChange={onChangeHandler}
          label="product price"
          placeholder="Input your product price"
        />

        <FormInput
          value={form.brand}
          name="brand"
          type="text"
          onChange={onChangeHandler}
          label="brand"
          placeholder="Input your brand"
        />

        <FormInput
          value={form.product_image_url}
          name="product_image_url"
          type="text"
          onChange={onChangeHandler}
          label="product image url"
          placeholder="Input your product image url"
        />

        <FormInput
          value={form.product_info}
          name="product_info"
          type="number"
          onChange={onChangeHandler}
          label="product info (Stok)"
          placeholder="Input your product info"
        />

        <div className="flex flex-col mb-3">
          <button
            disabled={loading}
            type="submit"
            className={`hover:bg-gray-800 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-4 w-full`.concat(
              loading ? " bg-gray-400" : " bg-black"
            )}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
