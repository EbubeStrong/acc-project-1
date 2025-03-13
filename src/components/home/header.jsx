import { images } from "../../config/index";

const Header = () => {
  const imageItem = images.find((image) => image.id === 8);
  return (
    <div className="py-4 bg-white">
      {imageItem && <img src={imageItem.img} className="mx-auto" alt="logo" />}
    </div>
  );
};

export default Header;
