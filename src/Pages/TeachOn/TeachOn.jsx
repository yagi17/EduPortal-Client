import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import PrimaryBtn from "../../Components/PrimaryBtn";

const TeachOn = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="max-w-screen-lg mx-auto ">
      <div className="text-center  mx-auto">
        <div className="avatar">
          <div className="w-32 rounded-full">
            <img src={user?.photoURL || "User.svg"} />
          </div>
        </div>
        <p className="py-6 font-semibold">
          Hi! <span className="uppercase">{user.displayName}</span> glad to see
          you here
        </p>
      </div>
      <div className="max-w-screen-xl shadow-2xl bg-base-100  ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body md:grid grid-cols-2"
        >
          <div className="">
            {/* name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
              defaultValue={user.email}
                {...register("email")}
                type="email"
                placeholder={user.email}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select className="select select-bordered w-full">
                <option disabled selected>
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
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Your Experience</span>
              </label>
              <select className="select select-bordered w-full">
                <option disabled selected>
                  Select
                </option>
                <option value={"Beginner"}>Beginner</option>
                <option value={"Experienced"}>Experienced</option>
                <option value={"Mid-Level"}>Mid-Level</option>
              </select>
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">About you</span>
            </label>
            <textarea
              {...register("name", { required: true })}
              //   defaultValue={user.displayName}
              type="text"
              placeholder="Tell us about yourself"
              className="input h-full pt-2 input-bordered"
              required
            />
          </div>

          <div className="form-control mt-6">
            <PrimaryBtn
              customClass={"w-full"}
              name={"Send Request"}
            ></PrimaryBtn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeachOn;
