import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin";

const SignUp = () => {
  const { createUser, updateUserProfile, googleSignIn } = useAuth();

  const navigate = useNavigate();

  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    createUser(data.email, data.password)
      .then(() => {
        // console.log(loggedUser);
        updateUserProfile(data.name, data.photoUrl).then(() => {
          // send to data base
          const userInfo = {
            name: data.name,
            email: data.email,
            photo: data.photoUrl,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            // console.log(res.data);
            if (res.data.insertedId) {
              // console.log("user added to the database");
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} Welcome`,
                showConfirmButton: false,
                timer: 2000,
              });
              navigate("/");
            }
          });
        });
      })
      .catch((error) => {
        // console.error("Error creating user:", error.message);
        if (error.code === "auth/email-already-in-use") {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "error",
            title: "Email is already in use. Please try another email.",
          });
        } else {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "error",
            title: "Something went wrong. Please try again later.",
          });
        }
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col md:flex-row gap-16">
        <div className="card w-1/2 shrink-0 max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                name="name"
                placeholder="Name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-500 text-xs">
                  Name field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo Url</span>
              </label>
              <input
                type="text"
                name="photo"
                {...register("photoUrl")}
                placeholder="Photo Url"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                name="email"
                placeholder="Email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">Email is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                })}
                name="password"
                placeholder="Password"
                className="input input-bordered"
              />
              {errors.password?.type === "minLength" && (
                <span className="text-red-500 text-xs">
                  Password must be 6 character
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-500 text-xs">
                  Password must contain 1 uppercase and 1 lowercase character
                </span>
              )}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <button className="btn bg-[#1DA678] hover:bg-[#1DA678] text-white">
                Sign Up
              </button>
            </div>
          </form>
          <SocialLogin></SocialLogin>
          <p className="text-center pb-6">
            <small>
              Already have an account ?
              <Link className="text-blue-600" to={"/login"}>
                Login Here
              </Link>
            </small>
          </p>
        </div>
        <div className="text-center w-1/2 lg:text-left">
          <h1 className="text-5xl font-bold">Register Now</h1>
          <img src="SignUp.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
