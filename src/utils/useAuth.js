import { setUserData,clearUserData } from "../store/authSlice";
import { useDispatch } from "react-redux";
const useAuth = () =>{
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearUserData())
  };

  const handleLogin = () =>{
    dispatch(setUserData())
  }
  return {handleLogin, handleLogout}
}


export default useAuth