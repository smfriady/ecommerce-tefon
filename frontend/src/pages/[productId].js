import { useEffect } from "react";

import BaseLayout from "@/components/BaseLayout";
import { cookieParser } from "@/helpers/cookieParser";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "@/features/actions/productActions";
import CardDetailProduct from "@/components/CardDetailProduct";

const ProductDetailPage = ({ productDetail, token }) => {
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector((s) => s.product);

  useEffect(() => {
    dispatch(getProduct(productDetail));
  }, [dispatch, productDetail]);

  return (
    <BaseLayout title={productDetail} token={token}>
      <div className="container m-auto">
        {!loading && <CardDetailProduct products={product} />}
      </div>
    </BaseLayout>
  );
};

export async function getServerSideProps(ctx) {
  const { token } = cookieParser(ctx.req);
  const { id } = ctx.query;

  if (!id) {
    return { props: {}, redirect: { destination: "/", permanent: false } };
  }

  if (!token) {
    return { props: { token: false, productDetail: id } };
  } else {
    return { props: { token, productDetail: id } };
  }
}

export default ProductDetailPage;
