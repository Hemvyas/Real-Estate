import {useAuth0} from "@auth0/auth0-react"
import {toast} from "react-toastify"
const useAuth = () => {
    const {isAuthenticated}=useAuth0()
    const validLogin=()=>{
        if(!isAuthenticated)
        {
            console.log("Not Authenticated")
            toast.error("User must login");
            return false;
        }else{
            return true;
        }
    }
  return {validLogin};
}

export default useAuth
