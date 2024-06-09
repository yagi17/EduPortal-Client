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
  console.log(users);

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
      <table className="w-[700px] mt-10 mx-auto divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-400 text-white items-center rounded-t-xl">
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider justify-center items-center">NO</th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((usersInfo, index) => (
            <tr key={usersInfo._id}>
              <th className="px-6 py-4 h-full whitespace-nowrap  justify-center items-center">{index + 1}</th>
              <td className="px-6 font-semibold py-4 whitespace-nowrap">{usersInfo.name}</td>
              <td className="px-6 font-semibold py-4 whitespace-nowrap">{usersInfo.email}</td>
              <td className="px-6 py-4 whitespace-nowrap capitalize">
                <span
                  className={
                    usersInfo.role === "admin"
                      ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                      : usersInfo.role === "teacher"
                      ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                      : "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  }
                >
                   {usersInfo.role ? usersInfo.role : "student"}
                </span>
              </td>
              <td className="py-4 w-fit whitespace-nowrap">
                <button 
                disabled={usersInfo.role === "admin"}
                onClick={() => handleAdmin(usersInfo)}
                className=" btn font-medium text-white bg-[#1DA678] rounded-md hover:bg-[#1DA678] focus:outline-none focus:shadow-outline-red active:bg-[#1DA678] transition duration-150 ease-in-out">
                  Make Admin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AllUsers;
