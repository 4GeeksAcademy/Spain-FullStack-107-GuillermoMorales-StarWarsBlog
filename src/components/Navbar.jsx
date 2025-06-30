import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"; // importa tu hook para acceder al store
import { useState } from "react";

export const Navbar = () => {
  const { store } = useGlobalReducer();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">
            STAR WARS <i className="fa-solid fa-jedi"></i>
          </span>
        </Link>

        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            onClick={toggleDropdown}
            aria-expanded={dropdownOpen}
          >
            Favoritos <i className="fa-solid fa-heart"></i>
          </button>
          <ul
            className={`dropdown-menu${dropdownOpen ? " show" : ""}`}
            style={{ minWidth: "200px" }}
          >
            {store.favorites.length === 0 ? (
              <li className="dropdown-item text-muted">No hay favoritos</li>
            ) : (
              store.favorites.map((fav) => {
                let path = "#";
                if (fav.type === "characters") path = `/character-details/${fav.uid}`;
                else if (fav.type === "planets") path = `/planet-details/${fav.uid}`;
                else if (fav.type === "vehicles") path = `/vehicle-details/${fav.uid}`;
                return (
                  <li key={fav.uid + fav.type}>
                    <Link to={path}>{fav.name}</Link>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
