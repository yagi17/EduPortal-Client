import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const FeedBack = () => {
  const [reviews, setReviews] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/reviews").then((res) => {
      setReviews(res.data);
      // console.log(res.data);
    });
  }, [axiosPublic]);
  return (
    <section className=" py-32 bg-gradient-to-r from-[#530E9F] to-[#2574FA] text-white">
      <div className="max-w-6xl mx-auto  my-10">
        {/* <p className="lg:text-4xl font-bold text-center">
          Check what our Students say about us
        </p> */}
        <Swiper
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation]}
          className="mySwiper max-w-3xl my-8 mx-auto"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="mx-auto md:w-52 lg:w-11/12 flex items-center flex-col text-center ">
                <p className="py-8 text-xl flex italic ">
                  <span className="justify-start  text-sm">
                    <FaQuoteLeft />
                  </span>
                  {review.details}{" "}
                  <span className="justify-end">
                    <FaQuoteRight />
                  </span>
                </p>

                <div className="avatar pb-10">
                  <div className="w-20 rounded-full">
                    <img src={"userName"} />
                  </div>
                </div>
                <h3 className="text-sm font-semibold mb-4">
                  {review.name}
                </h3>
                <Rating
                  style={{ maxWidth: 120 }}
                  value={review.rating}
                  readOnly
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeedBack;
