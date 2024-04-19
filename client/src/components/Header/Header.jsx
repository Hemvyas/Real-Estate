import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "../Profile/Profile";
import AddProperty from "../AddProperty/AddProperty";
import useAuth from "../../hooks/useAuth";
const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { validLogin } = useAuth();
  const handleClick = () => {
    setOpenMenu(!openMenu);
  };
  const handleAddProperty = () => {
    if (validLogin()) {
      setIsModalVisible(true);
    }
  };
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  return (
    <>
      <section className="header">
        <div className="h-container innerWidth paddings flexCenter ">
          <Link to="/">
            <h1>Zenith Zones</h1>
          </Link>
          <div
            className={openMenu ? "menu-mobile flexCenter" : "menu flexCenter"}
          >
            <Link to="/residency">Residencies</Link>
            <a href="mailto:hats1469@gmail.com">Contact</a>
            <div onClick={handleAddProperty}>Add Property</div>
            <AddProperty
              isVisible={isModalVisible}
              setIsVisible={setIsModalVisible}
            />

            {!isAuthenticated ? (
              <button className="btn" onClick={loginWithRedirect}>
                Login
              </button>
            ) : (
              <div>
                <Profile user={user} logout={logout} />
              </div>
            )}
          </div>
          <div className="menu-icon" onClick={handleClick}>
            <BiMenuAltRight size={30} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
