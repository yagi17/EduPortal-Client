
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAuth from "../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn().then((res) => {
      // console.log(res.user);
      const userInfo = {
        email: res.user?.email,
        name: res.user?.displayName,
      };
      axiosPublic.post("/users", userInfo).then(() => {
        navigate("/");
      });
    });
  };

  return (
    <div className="mx-auto">

      <button
        onClick={handleGoogleSignIn}
        className="btn btn-wide bg-white border-white hover:bg-white text-center"
      >
        <FcGoogle /> Google
      </button>

    </div>
  );
};

export default SocialLogin;
