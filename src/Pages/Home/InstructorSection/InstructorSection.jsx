import PrimaryBtn from "../../../Components/PrimaryBtn";

const InstructorSection = () => {
  return (
    <section className="max-w-6xl lg:my-20 my-10 mx-auto">
      <h2 className="lg:text-4xl mb-8 text-2xl font-bold text-center">Become an Instructor</h2>
      <div className="card card-side">
        <figure>
          <img
            src="https://t3.ftcdn.net/jpg/02/94/21/42/360_F_294214205_ZmptWrtSwORSWadAIHSWqwSa319XlQiB.jpg"
            alt="Movie"
          />
        </figure>
        <div className="card-body w-1/2">
          <h2 className="card-title">Become an Instructor</h2>
          <p>
            Instructors from around the world teach millions of learners on
            EduPortal. We provide the tools and skills to teach what you love.
          </p>
          <div className="card-actions">
            <PrimaryBtn
              link={"/join-as-teacher"}
              name={"Start Teaching Today"}
            ></PrimaryBtn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorSection;
