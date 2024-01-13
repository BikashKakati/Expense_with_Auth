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
import PrivateRoute from "./components/PrivateRoute";
import { getExpenseData } from "./services/store/slices/expenseSlice";

function App() {
  const { popUpAlert, currentUser, isLoading, toggleTheme } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStorageData());
    dispatch(getExpenseData());
  }, [currentUser])
  
  return (
    <div className={`max-w-full min-h-dvh pb-20 ${toggleTheme ?"bg-zinc-500" : "bg-base-200"}`}>
      <Navbar />
      <div className="relative w-full mt-10 p-5">
        {popUpAlert.show && <Modal />}
        {isLoading && <Loader/>}
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
