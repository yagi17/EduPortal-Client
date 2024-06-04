import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

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
    console.log(request);
    Swal.fire({
        title: "Confirm Request",
        text: "Are you sure you want to give Admin role",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm it!",
      })
      .then(res=>{
        if(res.isConfirmed){
            axiosSecure.patch(`/users/${request.email}`)
            .then(res=>{
                console.log('User is teacher Now', res.data);
                if(res.data.modifiedCount > 0){
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: `${request.name} Has Been Updated`,
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      axiosSecure.delete(`/teacher-req/${request._id}`)
                      .then(res=>{
                        if (res.data.deletedCount > 0) {
                            refetch()
                        }
                      })
                }
            })
        }
      })
  };

  const handleReject = () => {};

  return (
    <div>
      <div className="w-full py-5 text-center font-bold text-4xl bg-[#DFE1FB] ">
        <h2>List Of Pending Teacher Request</h2>
      </div>
      <div className="overflow-x-auto max-w-screen-lg  rounded-xl mx-auto mt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-[#DFE1FB]">
              <th></th>
              <th>User</th>
              <th>Description</th>
              <th>Status</th>
              <th>Approved</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={request._id}>
                <th>{index + 1}</th>
                <td>
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
                <td>
                  {request.about.split(" ").slice(0, 30).join(" ")}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {request.category}
                  </span>
                </td>
                <th>
                  <h2 className="text-xs font-normal">Pending</h2>
                </th>
                <th>
                  <button
                    onClick={() => handleApprove(request)}
                    className="btn btn-xs bg-green-500 hover:bg-green-500 font-normal"
                  >
                    Approve
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => handleReject(request)}
                    className="btn btn-xs bg-red-500 hover:bg-red-500 text-white font-normal"
                  >
                    Reject
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
    </div>
  );
};

export default TeacherReq;
