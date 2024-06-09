import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddClass = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  // console.log(image_hosting_key);
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const image_file = { image: data.image[0] };

    const img_res = await axiosPublic.post(image_hosting_api, image_file, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (img_res.data.success) {
      const classInfo = {
        teacher_email: user.email,
        teacher_name: user.displayName,
        teacher_image: user.photoURL,
        banner_image: img_res.data.data.display_url,
        title: data.title,
        price: data.price,
        category: data.category,
        short_description: data.description,
        status: 'pending'
      };
      console.log(classInfo);

      const res = await axiosSecure.post("/classes", classInfo);
      console.log(res.data);
      if (res.data.insertedId) {
        reset();
        Swal.fire({
          text: "You will be notified once admin accept your request",
          width: 700,
        });
        navigate("/dashboard/my-classes");
      }
    }
  };

  const [text, setText] = useState("");
  const maxLength = 350;

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="justify-center h-screen flex items-center mx-auto w-full">
      <div className="card shrink-0 flex-1 mx-auto  max-w-screen-lg shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="flex justify-between gap-5">
            {/* Name & Email */}

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-xs">Name</span>
              </label>
              <input
                defaultValue={user.displayName}
                disabled
                type="text"
                {...register("name")}
                placeholder={user.displayName}
                className="input input-bordered"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-xs">Email</span>
              </label>
              <input
                defaultValue={user.email}
                disabled
                type="email"
                {...register("email")}
                placeholder={user.email}
                className="input input-bordered"
              />
            </div>
          </div>

          {/* title and category */}
          <div className="flex justify-between gap-5 items-center">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-xs">Title</span>
              </label>
              <input
                type="text"
                {...register("title")}
                placeholder="Title"
                className="input input-bordered"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-xs">
                  Select a Category
                </span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register("category", { required: true })}
              >
                <option disabled selected defaultChecked value="">
                  Select
                </option>
                <option value={"Web Development"}>Web Development</option>
                <option value={"Digital Marketing"}>Digital Marketing</option>
                <option value={"Graphic Design"}>Graphic Design</option>
                <option value={"Photography"}>Photography</option>
                <option value={"Data Science"}>Data Science</option>
                <option value={"Creative"}>Creative</option>
                <option value={"Health"}>Health</option>
              </select>
              {errors.category && (
                <span className="text-red-500 pl-2 mt-1 text-xs">
                  Select A Category *
                </span>
              )}
            </div>
          </div>
          {/* Banner , Category, price */}
          <div className="flex justify-between gap-5 items-center">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-xs">Price</span>
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price", { required: true })}
                placeholder="Price"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">Select A price</span>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-xs">
                  Banner Image
                </span>
              </label>
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input file-input-bordered file-input-[#1DA678] w-full "
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-xs">
                Description
              </span>
            </label>
            <textarea
              {...register("description", { required: true })}
              type="text"
              placeholder=""
              className="input pt-2 input-bordered h-48"
              maxLength={maxLength}
              required
              onChange={handleChange}
            />
            {text.length >= maxLength && (
              <span className="character-count-error pl-2 mt-1 text-xs text-red-500">
                Maximum {maxLength} characters allowed. You have exceeded the
                limit.
              </span>
            )}
          </div>

          <div className="form-control">
            <button className="btn bg-[#1DA678] hover:bg-[#1DA678] text-white">
              Add Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
