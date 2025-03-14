import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";
import profilePic from "../assets/profile.png";
import Logo from "../assets/Logo.png";

export const imageForm = [
  {
    name: "image",
    label: "Image Url",
    placeholder: "Upload Image url",
    componentType: "input",
    type: "text",
  },
  {
    name: "textWriteUp",
  },
  {
    name: "imageFile",
    label: "Image File",
    placeholder: "Upload Image file",
    componentType: "input",
    type: "file",
  },
  {
    name: "title",
    label: "Text",
    placeholder: "Enter title / name",
    componentType: "input",
    type: "text",
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter description (optional)",
    componentType: "input",
    type: "text",
  },
];


export const postForm = [
  {
    name: "image",
    label: "Image Url",
    placeholder: "Upload Image url",
    componentType: "input",
    type: "text",
  },
  {
    name: "textWriteUp",
  },
  {
    name: "imageFile",
    label: "Image File",
    placeholder: "Upload Image file",
    componentType: "input",
    type: "file",
  },
  {
    name: "title",
    label: "Text",
    placeholder: "Enter title",
    componentType: "input",
    type: "text",
  },
];


export const images = [
  {
    id: 1,
    img: image1,
  },
  {
    id: 2,
    img: image2,
  },
  {
    id: 3,
    img: image3,
  },
  {
    id: 4,
    img: image4,
  },
  {
    id: 5,
    img: image5,
  },
  {
    id: 6,
    img: image6,
  },
  {
    id: 7,
    img: profilePic,
  },
  {
    id: 8,
    img: Logo,
  },
];
