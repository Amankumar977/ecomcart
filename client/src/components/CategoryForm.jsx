import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
const CategoryForm = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let getAllCategory = async () => {
      try {
        let response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/category/getAllCategory`
        );
        return response.data.allCategory;
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        return [];
      }
    };

    getAllCategory()
      .then((allCategories) => {
        setCategories(allCategories);
        toast.success("Categories loaded successfully.");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onCategorySubmit = async ({ category }) => {
    try {
      category = category.toLowerCase();
      let response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/category/createCategory`,
        {
          category,
        }
      );
      toast.success(response.data.message);
      reset();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a category
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onCategorySubmit)}>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900">
                Write the category name below
              </label>
              <div className="mt-2">
                <input
                  id="category"
                  name="category"
                  type="category"
                  autoComplete="category"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset px-2 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("category", { required: true })}
                />
                {errors.category && (
                  <div className="text-red-500 mt-2">
                    This field is required
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className=" items-center justify-between">
                <p>Existing Category</p>
                <ul className="pl-6">
                  {categories.map(({ _id, category }) => (
                    <li key={_id} className="list-disc">
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#1F2937] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#41464f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Create Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CategoryForm;
