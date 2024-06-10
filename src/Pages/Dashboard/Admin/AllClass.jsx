import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AllClass = () => {
  const axiosSecure = useAxiosSecure();

  const { data: classes = [], refetch } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      //   console.log(res.data);
      return res.data;
    },
  });

  const handleApprove = (classInfo) => {
    Swal.fire({
      title: "Please Confirm",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Approve",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // console.log("Class Approved", classInfo._id);
        const res = await axiosSecure.patch(`/classes/${classInfo._id}`);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            // title: "Approved",
            text: "Approved",
            icon: "success",
          });
        }
      }
    });
  };

  const handleDelete = (classInfo) => {
    console.log("Class Deleted", classInfo._id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`classes/${classInfo._id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: `File has been removed`,
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <>
        <h1 className="text-center text-4xl font-bold my-8">CLASS LIST</h1>
        <table className="max-w-screen-md mt-10 mx-auto divide-y divide-gray-200 ">
          <thead>
            <tr className="bg-gray-400 text-white items-center rounded-t-xl">
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider justify-center items-center"></th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Class Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {classes?.map((classInfo, index) => (
              <tr key={classInfo._id}>
                <th className="px-6 font-semibold py-4 whitespace-nowrap">
                  {index + 1}
                </th>
                <td className="px-6 font-semibold py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={classInfo.banner_image} alt="" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{classInfo.title}</div>
                      <div className="text-sm opacity-50">
                        {classInfo.teacher_email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 font-semibold py-4 whitespace-nowrap">
                  <span className="badge badge-ghost badge-sm">
                    {classInfo.teacher_email}
                  </span>
                </td>
                <td className="px-6 font-semibold py-4 whitespace-nowrap">
                  <span className="badge badge-ghost badge-sm">
                    {classInfo.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">
                  <h2
                    className={
                      classInfo.status === "approved"
                        ? `text-xs badge font-normal bg-[#1DA678] py-3 text-white`
                        : `text-xs badge font-normal bg-white`
                    }
                  >
                    {classInfo.status === "approved" ? "Approved" : "Pending"}
                  </h2>
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  <button
                    disabled={classInfo.status === "approved"}
                    onClick={() => handleApprove(classInfo)}
                    className="btn bg-[#1DA678] text-white text-3xl border-0 shadow-none hover:bg-[#1DA678]"
                  >
                    <IoCheckmarkDoneCircleOutline />
                  </button>
                  <button
                    onClick={() => handleDelete(classInfo)}
                    className="btn ml-2 bg-red-600  text-white border-0 shadow-none hover:bg-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </>
  );
};

export default AllClass;
