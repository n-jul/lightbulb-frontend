import { setUserData,clearUserData } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { persistor } from "../store/index";
const useAuth = () =>{
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearUserData())
    persistor.purge()
  };

  const handleLogin = () =>{
    dispatch(setUserData())
  }
  return {handleLogin, handleLogout}
}


export default useAuth