import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Routers/useAuth";

const Login = () => {
  const { signIn } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const naviGate = location?.state || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signIn(data.email, data.password).then((res) => {
      console.log(res);
      navigate(naviGate)
    });
  };

  return (
    <>
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col md:flex-row">
          <div className="text-center w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <img src="SignUp.svg" alt="" />
          </div>
          <div className="card w-1/2 shrink-0 max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
                  <span className="text-red-500 text-xs">
                    Email is required
                  </span>
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
                  })}
                  name="password"
                  placeholder="Password"
                  className="input input-bordered"
                />
                {errors.password && (
                  <span className="text-red-500 text-xs">
                    Password is required
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
                  Log-In
                </button>
              </div>
            </form>
            <button className="mx-20 btn bg-white border-white hover:bg-white text-center">
              <FcGoogle /> Google
            </button>
            <p className="text-center pb-6">
              <small>
                Don't Have An Account?{" "}
                <Link className="text-blue-600" to={"/sign-up"}>
                  Create an account
                </Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
