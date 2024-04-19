import React from 'react'
import LocationOnIcon from "@mui/icons-material/LocationOn";
const Search = ({onSearch}) => {
  return (
    <>
      <div className="search flexCenter">
        <LocationOnIcon style={{ color: "#4066ff", fontSize: "27" }} />
        <input type="text" onChange={(e)=>onSearch(e.target.value)} placeholder='Search by property name/location'/>
        <button className="btn">Search</button>
      </div>
    </>
  );
}

export default Search