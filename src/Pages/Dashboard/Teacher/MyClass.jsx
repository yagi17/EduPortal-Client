import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyClass = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myClasses = [], refetch } = useQuery({
    queryKey: ["myClasses", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/teacher/${user.email}`);
      // console.log(res.data);
      return res.data;
    },
  });

  const handleDelete = (myClass) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/classes/teacher/${user.email}&${myClass._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <>
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-center text-4xl font-bold my-8">CLASS LIST</h1>
        <table className="w-full mx-auto divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-400 text-white items-center rounded-t-xl">
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider justify-center items-center"></th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Class Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Actions
              </th>

            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {myClasses?.map((myClass, index) => (
              <tr key={myClass._id}>
                <th className="px-6 font-semibold py-4 whitespace-nowrap">
                  {index + 1}
                </th>
                <td className="px-6 font-semibold py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={myClass.banner_image} alt="" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{myClass.title}</div>
                      <div className="text-sm opacity-50">{myClass.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 font-semibold py-4 whitespace-nowrap">
                  <span className="badge badge-ghost badge-sm">
                    {myClass.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">
                  <h2
                    className={
                      myClass.status === "approved"
                        ? `text-xs badge font-normal bg-[#1DA678] py-3 text-white`
                        : `text-xs badge font-normal bg-red-200 text-red-800`
                    }
                  >
                    {myClass.status === "approved" ? (
                      <Link to={`/dashboard/my-class/details/${myClass?._id}`}>
                        <button className="text-white border-0 shadow-none">
                          View Details
                        </button>
                      </Link>
                    ) : (
                      "Pending"
                    )}
                  </h2>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                <Link to={`/dashboard/my-classes/${myClass?._id}`}>
                    <button className="btn btn-md bg-[#D1A054] text-white border-0 shadow-none hover:bg-[#D1A054]">
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(myClass)}
                    className="btn ml-2 bg-red-700  text-white border-0 shadow-none hover:bg-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyClass;
