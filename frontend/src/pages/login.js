import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import AuthLayout from "@/components/AuthLayout";
import FormInput from "@/components/FormInput";
import { customerLogin } from "@/features/actions/authActions";
import { useRouter } from "next/router";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { loading } = useSelector((s) => s.login);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(customerLogin(form))
      .then(({ message }) => {
        setForm({
          email: "",
          password: "",
        });
        router.push("/");
        toast.success(message);
      })
      .catch((message) => toast.error(message));
  };

  return (
    <AuthLayout title="Login page">
      <form onSubmit={handleSubmit}>
        <div className="max-w-md rounded overflow-hidden shadow-lg mx-auto p-5">
          <h1 className="text-center text-xl">Login Akun</h1>

          <FormInput
            value={form.email}
            name="email"
            type="email"
            onChange={onChangeHandler}
            label="email"
            placeholder="Input your email"
          />

          <FormInput
            value={form.password}
            name="password"
            type="password"
            onChange={onChangeHandler}
            label="password"
            placeholder="Input your Password"
          />

          <div className="flex flex-col mb-3">
            <button
              disabled={loading}
              type="submit"
              className={`hover:bg-gray-800 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-4 w-full`.concat(
                loading ? " bg-gray-400" : " bg-black"
              )}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
