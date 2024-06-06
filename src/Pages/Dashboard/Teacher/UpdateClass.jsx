import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateClass = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const [classInfo, setClassInfo] = useState([]);
  console.log(classInfo.category);

  const { _id } = useLoaderData();

  useEffect(() => {
    axiosPublic.get(`/classes/${_id}`).then((res) => {
      setClassInfo(res.data);
    });
  }, [axiosPublic, _id]);

  const navigate = useNavigate();

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let updatedBannerImage = classInfo.banner_image;
    if (data.image && data.image.length > 0) {
      const image_file = new FormData();
      image_file.append("image", data.image[0]);

      const img_res = await axiosPublic.post(image_hosting_api, image_file, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (img_res.data.success) {
        updatedBannerImage = img_res.data.data.display_url;
      }
    }

    const updatedClassInfo = {
      title: data.title,
      category: data.category,
      price: parseFloat(data.price),
      banner_image: updatedBannerImage,
      short_description: data.description,
    };

    try {
      const res = await axiosSecure.patch(
        `/classes/teacher/${user.email}/${_id}`,
        updatedClassInfo
      );
      if (res.data.modifiedCount > 0) {
        reset();
        Swal.fire({
          icon: "success",
          text: "Information Updated",
          width: 700,
        });
        navigate("/dashboard/my-classes");
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const [text, setText] = useState("");
  const maxLength = 300;

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <div className="justify-center h-screen flex items-center mx-auto w-full">
        <div className="card shrink-0 flex-1 mx-auto max-w-screen-lg shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="flex justify-between gap-5">
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
                  <span className="label-text font-semibold text-xs">
                    Email
                  </span>
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

            <div className="flex justify-between gap-5 items-center">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold text-xs">
                    Title
                  </span>
                </label>
                <input
                  type="text"
                  {...register("title")}
                  defaultValue={classInfo.title}
                  placeholder={classInfo.title}
                  className="input input-bordered"
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold text-xs">
                    Select A Category
                  </span>
                </label>
                <select
                  className="select select-bordered w-full"
                  {...register("category")}
                  // value={classInfo.category || ""}
                >
                  <option disabled selected value={classInfo.category || ""}>
                  {classInfo.category || ""}
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
                    Select a Category *
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-between gap-5 items-center">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold text-xs">
                    Price
                  </span>
                </label>
                <input
                  defaultValue={classInfo.price}
                  placeholder={classInfo.price}
                  type="number"
                  {...register("price")}
                  className="input input-bordered"
                />
                {errors.price && (
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
                  {...register("image")}
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
                {...register("description")}
                type="text"
                defaultValue={classInfo.short_description}
                placeholder={classInfo.short_description}
                className="input pt-2 input-bordered h-48"
                maxLength={maxLength}
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
                Update Class
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateClass;
