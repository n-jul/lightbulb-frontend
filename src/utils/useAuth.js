import { login, logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
const useAuth = () =>{
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout())
  };

  const handleLogin = () =>{
    dispatch(login())
  }
  return {handleLogin, handleLogout}
}


export default useAuth