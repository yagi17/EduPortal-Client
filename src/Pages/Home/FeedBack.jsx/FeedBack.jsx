import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const FeedBack = () => {
  const [reviews, setReviews] = useState([]);
  // console.log(reviews);
  useEffect(() => {
    fetch("rating.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  return (
    <section className="max-w-6xl mx-auto my-10">
      <p className="lg:text-4xl font-bold text-center">Check what our Students say about us</p>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper max-w-xl my-8 mx-auto">
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="mx-auto md:w-40 lg:w-72 flex items-center flex-col text-center ">
              <div className="avatar pb-10">
                <div className="w-40 rounded-full">
                  <img src={"user.displayName"} />
                </div>
              </div>
              <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
              />

              <p className="py-8 text-xs">{review.details}</p>
              <h3 className="text-2xl font-semibold text-[#1DA678]">
                {review.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeedBack;
