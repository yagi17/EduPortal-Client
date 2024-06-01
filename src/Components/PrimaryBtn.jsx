import { Link } from "react-router-dom";

const PrimaryBtn = ({ name, link, customClass }) => {
  return (
    <div>
      <button className={`btn bg-[#1DA678] hover:bg-[#1DA678] text-white ${customClass}`}>
        <Link to={link}>{name}</Link>
      </button>
    </div>
  );
};

export default PrimaryBtn;
