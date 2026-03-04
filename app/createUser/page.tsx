"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { createUserSchema } from "./validations";

type FormValues = Yup.InferType<typeof createUserSchema>;
const CreateUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(createUserSchema) });

  const onSubmit = (data: FormValues) => {
    console.log("FormValues", data);
  };

  return (
    <div className="flex justify-center h-screen items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-2/3 overflow-scroll shadow-lg bg-white-200 rounded-2xl w-full max-w-sm p-10"
      >
        <div className="flex flex-col">
          <div className="flex justify-center align-center flex-col">
            <h1 className="text-4xl text-black-600 font-bold">Create user</h1>
            <input
              {...register("firstName")}
              placeholder="First name"
              className="h-10 w-full rounded-lg mt-5 border-2 border-gray-100"
            />
            {errors && (
              <p className="text-red-500 text-sm mb-2">
                {errors.firstName?.message}
              </p>
            )}
            <input
              {...register("lastName")}
              placeholder="Last name"
              className="h-10 w-full rounded-lg mt-5 border-2 border-gray-100"
            />
            {errors && (
              <p className="text-red-500 text-sm mb-2">
                {errors.lastName?.message}
              </p>
            )}
            <input
              {...register("email")}
              placeholder="Email"
              className="h-10 w-full rounded-lg mt-5 border-2 border-gray-100"
            />
            {errors && (
              <p className="text-red-500 text-sm mb-2">
                {errors.email?.message}
              </p>
            )}

            <input
              {...register("password")}
              placeholder="Password"
              className="h-10 w-full rounded-lg mt-5 border-2 border-gray-100"
            />
            {errors && (
              <p className="text-red-500 text-sm mb-2">
                {errors.password?.message}
              </p>
            )}

            <button
              type="submit"
              className="h-10 bg-blue-500 rounded-lg text-white mt-5 font-bold py-2"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
