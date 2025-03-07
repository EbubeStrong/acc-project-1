import { BrowserRouter } from "react-router-dom";
// import { Toaster } from "./components/ui/toaster.jsx";
import ImageComponent from "./Page";

export default function App() {
  return (
    <BrowserRouter>
      <ImageComponent />
      {/* <Toaster /> */}
    </BrowserRouter>
  );
}
