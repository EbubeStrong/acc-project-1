import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
// import { useRef } from "react";

function FormEditComponent({
  formControls = [],
  formData,
  setFormData,
  onSubmit
}) {
  const renderInputsByComponentType = (getControlItem) => {
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        return (
          <Input
            name={getControlItem.name}
            type={getControlItem.type}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );

      case "textarea":
        return (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );

      default:
        return (
          <Input
            name={getControlItem.name}
            type={getControlItem.type}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
          />
        );
    }
  };

  // const formRef = useRef();


  return (
    <form
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-3">
        {Array.isArray(formControls) &&
          formControls.map((controlItem) => (
            <div className="grid w-full gap-1.5" key={controlItem.name}>
              <label htmlFor={controlItem.name}>{controlItem.label}</label>
              {renderInputsByComponentType(controlItem)}
            </div>
          ))}
      </div>

      <Button type="submit" className="mt-6 w-full">
        Edit
      </Button>
    </form>
  );
}

export default FormEditComponent;
