import { useState, useEffect } from "react";
import { images } from "../../config/index";
import { Card } from "../ui/card";
import { Heart } from "lucide-react";

const profileLikee = [
  { text: "Val Thorens" },
  { text: "Restaurant terrace" },
  { text: "An outdoor cafe" },
  { text: "A very long bridge, over the forest..." },
  { text: "Tunnel with morning light" },
  { text: "Mountain house" },
];

function HeroSection({ formData, setFormData }) {
  const [likedImages, setLikedImages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("likedImages")) || {};
    } catch (error) {
      console.error("Error loading liked images", error);
      return {};
    }
  });

  useEffect(() => {
    try {
      const savedData = JSON.parse(localStorage.getItem("addFormData"));
      if (savedData && savedData.posts && (!formData || formData.length === 0)) {
        setFormData(savedData.posts);
      }
    } catch (error) {
      console.error("Error loading saved data in HeroSection", error);
    }
  }, [setFormData, formData]);

  const toggleLike = (id) => {
    setLikedImages((prev) => {
      const updatedLikes = { ...prev, [id]: !prev[id] };
      localStorage.setItem("likedImages", JSON.stringify(updatedLikes));
      return updatedLikes;
    });
  };

  // Ensure formData is always treated as an array
  const formDataArray = Array.isArray(formData) ? formData : [];
  
  // Filter out any empty items
  const validFormData = formDataArray.filter(item => item && item.image);
  
  // Filter out profile pic and logo from images
  const validImages = Array.isArray(images)
    ? images.filter(img => img && img.id !== 7 && img.id !== 8)
    : [];

  return (
    <Card>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pt-4 pb-[50px] 
     h-[100vh] overflow-y-auto"
      >
        {validFormData.map((item, index) => (
          <div key={item.id || `user-${index}`} className="relative w-full">
            <div className="overflow-hidden h-[400px]">
              <img
                src={item.image || "https://via.placeholder.com/400"}
                alt="User uploaded"
                className="w-full h-full transition-transform duration-500 ease-in-out hover:scale-110 hover:shadow-lg object-fill"
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-gray-700 text-sm">{item.title || ""}</span>
              <Heart
                onClick={() => toggleLike(item.id || `user-${index}`)}
                className={`w-6 h-6 transition-all cursor-pointer ${
                  likedImages[item.id || `user-${index}`]
                    ? "fill-red-500 text-red-500"
                    : "text-gray-500"
                }`}
              />
            </div>
          </div>
        ))}

        {validImages.map((image, index) => (
          <div
            key={image.id || `valid-image-${index}`}
            className="relative w-full"
          >
            <div className="overflow-hidden h-[400px]">
              <img
                src={image.img || "https://via.placeholder.com/400"}
                alt="image"
                className="w-full h-full transition-transform duration-500 ease-in-out hover:scale-110 hover:shadow-lg object-cover"
              />
            </div>

            {profileLikee[index] && (
              <div className="flex justify-between mt-2">
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

export default HeroSection