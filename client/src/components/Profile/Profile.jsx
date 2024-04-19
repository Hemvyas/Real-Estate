import React, { useState } from 'react'
import "./Profile.css"
import { Link } from 'react-router-dom';
const Profile = ({user,logout}) => {
  const [show,setShow]=useState(false);
  const handleClick=()=>{
    setShow(!show)
  }
  return (
    <>
      <div className="profileImg">
        <img src={user?.picture} alt="profile" onClick={handleClick} />
      </div>
      <div className={`menu-item flexColStart ${show ? "show" : ""}`}>
        <Link to="/favorites">
          <span>Favourites</span>
        </Link>
        <Link to="/bookings">
          <span>Bookings</span>
        </Link>
        <span
          onClick={() => {
            localStorage.clear();
            logout();
          }}
        >
          Logout
        </span>
      </div>
    </>
  );
}

export default Profile
