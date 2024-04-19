import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { addLike } from "../../utils/api";
import { toast } from "react-toastify";

const Like = ({id}) => {
  const { validLogin } = useAuth();
  const {user}=useAuth0();
  const token=localStorage.getItem("token");
  const [color, setColor] = useState("white");
  const{mutate}=useMutation({
    mutationFn:()=>addLike(id,token,user?.email),
    onSuccess:()=>handleLikeSuccess()
  })
  const handleLikeSuccess = () => {
    toast.success("You Liked the Property!");
    setColor("error")
  };
  const handleLike=()=>{
    if (validLogin()) {
        mutate();
        setColor((prev)=>prev ==="error"?'white':'error');
    }
  }
  return (
    <>
      <FavoriteIcon size={30} color={color} onClick={handleLike} />
    </>
  );
};

export default Like;
