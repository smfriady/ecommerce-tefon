import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthLayout from "@/components/AuthLayout";
import FormInput from "@/components/FormInput";
import { customerRegister } from "@/features/actions/authActions";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { loading } = useSelector((s) => s.register);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(customerRegister(form))
      .then(({ message }) => {
        setForm({
          name: "",
          email: "",
          password: "",
        });
        toast.success(message);
      })
      .catch((message) => toast.error(message));
  };

  return (
    <AuthLayout title="Register page">
      <form onSubmit={handleSubmit}>
        <div className="max-w-md rounded overflow-hidden shadow-lg mx-auto p-5">
          <h1 className="text-center text-xl">Daftar Akun Baru</h1>
          <FormInput
            value={form.name}
            name="name"
            type="text"
            onChange={onChangeHandler}
            label="name"
            placeholder="Input your name"
          />

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
              Register
            </button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
