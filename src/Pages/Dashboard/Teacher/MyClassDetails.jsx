import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";

const MyClassDetails = () => {
  const { id } = useParams();


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
  } = useForm();

  const onSubmit = (data) => {
    // console.log("This data is assignment");

    const assignmentDetails = {
      classID: id,
      assignmentName: data?.title,
      assignmentDeadline: data?.deadline,
      assignmentDescription: data?.description,
      assignmentSubmission: "0",
    };
    // console.log(assignmentDetails);

    axiosSecure.post("/assignments", assignmentDetails).then((res) => {
      //   console.log(res.data);
      if (res.data.insertedId) {
        refetch();
        reset();
      }
    });
  };

  const [text, setText] = useState("");
  const maxLength = 400;

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="max-w-screen-md mx-auto mt-10">
      <div className="">
        <div className="navbar bg-base-100">
          <div>
            <button
              className="btn rounded-full bg-[#1DA678] hover:bg-[#1DA678] border-0 hover:glass text-white"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              + Create
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
                      <span className="label-text">Assignment Title</span>
                    </label>
                    <input
                      type="text"
                      {...register("title", { required: true })}
                      name="title"
                      placeholder="Assignment Title"
                      className="input input-bordered"
                    />
                    {errors.title && (
                      <span className="text-red-500 text-xs">
                        Email is required
                      </span>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <div className="form-control flex-1">
                      <label className="label">
                        <span className="label-text">Assignment Deadline</span>
                      </label>
                      <input
                        type="date"
                        {...register("deadline", {
                          required: true,
                        })}
                        name="deadline"
                        placeholder="Assignment Deadline"
                        className="input input-bordered"
                      />
                      {errors.deadline && (
                        <span className="text-red-500 text-xs">
                          Add a Deadline for Assignment
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-xs">
                        Description
                      </span>
                    </label>
                    <textarea
                      {...register("description", { required: true })}
                      type="text"
                      placeholder="Add Details about your assignment"
                      className="input pt-2 input-bordered h-20"
                      maxLength={maxLength}
                      required
                      onChange={handleChange}
                    />
                    {text.length >= maxLength && (
                      <span className="character-count-error pl-2 mt-1 text-xs text-red-500">
                        Maximum {maxLength} characters allowed. You have
                        exceeded the limit.
                      </span>
                    )}
                  </div>
                  <div className="form-control">
                    <button className="btn bg-[#1DA678] hover:bg-[#1DA678] text-white">
                      Add Assignment
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
          </div>
          <h2 className="navbar-end md:flex hidden">
            Class Details for ID: #{id}
          </h2>
        </div>

        <table className="w-full mx-auto divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-400 text-white items-center rounded-t-xl">
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider justify-center items-center">
                NO
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Deadline
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Submitted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {classAssignments?.map((assignment, index) => {
              const date = new Date(assignment.assignmentDeadline);
              const formattedDate = date.toLocaleDateString("en-Uk", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

              return (
                <tr key={assignment._id}>
                  <th className="px-6 font-semibold py-4 whitespace-nowrap">
                    {index + 1}
                  </th>
                  <td className="px-6 font-semibold py-4 whitespace-nowrap">
                    {assignment.assignmentName}
                  </td>
                  <td className="px-6 font-semibold py-4 whitespace-nowrap">
                    {formattedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    {assignment.assignmentSubmission}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    <button className="btn">Delete</button>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClassDetails;
