import { images } from "../../config/index";
import { Button } from "../ui/button";


const HeroHeader = () => {
      const profilePic = images.find((image) => image.id === 7);
    
    return (
      <div className="flex justify-between items-end w-full py-4 border-b">
        <div className="">
          {profilePic && <img src={profilePic.img} alt="profile pics" />}
        </div>

        <div>
          <Button>+ New Post</Button>
        </div>
      </div>
    );
};

export default HeroHeader;
