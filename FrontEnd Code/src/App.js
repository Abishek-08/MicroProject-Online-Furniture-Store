import "./App.css";
import AdminSignUp from "./Component/Admin/AdminSignUp";
import { ShopContextProvider } from "./Component/Shop/ContextFile";
import Navbar from "./Component/Navbar/Navbar";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ShopContextProvider>
          <Navbar />
        </ShopContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
