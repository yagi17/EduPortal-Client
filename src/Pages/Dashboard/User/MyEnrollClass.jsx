import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import PrimaryBtn from "../../../Components/PrimaryBtn";


const MyEnrollClass = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const { data: enrollments = [] } = useQuery({
    queryKey: ["enrollments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrollments/${user?.email}`);
      // console.log(res.data);
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-3xl font-bold text-center">Enrolled classes</h2>

      <div className="space-y-6 my-10">
        {enrollments.map((item) => (
          <div
            key={item._id}
            className="hero max-w-xl border-2 duration-300 hover:shadow-xl rounded-xl"
          >
            <div className="hero-content flex w-full flex-col lg:flex-row justify-start ">
              <img
                src={item.classData.banner_image}
                className="rounded-lg w-48 "
              />
              <div>
                <h1 className="text-xl font-bold">{item.classData.title}</h1>
                <h2 className="text-xs py-2"> {item.classData.teacher_name}</h2>
                {/* <Link to={`/dashboard/myEnroll-class/${item._id}`}><button>Continue Course</button></Link> */}
                <PrimaryBtn
                  customClass={"btn-sm "}
                  name={"Continue Course"}
                  link={`/dashboard/myEnroll-class/${item.classData._id}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrollClass;
