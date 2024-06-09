import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { GrUserAdmin } from "react-icons/gr";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
        console.log(res.data);
      return res.data;
    },
  });

  const handleAdmin = (userInfo) => {
    console.log(userInfo.email);
    Swal.fire({
      text: "Are You Sure You Want To Give Permission To The User",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/admin/${userInfo._id}`)
          .then((response) => {
            if (response.data.modifiedCount > 0) {
              // Request successful, show appropriate message
              console.log("User is admin now", response.data);
              refetch();
              Swal.fire({
                text: "User is now an admin",
                icon: "success",
              });
            } else {
              // Request succeeded but no documents were modified
              console.log("User is not an admin");
              Swal.fire({
                text: "User couldn't be made admin",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            // Request failed
            console.error("Failed to update user:", error);
            Swal.fire({
              text: "Failed to update user",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <>
      <div className="overflow-x-auto w-9/12 text-black rounded-xl mx-auto mt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-[#DFE1FB]">
              <th></th>
              <th>Class Details</th>
              <th>Role</th>
              <th className="w-fit">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((usersInfo, index) => (
              <tr key={usersInfo._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{usersInfo.name}</div>
                      <div className="text-sm">{usersInfo.email}</div>
                    </div>
                  </div>
                </td>
                <th>
                  <h2
                    className={
                      usersInfo.role === "admin"
                        ? `text-xs badge font-normal bg-[#1DA678] py-3 text-white`
                        : usersInfo.role === "teacher"
                        ? `text-xs badge font-normal bg-[#FFF1E7]`
                        : `text-xs badge font-normal bg-white`
                    }
                  >
                    {usersInfo.role ? usersInfo.role : "student"}
                  </h2>
                </th>
                <th className="w-40">
                  {usersInfo.status === "approved" ? (
                    <Link to={`stats/${usersInfo._id}`}>
                      <button className="btn btn-xs bg-[#1DA678] text-white border-0 shadow-none hover:bg-[#1DA678]">
                        Progress
                      </button>
                    </Link>
                  ) : (
                    <button
                      disabled={usersInfo.role === "admin"}
                      onClick={() => handleAdmin(usersInfo)}
                      className="btn bg-[#1DA678] text-white border-0 shadow-none hover:bg-[#1DA678]"
                    >
                      <span className="text-xs">Make Admin</span>{" "}
                      <GrUserAdmin />
                    </button>
                  )}
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
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default AllUsers;
