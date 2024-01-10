import Navbar from "./components/Navbar"
import LogIn from "./pages/LogIn"
import { Routes, Route } from "react-router-dom"
import SignUp from "./pages/SignUp"
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";

function App() {
  const {currentUser} = useSelector((state) => state.auth);
  // console.log(currentUser);
  return (
    <div className="max-w-full min-h-dvh bg-base-200">
      <Navbar />
      <div className="relative w-full mt-10">
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
