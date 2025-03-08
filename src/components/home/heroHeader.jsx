"use client";

import { images, imageForm } from "../../config/index";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import FormEditComponent from "../common/form";

const initialFormData = {
  title: "",
  description: "",
  image: null,
};

const HeroHeader = () => {
  // Load saved data from localStorage on initial render
  const [useCase, setUseCase] = useState(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("profileData");
      return savedData ? JSON.parse(savedData) : initialFormData;
    }
    return initialFormData;
  });

  const [formData, setFormData] = useState(initialFormData);
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formKey, setFormKey] = useState(0); // Add a key state to force re-render

  const profilePic = images.find((image) => image.id === 7);

  // Save to localStorage whenever useCase changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("profileData", JSON.stringify(useCase));
    }
  }, [useCase]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!isDialogOpen) {
      setFormData(initialFormData);
    }
  }, [isDialogOpen]);

  function onSubmit(e) {
    e.preventDefault();
    setUseCase(formData); // Update profile data only when submitted
    setIsDialogOpen(false); // Close dialog
    // Reset form immediately
    setFormData(initialFormData);
    setFormKey((prev) => prev + 1); // Increment key to force re-render
  }

  function openEditDialog() {
    setFormData({ ...useCase }); // Load useCase data into form when opening (create a new object)
    setFormKey((prev) => prev + 1); // Force re-render when opening
    setIsDialogOpen(true);
  }

  function handleDialogChange(open) {
    if (open === false) {
      // When closing the dialog, reset the form completely
      setFormData(initialFormData);
      setFormKey((prev) => prev + 1);
    }
    setIsDialogOpen(open);
  }

  return (
    <div className="flex flex-col gap-5 sm:flex-row lg:flex-row justify-between items-center sm:items-end lg:items-end w-full py-4 border-b">
      <div className="flex flex-col lg:flex-row p-0">
        <div className="max-w-[250px]">
          {profilePic && (
            <img
              src={useCase.image || profilePic.img}
              alt="profile pics"
              style={{ marginTop: "12px", width: "100%", height: "200px" }}
            />
          )}
        </div>

        <div className="flex flex-col items-center lg:items-start justify-between ml-0 lg:ml-5 p-0 mt-0">
          <div className="flex flex-col items-center justify-center lg:items-start">
            <h1 className="text-[32px] py-0">
              {useCase.title || "Bessie Coleman"}
            </h1>
            <p className="mt-1">{useCase.description || "Civil Aviator"}</p>
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
              onClick={openEditDialog}
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

      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information below.
          </DialogDescription>
          <FormEditComponent
            key={formKey} // Use numeric key to force re-render
            formControls={imageForm}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeroHeader;
