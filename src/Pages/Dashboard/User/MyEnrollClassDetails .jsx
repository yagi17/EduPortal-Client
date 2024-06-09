import { useParams } from "react-router-dom";

const MyEnrollClassDetails = () => {
  const { id } = useParams();
  console.log("Class ID:", id);  // Check if the ID is correctly logged
  return (
    <div>
      <h2>Class Details for ID: {id}</h2>
    </div>
  );
};

export default MyEnrollClassDetails;
