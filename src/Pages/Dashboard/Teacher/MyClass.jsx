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
      <div className="overflow-x-auto max-w-screen-lg  rounded-xl mx-auto mt-5">
        <table className="table max-w-screen-md">
          {/* head */}
          <thead>
            <tr className="bg-[#DFE1FB]">
              <th></th>
              <th>Class Details</th>
              <th>Category</th>
              <th>Status</th>
              <th>Update</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {myClasses.map((myClass, index) => (
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
                    {myClass.category}
                  </span>
                </td>
                <th>
                  <h2
                    className={
                      myClass.status === "approved"
                        ? `text-xs badge font-normal bg-[#1DA678] py-3 text-white`
                        : `text-xs badge font-normal bg-white`
                    }
                  >
                    {myClass.status === "approved" ? "Approved" : "Pending"}
                  </h2>
                </th>
                <th>
                  <Link
                    to={`/dashboard/my-classes/${myClass._id}`}
                  >
                    <button className="btn btn-md bg-[#D1A054] text-white border-0 shadow-none hover:bg-[#D1A054]">
                      <FaEdit />
                    </button>
                  </Link>
                </th>
                <th>
                  <button
                    onClick={() => handleDelete(myClass)}
                    className="btn bg-red-700  text-white border-0 shadow-none hover:bg-red-700"
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

export default MyClass;
