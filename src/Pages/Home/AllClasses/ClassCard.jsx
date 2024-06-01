import PrimaryBtn from "../../../Components/PrimaryBtn";

const ClassCard = ({ classes }) => {
  const {
    title,
    banner_image,
    teacher_name,
    teacher_image,
    price,
    short_description,
    total_enrolment,
  } = classes;
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-lg hover:shadow-[#EF5743]/50">
      <figure className="">
        <img src={banner_image} alt="Shoes" />
      </figure>

      <div className="inline-flex flex-grow card-body">
        <div className="flex gap-6 items-center">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={teacher_image} />
            </div>
          </div>
          <p className="text-green-500 text-xs">{teacher_name}</p>
          <div className="shadow-lg shadow-[#EF5743] text-[10px] size-10 flex items-center text-center rounded-full text-white font-semibold bg-[#EF5743]">
            <p>${price}</p>
          </div>
        </div>
        <h2 className="card-title font-bold">{title}</h2>
        <p className="text-xs">{short_description}</p>
        <PrimaryBtn name={"Enroll"} customClass={"w-full"}></PrimaryBtn>
      </div>
    </div>
  );
};

export default ClassCard;
