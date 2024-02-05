import { Link, useLocation } from "react-router-dom";
import Style from "./Navbar.module.css";

function Navbar() {
  const location = useLocation();

  return (
    <nav className={Style.navbar}>
      <ul>
        <li>
          {location.pathname === "/" ? (
            <Link to="/budget">Budget</Link>
          ) : (
            <Link to="/">Calculator</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
