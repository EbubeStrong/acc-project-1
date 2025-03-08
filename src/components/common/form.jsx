"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useRef } from "react";

function FormEditComponent({ formControls, formData, setFormData, onSubmit }) {
  const formRef = useRef({
    title: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Reset form when key changes (component remounts)
  // useEffect(() => {
  //   if (formRef.current) {
  //     formRef.current.reset();
  //   }
  // }, []);

  // function handleSubmit() {
  //   if (onSubmit) {
  //     setFormData("");
  //   }
  // }

  return (
    <form  onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <label htmlFor={controlItem.name}>{controlItem.label}</label>
            <Input
              name={controlItem.name}
              type={controlItem.type}
              placeholder={controlItem.placeholder}
              id={controlItem.name}
              defaultValue="" // Use defaultValue instead of value
              // value={formData[controlItem.name] || setFormData("") || ""}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>

      <Button type="submit" className="mt-6 w-full">
        Save Changes
      </Button>
    </form>
  );
}

export default FormEditComponent;
