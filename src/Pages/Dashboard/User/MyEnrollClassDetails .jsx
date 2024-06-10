import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";
import useAuth from "../../../Hooks/useAuth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const MyEnrollClassDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [assignmentInfo, setAssignmentInfo] = useState();
  console.log(assignmentInfo);
  const count = assignmentInfo?.assignmentSubmission;

  const axiosSecure = useAxiosSecure();
  const { data: classAssignments = [], refetch } = useQuery({
    queryKey: ["assignments", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/class/assignments/${id}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      email: user?.email,
    },
  });

  // Setting the email value when user loads
  useEffect(() => {
    if (user?.email) {
      setValue("email", user.email);
    }
  }, [user, setValue]);

  const handleAssignment = (assignment) => {
    axiosSecure.get(`/assignments/${assignment._id}`).then((res) => {
      // console.log(assignment._id);
      setAssignmentInfo(res.data);
    });
  };

  const onSubmit = (data) => {
    let updatedCount = count + 1;
    axiosSecure
      .patch(`/assignments/${assignmentInfo._id}`, {
        assignmentSubmission: parseInt(updatedCount),
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
          Toast.fire({
            icon: "success",
            title: "Submitted",
          });
          reset();
          refetch();
        }
      })
      .catch((error) => {
        // console.log(error);
        if (error) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
          Toast.fire({
            icon: "error",
            title: "Failed Submission",
          });
          reset();
          refetch();
        }
        // console.log(res.data);
      });
    console.log("Submitted", data);
  };

  return (
    <>
      <div>
        <div>
          {classAssignments.map((assignment, index) => (
            <div
              key={assignment._id}
              className="flex flex-col aspect-auto p-4 sm:p-8 border rounded-3xl bg-gray-800/10 border-gray-700 shadow-gray-600/10 shadow-none m-2 flex-1 max-w-md"
            >
              <h1 className="font-semibold text-xs">
                Assignment: 0{index + 1}
              </h1>
              <h2 className="text-lg sm:text-xl font-medium  mb-2">
                {assignment.assignmentName}
              </h2>
              <p className="text-lg sm:text-xl mb-6 mt-4">
                <span className="text-md p-3 badge font-normal bg-red-200 text-red-800 ">
                  Dead Line: {assignment.assignmentDeadline}
                </span>
              </p>
              <p className=" mb-6">{assignment.assignmentDescription}</p>
              <div>
                <button
                  className="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-white before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  <span className="relative text-sm font-semibold text-black">
                    Submit Assignment
                  </span>
                </button>
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <div className="modal-action m-0">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="text-3xl">
                          <IoCloseCircleOutline />
                        </button>
                      </form>
                    </div>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="card-body p-0"
                    >
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">
                            Student Email Address
                          </span>
                        </label>
                        <input
                          type="email"
                          {...register("email")}
                          placeholder={user?.email}
                          disabled
                          className="input input-bordered"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold text-xs">
                            Description
                          </span>
                        </label>
                        <textarea
                          {...register("description", { required: true })}
                          placeholder="Add Details about your assignment"
                          className="input pt-2 input-bordered h-40"
                          required
                        />
                      </div>
                      <div className="form-control">
                        <button
                          onClick={() => handleAssignment(assignment)}
                          className="btn bg-[#1DA678] hover:bg-[#1DA678] text-white"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </dialog>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyEnrollClassDetails;
