import { images, imageForm } from "../../config/index";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import FormEditComponent from "../common/form";


const initialFormData = (() => {
  try {
    return (
      JSON.parse(localStorage.getItem("editedFormData")) || {
        image: null,
        imageFile: null,
        title: "",
        description: "",
      }
    );
  } catch (error) {
    return {
      image: null,
      title: "",
      description: "",
    };
  }
})();

const HeroHeader = () => {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("formData");
    return saved ? JSON.parse(saved) : initialFormData;
  });

  const [editedFormData, setEditedFormData] = useState(formData);
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const profilePic = images.find((image) => image.id === 7);

  // console.log("Resetting form:", editedFormData);

  function onSubmit() {
    setFormData(editedFormData);

    // Store only non-file data in localStorage
    const { imageFile, ...dataToSave } = editedFormData;
    localStorage.setItem("formData", JSON.stringify(dataToSave));

    setIsDialogOpen(false);

    // Reset form fields and force component re-render
    setEditedFormData({
      image: null,
      imageFile: null,
      title: "",
      description: "",
    });

    setResetKey((prevKey) => prevKey + 1);
  }

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0]; // Get the selected file
  //   if (file) {
  //     setEditedFormData((prev) => ({
  //       ...prev,
  //       imageFile: file, // Store actual File object
  //     }));
  //   }
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert file to Base64

      reader.onloadend = () => {
        const base64String = reader.result; // Get Base64 string
        setEditedFormData((prevData) => ({
          ...prevData,
          imageFile: base64String, // Store Base64 in state
          image: base64String, // Use Base64 for preview
        }));

        // Save to localStorage for persistence
        localStorage.setItem(
          "formData",
          JSON.stringify({
            ...editedFormData,
            imageFile: base64String, // Store Base64 in localStorage
          })
        );
      };
    }
  };

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem("formData"));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);

  

  return (
    <div className="flex flex-col gap-5 sm:flex-row lg:flex-row justify-between items-center sm:items-end lg:items-end w-full py-4 border-b">
      <div className="flex flex-col lg:flex-row p-0">
        <div className="max-w-[250px]">
          {profilePic && (
            <img
              src={
                formData.image
                  ? formData.image
                  : formData.imageFile instanceof File
                  ? URL.createObjectURL(formData.imageFile)
                  : profilePic.img
              }
              alt="profile pics"
              style={{ marginTop: "12px", width: "100%", height: "200px" }}
            />
          )}
        </div>

        <div className="flex flex-col items-center lg:items-start justify-between ml-0 lg:ml-5 p-0 mt-0">
          <div className="flex flex-col items-center justify-center lg:items-start">
            <h1 className="text-[32px] py-0">
              {formData.title || "Bessie Coleman"}
            </h1>
            <p className="mt-1">{formData.description || "Civil Aviator"}</p>
          </div>

          <div>
            <Button
              className="flex items-end"
              style={{
                backgroundColor: "transparent",
                boxShadow: "none",
                padding: "0",
                color: isHovered
                  ? "rgba(33, 33, 33, 1)"
                  : "rgba(33, 33, 33, 0.8)",
                transition: "background-color 0.3s ease-in-out",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => {
                setEditedFormData(formData); // Load existing data into form
                setIsDialogOpen(true);
              }}
            >
              <Pencil />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      <div>
        <Button
          className="w-[300px] lg:w-full sm:w-full"
          style={{
            backgroundColor: isButtonHovered
              ? "rgba(33, 33, 33, 0.8)"
              : "rgba(33, 33, 33, 1)",
            transition: "background-color 0.3s ease-in-out",
          }}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          + New Post
        </Button>
      </div>

      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        className="max-w-lg md:max-w-md sm:max-w-sm"
      >
        <DialogContent>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information below.
          </DialogDescription>
          <FormEditComponent
            key={resetKey}
            formControls={imageForm}
            formData={editedFormData}
            setFormData={setEditedFormData}
            onSubmit={onSubmit}
            onFileChange={handleFileChange}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeroHeader;
