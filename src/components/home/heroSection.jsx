import { useState, useEffect, useRef } from "react";
import { images } from "../../config/index";
import { Card } from "../ui/card";
import { Heart } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
// import { Button } from "../ui/button";

const profileLikee = [
  { text: "Val Thorens" },
  { text: "Restaurant terrace" },
  { text: "An outdoor cafe" },
  { text: "A very long bridge, over the forest..." },
  { text: "Tunnel with morning light" },
  { text: "Mountain house" },
];

function HeroSection() {
  const [animatedIndexes, setAnimatedIndexes] = useState([]);
  const imageRefs = useRef([]);

  // Load liked states from localStorage or default to an empty object
  const [likedImages, setLikedImages] = useState(() => {
    const savedLikes = localStorage.getItem("likedImages");
    return savedLikes ? JSON.parse(savedLikes) : {};
  });

  // Toggle like state and save to localStorage
  const toggleLike = (id) => {
    setLikedImages((prev) => {
      const updatedLikes = { ...prev, [id]: !prev[id] };
      localStorage.setItem("likedImages", JSON.stringify(updatedLikes)); // Save to localStorage
      return updatedLikes;
    });
  };

  // Load likes from localStorage when the component mounts
  useEffect(() => {
    const savedLikes = localStorage.getItem("likedImages");
    if (savedLikes) {
      setLikedImages(JSON.parse(savedLikes));
    }
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1500, easing: "ease-in-out" });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target);
            setAnimatedIndexes((prevIndexes) => [...prevIndexes, index]);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pt-4 pb-[50px]">
        {images
          .filter((image) => image.id !== 7 && image.id !== 8)
          .map((image, index) => (
            <div
              key={image.id}
              ref={(el) => (imageRefs.current[index] = el)}
              className={`relative w-full ${
                animatedIndexes.includes(index) ? "aos-animate" : "opacity-0"
              }`}
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={image.img}
                  alt="image"
                  className="w-full h-full transition-transform duration-500 ease-in-out hover:scale-110 hover:shadow-lg object-cover"
                />
              </div>

              {/* Heart Icon with shadcn Button */}
              {profileLikee[index] && (
                <div className="flex justify-between">
                  <span className="text-gray-700 text-sm">
                    {profileLikee[index].text}
                  </span>

                  <Heart
                    onClick={() => toggleLike(image.id)}
                    className={`w-6 h-6 transition-all cursor-pointer ${
                      likedImages[image.id]
                        ? "fill-red-500 text-red-500"
                        : "text-gray-500"
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </Card>
  );
}

export default HeroSection;
