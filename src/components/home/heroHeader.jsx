import { images } from "../../config/index";
import { Button } from "../ui/button";


const HeroHeader = () => {
      const profilePic = images.find((image) => image.id === 7);
    
    return (
      <div className="flex flex-col gap-5 sm:flex-row lg:flex-row justify-between items-center sm:items-end  lg:items-end w-full py-4 border-b">
        <div className="">
          {profilePic && <img src={profilePic.img} alt="profile pics" />}
        </div>

        <div>
          <Button className="w-[300px] lg:w-full sm:w-full">+ New Post</Button>
        </div>
      </div>
    );
};

export default HeroHeader;
