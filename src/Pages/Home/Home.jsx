import Banner from "./Banner/Banner";
import FeedBack from "./FeedBack.jsx/FeedBack";
import Highlights from "./Highlights/Highlights";
import InstructorSection from "./InstructorSection/InstructorSection";
import Partners from "./Partners/Partners";
import Stats from "./Stats/Stats";

const Home = () => {
  return (
    <div className="">
      <Banner></Banner>
      <Partners></Partners>
      <Highlights></Highlights>
      <Stats></Stats>
      <FeedBack></FeedBack>
      <InstructorSection></InstructorSection>
    </div>
  );
};

export default Home;
