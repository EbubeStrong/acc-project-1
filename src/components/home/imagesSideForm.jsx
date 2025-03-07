import FormEditComponent from "../common/form";
import { imageForm } from "../../config";
import {  useState } from "react";


const initialFormData = {
  name: "",
  image: null,
};

function imagesDisplay() {
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);

  return (
    <>
      <FormEditComponent
        formData={formData}
        setFormData={setFormData}
        imageFile={imageFile}
        setImageFile={setImageFile}
        formControl={imageForm}
      />
    </>
  );
}

export default imagesDisplay;
