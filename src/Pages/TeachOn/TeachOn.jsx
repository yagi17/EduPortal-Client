import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TeachOn = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const reqData = {
      name: user.displayName,
      userImg: user.photoURL,
      email: user.email,
      category: data.category,
      experience: data.experience,
      about: data.about,
    };
    // `we have received your request. You will be notified.`,
    axiosSecure
      .post("/teacher-req", reqData)
      .then((res) => {
        console.log("data send");
        if (res.data.insertedId) {
          navigate("/dashboard");
          Swal.fire({
            text: "Thank you for your request. We have received it and will process it within 24 H. You will be notified once your request is complete.",
            width: 700,
          });
          reset();
        }
      })
      .catch((error) => {
        console.error("data not send", error);
      });
  };

  const [text, setText] = useState("");
  const maxLength = 200;

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="max-w-screen-lg mx-auto ">
      <div className="text-center mx-auto">
        <div className="avatar">
          <div className="w-32 rounded-full">
            <img src={user?.photoURL || "User.svg"} />
          </div>
        </div>
        <p className="py-6 font-semibold">
          Hi! <span className="uppercase">{user.displayName}</span> Glad to see
          you here
        </p>
      </div>
      <div className="max-w-screen-xl shadow-2xl rounded-lg bg-base-100  ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body md:grid grid-cols-2"
        >
          <div className="">
            {/* name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-xs">Email</span>
              </label>
              <input
                disabled
                defaultValue={user.email}
                {...register("email")}
                type="email"
                placeholder={user.email}
                className="input  input-bordered"
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-xs">
                  Select A Category That You Teach On
                </span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register("category", { required: true })}
              >
                <option disabled selected value="">
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
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-xs">
                  Your Experience Level
                </span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register("experience", { required: true })}
              >
                <option disabled selected value="">
                  Select
                </option>
                <option value={"Beginner"}>Beginner</option>
                <option value={"Experienced"}>Experienced</option>
                <option value={"Mid-Level"}>Mid-Level</option>
              </select>
              {errors.experience && (
                <span className="text-red-500 pl-2 mt-1 text-xs">
                  Select Your Experience Level *
                </span>
              )}
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tell Us About you</span>
            </label>
            <textarea
              {...register("about", { required: true })}
              type="text"
              placeholder="Tell us about yourself"
              className="input h-full pt-2 input-bordered"
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
            <button className="btn bg-[#1DA678] hover:glass hover:bg-[#1DA678] text-white">
              Send A Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeachOn;
