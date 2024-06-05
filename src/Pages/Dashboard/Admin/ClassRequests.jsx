import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ClassRequests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      console.log(res.data);
      return res.data;
    },
  });

  return (
    <>
      {/* <h2 className="text-center text-5xl font-bold">
          {myClasses.length > 0 ? myClasses.length : "data not found"}
        </h2> */}

      <div className="overflow-x-auto max-w-screen-lg  rounded-xl mx-auto mt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-[#DFE1FB]">
              <th></th>
              <th>Class Details</th>
              <th>Email</th>
              <th>Category</th>
              <th>Status</th>
              <th>Update</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((myClass, index) => (
              <tr key={myClass._id}>
                <th>{index + 1}</th>
                <td>
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
                <td>
                  <span className="badge badge-ghost badge-sm">
                    {myClass.teacher_email}
                  </span>
                </td>
                <td>
                  <span className="badge badge-ghost badge-sm">
                    {myClass.category}
                  </span>
                </td>
                <th>
                  <h2 className="text-xs font-normal">
                    {myClass.status === "approved"
                      ? "approved"
                      : myClass.status}
                  </h2>
                </th>
                <th>
                  <button className="btn bg-[#1DA678] text-white text-3xl border-0 shadow-none hover:bg-[#1DA678]">
                    <IoCheckmarkDoneCircleOutline />
                  </button>
                </th>
                <th>
                  <button
                    //   onClick={() => handleDelete(item)}
                    className="btn bg-red-600  text-white border-0 shadow-none hover:bg-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-[#DFE1FB] rounded-t-xl">
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default ClassRequests;
