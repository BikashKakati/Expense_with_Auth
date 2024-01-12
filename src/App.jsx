import Navbar from "./components/Navbar"
import LogIn from "./pages/LogIn"
import { Routes, Route } from "react-router-dom"
import SignUp from "./pages/SignUp"
import { useDispatch, useSelector } from "react-redux";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import Modal from "./components/Modal";
import { Loader } from "./components/Modal";
import { useEffect } from "react";
import { getStorageData } from "./services/store/slices/authSlice";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const { popUpAlert, currentUser, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStorageData());
  }, [currentUser])
  
  return (
    <div className="max-w-full min-h-dvh bg-base-200 pb-20">
      <Navbar />
      <div className="relative w-full mt-10 p-5">
        {popUpAlert.show && <Modal />}
        {isLoading && <Loader/>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
