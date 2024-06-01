import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col md:flex-row">
          <div className="text-center w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <img src="SignUp.svg" alt="" />
          </div>
          <div className="card w-1/2 shrink-0 max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control">
                <button className="btn bg-[#1DA678] hover:bg-[#1DA678] text-white">
                  Login
                </button>
              </div>
            </form>
            <button className="mx-20 btn bg-white border-white hover:bg-white text-center">
              <FcGoogle /> Google
            </button>
            <p className="text-center pb-6">
              <small>
                Don't Have An Account? <Link className="text-blue-600" to={"/sign-up"}>Create an account</Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
