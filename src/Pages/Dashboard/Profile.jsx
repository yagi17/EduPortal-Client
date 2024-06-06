import { FaEdit } from "react-icons/fa";
import useAdmin from "../../Hooks/useAdmin";
import useAuth from "../../Hooks/useAuth";
import useTeacher from "../../Hooks/useTeacher";
import PrimaryBtn from "../../Components/PrimaryBtn";

const Profile = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const [isTeacher] = useTeacher();
  // console.log(user);

  const handleProfile = (e) => {
    e.preventDefault();
  };

  return (
    <div className="card flex h-screen justify-center">
      <div className="flex lg:w-8/12 p-16 rounded-xl gap-6 shadow-xl mx-auto">
        <div className="w-64 items-center  mx-auto space-y-1 border-r-2 border-black">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src={user?.photoURL} />
            </div>
          </div>
          <h2 className="card-title">{user?.displayName}</h2>
          <h2 className="card-title text-xs">{user?.email}</h2>
          {isAdmin ? (
            <>
              <div className="badge badge-primary">Admin</div>
            </>
          ) : isTeacher ? (
            <>
              <div className="badge badge-primary">Teacher</div>
            </>
          ) : (
            <><div className="badge badge-primary">Student</div></>
          )}
        </div>
        <div className="divider"></div>
        <div className="card shrink-0 w-full flex-1">
          <form onClick={handleProfile} className="">
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-4">
                  Name <FaEdit />
                </span>
              </label>
              <input
                type="email"
                placeholder={user.displayName}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-4">
                  Phone
                  <FaEdit />
                </span>
              </label>
              <input
                type="password"
                placeholder="Phone"
                className="input input-bordered"
              />
            </div>
            <div className="form-control justify-start w-52 mt-6">
              <PrimaryBtn customClass={"w-full"} name={"Submit"}></PrimaryBtn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
