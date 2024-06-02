import { Link } from "react-router-dom";

const PrimaryBtn = ({ name, link, customClass }) => {
  return (
    <div>
      <Link to={link}>
        <button
          className={`btn bg-[#1DA678] hover:bg-[#1DA678] border-0 hover:glass text-white ${customClass}`}
        >
          {name}
        </button>
      </Link>
    </div>
  );
};

export default PrimaryBtn;
