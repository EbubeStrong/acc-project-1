import { images, imageForm, postForm } from "../../config/index";
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

const HeroHeader = ({
  formData,
  setFormData,
  editedFormData,
  setEditedFormData,
  onSubmit,
  handleFileChange,
  resetKey,
  isDialogOpen,
  setIsDialogOpen,
  isPostDialogOpen,
  setIsPostDialogOpen,
  onAddSubmit,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const profilePic = images.find((image) => image.id === 7);

  useEffect(() => {
    if (formData?.imageFile instanceof File) {
      const objectUrl = URL.createObjectURL(formData.imageFile);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (formData?.imageFile && typeof formData.imageFile === 'string') {
      // If imageFile is a base64 string, use it directly
      setImagePreview(formData.imageFile);
    }
  }, [formData?.imageFile]);

  useEffect(() => {
    try {
      const savedFormData = JSON.parse(localStorage.getItem("formData"));
      if (savedFormData) {
        setFormData(savedFormData);
      }
    } catch (error) {
      console.error("Error loading form data in HeroHeader", error);
    }
  }, [setFormData]);

  const imageSrc = 
    formData?.image || 
    formData?.imageFile || 
    imagePreview || 
    profilePic?.img || 
    "/default.png";

  // Submit handler for post
  const handlePostSubmit = () => {
    if (editedFormData) {
      onAddSubmit(editedFormData);
    }
  };

  return (
    <div className="flex flex-col gap-5 md:flex-row lg:flex-row justify-between items-center md:items-end lg:items-end w-full py-4 mb-5 border-b bg-amber-50 z-10">
      <div
        className="flex flex-col items-center md:items-stretch lg:gap-0 gap-3 md:flex-row sm:flex-col lg:flex-row p-0 w-full max-w-[450px]"
        // style={{ border: "2px solid green" }}
      >
        <div className="w-full max-w-[250px]">
          {profilePic && (
            <img
              src={imageSrc}
              alt="profile pic"
              style={{ marginTop: "12px", width: "100%", height: "310px" }}
              className="object-fill"
            />
          )}
        </div>

        <div
          className="flex flex-col  items-center sm:items-start justify-between ml-0 lg:ml-5 p-0 mt-0"
          // style={{ border: "2px solid red" }}
        >
          <div className="flex flex-col items-center justify-center lg:items-start">
            <h1 className="text-[32px] py-0 ">
              {formData?.title || "Bessie Coleman"}
            </h1>
            <p
              className="mt-1 mx-0 text-center md:text-left px-0 w-full"
              // style={{ border: "2px solid green" }}
            >
              {formData?.description || "Civil Aviator"}
            </p>
          </div>

          <div>
            <Button
              className="flex items-end transition-all"
              style={{
                backgroundColor: "transparent",
                boxShadow: "none",
                padding: "0",
                color: isHovered
                  ? "rgba(33, 33, 33, 1)"
                  : "rgba(33, 33, 33, 0.8)",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => {
                setEditedFormData({ ...formData });
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
          className="w-[300px] lg:w-full md:w-full transition-all"
          style={{
            backgroundColor: isButtonHovered
              ? "rgba(33, 33, 33, 0.8)"
              : "rgba(33, 33, 33, 1)",
          }}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          onClick={() => {
            setEditedFormData({ title: "", description: "", image: "" });
            setIsPostDialogOpen(true);
          }}
        >
          + New Post
        </Button>
      </div>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => setIsDialogOpen(open)}
        className="max-w-lg md:max-w-md sm:max-w-sm"
      >
        <DialogContent>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information below.
          </DialogDescription>
          <FormEditComponent
            key={`profile-edit-${resetKey}`}
            formControls={imageForm}
            formData={editedFormData}
            setFormData={setEditedFormData}
            onSubmit={onSubmit}
            onFileChange={handleFileChange}
            buttonText="Save Changes"
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={isPostDialogOpen}
        onOpenChange={(open) => setIsPostDialogOpen(open)}
        className="max-w-lg md:max-w-md sm:max-w-sm"
      >
        <DialogContent>
          <DialogTitle>Add Post</DialogTitle>
          <DialogDescription>Add new post below.</DialogDescription>
          <FormEditComponent
            key={`post-add-${resetKey}`}
            formControls={postForm}
            formData={editedFormData}
            setFormData={setEditedFormData}
            onSubmit={handlePostSubmit}
            onFileChange={handleFileChange}
            buttonText="Add Post"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeroHeader;