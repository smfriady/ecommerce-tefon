import BaseLayout from "@/components/BaseLayout";
import CardProduct from "@/components/CardProduct";
import { getProducts } from "@/features/actions/productActions";
import { cookieParser } from "@/helpers/cookieParser";
import { useEffect, useState } from "react";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const Home = ({ cookies }) => {
  console.log;
  const [params, setParams] = useState({ page: 0 });

  const dispatch = useDispatch();
  const { products, pages } = useSelector((s) => s.products);
  const { login } = useSelector((s) => s.login);

  const nextPage = (e) => {
    e.preventDefault();
    setParams({ page: params.page + 1 });
  };

  const prevPage = (e) => {
    e.preventDefault();
    setParams({ page: params.page - 1 });
  };

  useEffect(() => {
    dispatch(getProducts(params.page + 1));
  }, [dispatch, params]);
  return (
    <BaseLayout title="Home Page" token={cookies}>
      <div className="container mx-auto w-full m-5 px-2">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-2">
          {products?.products &&
            products.products.map((p, i) => (
              <CardProduct key={i} products={p} token={cookies} isAdmin={login?.isAdmin} />
            ))}
        </div>

        <nav className="flex justify-center items-center my-5">
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <button
                onClick={prevPage}
                disabled={params.page === 0}
                className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <FaLessThan size={19} />
              </button>
            </li>
            <li>
              <div className="px-3 py-2 leading-tight text-white border border-gray-300k bg-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                {params.page + 1}
              </div>
            </li>
            <li>
              <button
                onClick={nextPage}
                disabled={pages - 1 === params.page}
                className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <FaGreaterThan size={19} />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </BaseLayout>
  );
};

export async function getServerSideProps(context) {
  const { token } = cookieParser(context.req);

  if (!token) {
    return {
      props: {},
    };
  }
  return {
    props: {
      cookies: token,
    },
  };
}

export default Home;
