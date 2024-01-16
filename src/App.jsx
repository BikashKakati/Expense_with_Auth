import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Modal, { Loader } from "./components/Modal";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home/Home";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile/Profile";
import ResetPassword from "./pages/ResetPassword";
import SignUp from "./pages/SignUp";
import { getStorageData } from "./services/store/api/authThunk";
import { getExpenseData } from "./services/store/api/expenseThunk";


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
