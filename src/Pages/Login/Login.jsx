import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin";

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
    signIn(data.email, data.password).then(() => {
      // console.log(res.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: ` Glad To See You Again`,
        showConfirmButton: false,
        timer: 2000,
      });
      // console.log(res);
      navigate(naviGate);
    })
    .catch((error) => {
      // console.log(error);
      if (error.message === "Firebase: Error (auth/invalid-credential).") {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,

        });
        Toast.fire({
          icon: "error",
          title: "Invalid Email / Password"
        });
      }
      if (
        error.message ===
        "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
      ) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        Toast.fire({
          icon: "error",
          title: "Too many requests, try again letter"
        });
      }
      reset()
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
            {/* <button
              onClick={handleGoogleSignIn}
              className="mx-20 btn bg-white border-white hover:bg-white text-center"
            >
              <FcGoogle /> Google
            </button> */}
            <SocialLogin></SocialLogin>
            <p className="text-center pb-6">
              <small>
                Does Not Have An Account?{" "}
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
