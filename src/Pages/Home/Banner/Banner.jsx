import PrimaryBtn from "../../../Components/PrimaryBtn";
import bannerImg from "../../../assets/BannerImage.png";
const Banner = () => {
  return (
    <section className="hero min-h-screen bg-[#DFE1FB]">
      <div className="hero-content flex-col lg:flex-row-reverse max-w-6xl">
        <img src={bannerImg} className="lg:max-w-2xl max-w-xs" />
        <div>
          <h1 className="lg:text-5xl font-bold">Large educational programs</h1>
          <p className="py-6">
            Today, more than 48,000 people have already studied at our
            university in various fields: programming, photography, marketing
            and management
          </p>
          {/* <button className="btn bg-gradient-to-r from-[#FF0844] to-[#FF8565] text-white btn-lg">
            Get Started
          </button> */}
          <PrimaryBtn name={"Get Started"} btn={"btn-lg"}></PrimaryBtn>
        </div>
      </div>
    </section>
  );
};

export default Banner;
