import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";

const AuthLayout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex flex-col justify-between min-h-screen bg-gray-50">
        <Navbar />
        <div>{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default AuthLayout;
