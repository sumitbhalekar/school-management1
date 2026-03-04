"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { loginSchema } from "./validation";

type FormValues = Yup.InferType<typeof loginSchema>;
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log("data----", data);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-2/3 w-full max-w-sm rounded-2xl overflow-scroll shadow-lg bg-white dark:bg-gray-800 p-10"
      >
        <div className="flex flex-col">
          <div className="flex justify-center align-center flex-col">
            <h1 className="text-4xl font-bold text-black-600  justify-center ">
              Login
            </h1>
            <input
              {...register("email")}
              title="Email"
              className="h-10 w-full border-2 border-gray-50 mt-10 rounded-lg"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mb-4">
                {errors.email.message}
              </p>
            )}
            <input
              {...register("password")}
              className="h-10 w-full border-2 border-gray-50 mt-10 rounded-lg"
              placeholder="Password"
              type="password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mb-4">
                {errors.password.message}
              </p>
            )}
            <button
              type="submit"
              className="mt-10 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
