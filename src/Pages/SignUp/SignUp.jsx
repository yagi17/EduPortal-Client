import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import useAuth from "../../Routers/useAuth";

const SignUp = () => {
  const { createUser, updateUserProfile } = useAuth();

  //   const navigate = useNavigate();

  //   const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggerUser = result.user;
      console.log(loggerUser);
      updateUserProfile(data.name, data.photoUrl).then(() => {
        const userInfo = {
          name: data.name,
          email: data.email,
          photo: data.photoUrl,
        };
        
      });
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
              {/* {errors.photoUrl && (
                  <span className="text-red-500 text-xs">
                    Photo Url is required
                  </span>
                )} */}
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
          <button className="mx-20 btn bg-white border-white hover:bg-white text-center">
            <FcGoogle /> Google
          </button>
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
