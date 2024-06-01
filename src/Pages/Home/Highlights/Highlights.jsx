import { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// import ClassCard from "../AllClasses/ClassCard";
import PrimaryBtn from "../../../Components/PrimaryBtn";

const Highlights = () => {
  const [highlights, setHighlights] = useState([]);
  const showHighlights = highlights.slice(0, 6);

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => {
        setHighlights(data);
        console.log(data);
      });
  }, []);

  return (
    <section className="bg-[#FFF1E7] py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="lg:text-4xl text-2xl font-bold text-center">
          Highlights
        </h2>
        <Swiper
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper my-6 bg-[#FFF1E7]"
          breakpoints={{
            // when window width is >= 640px
            100: {
              slidesPerView: 1,
            },
            426: {
              slidesPerView: 2,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 4,
            },
          }}
        >
          {showHighlights.map((highlight) => (
            <SwiperSlide key={highlight._id}>
              <div className="card bg-base-100 hover:shadow-[#EF5743]/50">
                <figure className="">
                  <img src={highlight.banner_image} alt="Shoes" />
                </figure>

                <div className="inline-flex flex-grow card-body">
                  <div className="flex gap-6 items-center">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={highlight.teacher_image} />
                      </div>
                    </div>
                    <p className="text-green-500 text-xs">
                      {highlight.teacher_name}
                    </p>
                    <div className="shadow-lg shadow-[#EF5743] text-[10px] size-10 flex items-center text-center rounded-full text-white font-semibold bg-[#EF5743]">
                      <p>${highlight.price}</p>
                    </div>
                  </div>
                  <h2 className="card-title font-bold">{highlight.title}</h2>
                  <p className="text-xs">
                    {highlight.short_description
                      .split(" ")
                      .slice(0, 12)
                      .join(" ")}
                  </p>

                  <PrimaryBtn
                    name={"Enroll"}
                    customClass={"w-full"}
                  ></PrimaryBtn>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="text-center mt-10">
        <PrimaryBtn link={"/all-classes"} name={"ALL CLASSES"}></PrimaryBtn>
      </div>
    </section>
  );
};

export default Highlights;
