import { useLoaderData } from "react-router-dom";
import PrimaryBtn from "../../Components/PrimaryBtn";

const ClassDetails = () => {
  const {
    _id,
    title,
    banner_image,
    teacher_name,
    teacher_image,
    price,
    short_description,
    total_enrolment,
  } = useLoaderData();
  // console.log(banner_image);

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${banner_image})`,
      }}
    >
      <div className="hero-overlay bg-gradient-to-r from-[#530E9F] to-[#2574FA] opacity-90"></div>
      <div className="hero-content text-center text-white">
        <div className="max-w-4xl space-y-10">
          <h1 className="mb-5 text-5xl font-bold">{title}</h1>
          <p className="mb-5 mx-auto max-w-xl">{short_description}</p>
          <div className="grid grid-cols-2">
            <div className="text-end border-r-2 px-4 font-bold">
              <p className="text-[#F9D423]">{total_enrolment} already registered</p>
              <p>${price}</p>
            </div>
            <div className="flex items-center gap-6 border-l-2  px-4">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={teacher_image} />
                </div>
              </div>
              <div className="text-start">
                <p className="text-xl ">{teacher_name}</p>
                <p className="text-xs">Instructor</p>
              </div>
            </div>
          </div>
          <PrimaryBtn customClass={"btn-wide"} name={"ENROLL NOW"}></PrimaryBtn>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
