import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function FormEditComponent({
  formControls = [],
  formData,
  setFormData,
  onSubmit,
  onFileChange,
  buttonText,
}) {
  const renderInputsByComponentType = (getControlItem) => {
    const value =
      formData && formData[getControlItem.name]
        ? formData[getControlItem.name]
        : "";

    switch (getControlItem.componentType) {
      case "input":
        return (
          <Input
            name={getControlItem.name}
            type={getControlItem.type}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            // value={getControlItem.type !== "file" ? value : ""}
            onChange={(e) => {
              if (getControlItem.type === "file") {
                onFileChange(e); // Call the file change handler
              } else {
                setFormData({
                  ...formData,
                  [getControlItem.name]: e.target.value,
                });
              }
            }}
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
        return <h1>Or Enter By Form File Below 👇</h1>;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Call the provided submit function
    onSubmit(formData);

    // Note: Don't reset the form data here, as it's handled in the parent component
  };

  return (
    <form onSubmit={handleSubmit}>
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
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default FormEditComponent;
