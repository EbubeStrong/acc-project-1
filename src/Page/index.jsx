import { useState, useEffect } from "react";
import HeroHeader from "../components/home/heroHeader";
import HeroSection from "../components/home/heroSection";
import NotFound from "../components/notFound";
import LayoutFormat from "../components/home/layout";
import { Routes, Route } from "react-router-dom";

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
    console.error("Error parsing localStorage data", error);
    return {
      image: null,
      title: "",
      description: "",
    };
  }
})();

const initialAddFormData = (() => {
  try {
    const savedData = JSON.parse(localStorage.getItem("editedAddFormData"));
    return (
      savedData || {
        posts: [],
      }
    );
  } catch (error) {
    return {
      posts: [],
    };
  }
})();

function ImageComponent() {
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem("formData");
      return saved ? JSON.parse(saved) : initialFormData;
    } catch (error) {
      console.error("Error loading form data", error);
      return initialFormData;
    }
  });

  const [editedFormData, setEditedFormData] = useState(formData);
  
  const [addFormData, setAddFormData] = useState(() => {
    try {
      const saved = localStorage.getItem("addFormData");
      return saved ? JSON.parse(saved) : initialAddFormData;
    } catch (error) {
      console.error("Error loading add form data", error);
      return initialAddFormData;
    }
  });

  // const [editedAddFormData, setEditedAddFormData] = useState(addFormData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    // Ensure addFormData always has a posts array
    if (!addFormData.posts) {
      setAddFormData((prevData) => ({
        ...prevData,
        posts: [],
      }));
    }
  }, [addFormData]);

  function handleEditSubmit() {
    setFormData(editedFormData);
    const { imageFile, ...dataToSave } = editedFormData;
    localStorage.setItem("formData", JSON.stringify(dataToSave));
    setIsDialogOpen(false);
    setEditedFormData({
      image: null,
      imageFile: null,
      title: "",
      description: "",
    });
    setResetKey((prevKey) => prevKey + 1);
  }

  function handleAddSubmit(newPostData) {
    setAddFormData((prev) => {
      // Ensure prev has a posts array
      const currentPosts = Array.isArray(prev.posts) ? prev.posts : [];

      // Create a new post with a unique id
      const postWithId = {
        ...newPostData,
        id: `post-${Date.now()}`, // Add a unique ID
      };

      const updatedData = {
        ...prev,
        posts: [...currentPosts, postWithId],
      };

      localStorage.setItem("addFormData", JSON.stringify(updatedData));
      return updatedData;
    });

    setIsPostDialogOpen(false);

    // Reset the edited form data
    setEditedFormData({
      image: null,
      imageFile: null,
      title: "",
      description: "",
    });
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result;
        setEditedFormData((prevData) => {
          const newData = {
            ...prevData,
            imageFile: base64String,
            image: base64String,
          };

          // Don't save to localStorage here, as it could exceed size limits
          // We'll save it when the form is submitted

          return newData;
        });
      };
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutFormat />}>
          <Route
            index
            element={
              <div className="w-full bg-amber-50 ">
                <div className="w-full lg:max-w-[1200px] sm:max-w-[950px] max-w-[550px] mx-auto px-5 sm:px-10">
                  <HeroHeader
                    formData={formData}
                    setFormData={setFormData}
                    editedFormData={editedFormData}
                    setEditedFormData={setEditedFormData}
                    onSubmit={handleEditSubmit}
                    resetKey={resetKey}
                    handleFileChange={handleFileChange}
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                    isPostDialogOpen={isPostDialogOpen}
                    setIsPostDialogOpen={setIsPostDialogOpen}
                    onAddSubmit={handleAddSubmit}
                  />

                  <HeroSection
                    formData={addFormData?.posts || []}
                    setFormData={(posts) => {
                      setAddFormData((prevData) => ({
                        ...prevData,
                        posts,
                      }));
                    }}
                  />
                </div>
              </div>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default ImageComponent;
