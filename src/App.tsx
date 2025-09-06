import { Outlet } from "react-router-dom";
import NavBar from "./components/ui/NavBar";
import Footer from "./components/ui/Footer";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
