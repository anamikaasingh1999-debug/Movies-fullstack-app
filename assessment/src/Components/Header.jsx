import { PlusIcon, LogoutIcon } from "./Icons";
import "./Header.css";
import { useNavigate } from "react-router-dom";
export default function Header({ onAdd }) {
  const navigate = useNavigate();
   const  handleLogout  = () => {
      localStorage.removeItem("formData");
      navigate("/signin");
    } 
      
  return (

   
    <header className="header">
      <div className="header-left">
        <h1>My movies</h1>
        <button onClick={navigate.bind(null, "/createmovie")} className="add-movie-button">
          <PlusIcon />
        </button>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout <LogoutIcon />
      </button>
    </header>
  );
}
