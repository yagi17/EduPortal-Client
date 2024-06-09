import PrimaryBtn from "../../../Components/PrimaryBtn";
import bannerImg from "../../../assets/BannerImage.png";

const Banner = () => {
  return (
    <div className="hero min-h-screen bg-[#DFE1FB]">
      <div className="hero-content flex-col md:flex-row-reverse">
        <img src={bannerImg} className="max-w-sm lg:max-w-xl rounded-lg" />
        <div>
          <h1 className="lg:text-6xl text-4xl font-bold">Large educational programs</h1>
          <p className="py-6 text-sm">
            Today, more than 48,000 people have already studied at our
            university in various fields: programming, photography, marketing
            and management
          </p>
          <PrimaryBtn
            link={"/all-classes"}
            name={"Get Started"}
            btn={"btn-lg"}
          ></PrimaryBtn>
        </div>
      </div>
    </div>
    // </section>
  );
};

export default Banner;
