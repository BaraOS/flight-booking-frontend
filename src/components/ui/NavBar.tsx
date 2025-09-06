import { useNavigate } from "react-router-dom";
import CurrencySelector from "./CurrencySelector";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex h-[50px] w-full justify-center bg-primary">
      <div className="flex w-[1200px] items-center justify-between px-2 py-1">
        <h1 className="text-lg font-bold text-white" onClick={() => navigate("/")}>
          Flight Search App
        </h1>
        <div>
          <CurrencySelector />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
