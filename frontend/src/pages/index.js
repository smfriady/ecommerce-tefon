import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseLayout from "@/components/BaseLayout";
import { cookieParser } from "@/helpers/cookieParser";
import { getProducts } from "@/features/actions/productActions";
import CardProduct from "@/components/CardProduct";

const Home = ({ cookies }) => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((s) => s.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <BaseLayout title="Home Page" token={cookies ? true : false}>
      <div className="container mx-auto w-full m-5 px-2">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-2">
          {products && products.map((p, i) => <CardProduct key={i} products={p} />)}
        </div>
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
