const Banner = () => {
  return (
    <div className="hero h-screen bg-[#DFE1FB]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://i.ibb.co/HnTRq8J/Banner-Image.png"
          className="max-w-3xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Large educational programs</h1>
          <p className="py-6">
            Today, more than 48,000 people have already studied at our
            university in various fields: programming, photography, marketing
            and management
          </p>
          <button className="btn bg-gradient-to-r from-[#FF0844] to-[#FF8565] text-white btn-lg">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
