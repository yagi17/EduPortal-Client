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
  };

  return (
    <>
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
            {classes.map((classInfo, index) => (
              <tr key={classInfo._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={classInfo.banner_image} alt="" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{classInfo.title}</div>
                      <div className="text-sm opacity-50">
                        {classInfo.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-ghost badge-sm">
                    {classInfo.teacher_email}
                  </span>
                </td>
                <td>
                  <span className="badge badge-ghost badge-sm">
                    {classInfo.category}
                  </span>
                </td>
                <th>
                  <h2
                    className={
                      classInfo.status === "approved"
                        ? `text-xs badge font-normal bg-[#1DA678] py-3 text-white`
                        : `text-xs badge font-normal bg-white`
                    }
                  >
                    {classInfo.status === "approved" ? "Approved" : "Pending"}
                  </h2>
                </th>
                <th>
                  {classInfo.status === "approved" ? (
                    <Link to={`stats/${classInfo._id}`}>
                      <button className="btn btn-xs bg-[#1DA678] text-white border-0 shadow-none hover:bg-[#1DA678]">
                        Progress
                      </button>
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleApprove(classInfo)}
                      className="btn bg-[#1DA678] text-white text-3xl border-0 shadow-none hover:bg-[#1DA678]"
                    >
                      <IoCheckmarkDoneCircleOutline />
                    </button>
                  )}
                </th>
                <th>
                  <button
                    onClick={() => handleDelete(classInfo)}
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
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default AllClass;
