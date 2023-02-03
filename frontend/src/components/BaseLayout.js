import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";

const BaseLayout = ({ children, title, token }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex flex-col justify-between min-h-screen bg-gray-50">
        <Navbar token={token} />
        <div>{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default BaseLayout;
