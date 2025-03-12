import HeroHeader from "../components/home/heroHeader";
import HeroSection from "../components/home/heroSection";
import NotFound from "../components/notFound";
import LayoutFormat from "../components/home/layout";
import { Routes, Route } from "react-router-dom";

function ImageComponent() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutFormat />}>
          <Route
            index
            element={
              
              <div className="w-full bg-amber-50 ">
              <div className="w-full lg:max-w-[1200px] sm:max-w-[950px] max-w-[550px] mx-auto px-5 sm:px-10">
                <HeroHeader />
                <HeroSection />
              </div>
              </div>  
            }
            R
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default ImageComponent;
