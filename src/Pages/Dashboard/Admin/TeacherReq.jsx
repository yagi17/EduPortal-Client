import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import "./admin.css";

const TeacherReq = () => {
  const axiosSecure = useAxiosSecure();
  const { data: requests = [], refetch } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/teacher-req");
      return res.data;
    },
  });

  const handleApprove = (request) => {
    // console.log(request);
    Swal.fire({
      title: "Confirm Request",
      text: "Please Confirm The Approval",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm it!",
    }).then((res) => {
      if (res.isConfirmed) {
        axiosSecure.patch(`/users/teacher/${request.email}`).then((res) => {
          // console.log("User is teacher Now", res.data);
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              position: "top",
              icon: "success",
              title: `${request.name} Has Been Updated`,
              showConfirmButton: false,
              timer: 1500,
            });
            axiosSecure.delete(`/teacher-req/${request._id}`).then((res) => {
              if (res.data.deletedCount > 0) {
                refetch();
                Swal.fire({
                  text: "Request has been rejected",
                });
              }
            });
          }
        });
      }
    });
  };

  const handleReject = (request) => {
    Swal.fire({
      title: "Confirm Request",
      text: "Are you sure you want to give Admin role",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm it!",
    }).then((res) => {
      if (res.isConfirmed) {
        axiosSecure.delete(`/teacher-req/${request._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
          }
        });
      }
    });
  };

  return (
    <>
      <table className="max-w-screen-lg mt-10 mx-auto divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-400 text-white items-center rounded-t-xl">
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider justify-center items-center"></th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Description
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
          {requests.map((request, index) => (
            <tr key={request._id}>
              <th className="px-6 py-4 h-full whitespace-nowrap  justify-center items-center">
                {index + 1}
              </th>
              <td className="px-6 font-semibold py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={request.userImg} alt="" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{request.name}</div>
                    <div className="text-sm opacity-50">{request.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 font-semibold py-4 overflow-hidden">
                <h2>{request.about}</h2>
                <br />
                <span className="badge badge-ghost badge-sm">
                  {request.category}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap capitalize">
                <h2 className="text-xs badge font-normal bg-red-200 text-red-800">Pending</h2>
              </td>
              <td className="py-4 w-fit whitespace-nowrap">
                <button
                  onClick={() => handleApprove(request)}
                  className="btn  bg-green-500 hover:bg-green-500 font-normal"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(request)}
                  className="btn ml-2 bg-red-600 hover:bg-red-500 text-white font-normal"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TeacherReq;
