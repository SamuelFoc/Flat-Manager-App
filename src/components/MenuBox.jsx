import React from "react";
import "./styles/MenuBox.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faFireFlameSimple } from "@fortawesome/free-solid-svg-icons";
import { faBellConcierge } from "@fortawesome/free-solid-svg-icons";

function MenuBox() {
  return (
    <div className="menuBox mt-5 py-5">
      <Link to="/users" className="menuItem mx-3 mt-4 text-center">
        <FontAwesomeIcon
          icon={faUsers}
          className="menuItemIcon display-5 mt-5"
        />
        <h6 className="menuItemTitle">My Roommates</h6>
      </Link>
      <Link to="/shoppingList" className="menuItem mx-3 mb-4 text-center">
        <FontAwesomeIcon
          icon={faCartShopping}
          className="menuItemIcon display-5 mt-5"
        />
        <h6 className="menuItemTitle">Shopping List</h6>
      </Link>
      <Link to="/responsibilities" className="menuItem mx-3 mt-4 text-center">
        <FontAwesomeIcon
          icon={faBriefcase}
          className="menuItemIcon display-5 mt-5"
        />
        <h6 className="menuItemTitle">My Responsibilities</h6>
      </Link>
      <Link to="/events" className="menuItem mx-3 mb-4 text-center">
        <FontAwesomeIcon
          icon={faCalendarDays}
          className="menuItemIcon display-5 mt-5"
        />
        <h6 className="menuItemTitle">Events</h6>
      </Link>
      <Link to="/energies" className="menuItem mx-3 mt-4 text-center">
        <FontAwesomeIcon
          icon={faFireFlameSimple}
          className="menuItemIcon display-5 mt-5"
        />
        <h6 className="menuItemTitle">Energies</h6>
      </Link>
      <Link to="/services" className="menuItem mx-3 mb-4 text-center">
        <FontAwesomeIcon
          icon={faBellConcierge}
          className="menuItemIcon display-5 mt-5"
        />
        <h6 className="menuItemTitle">Services</h6>
      </Link>
    </div>
  );
}

export default MenuBox;
