import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Register from "./Pages/Register"
import Profile from "./Pages/Profile"
import NavBar from "./Components/NavBar"
import NotFound from "./Pages/NotFound"
import Favorites from "./Pages/Favorites"
import Movies from "./Pages/Movies"

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all for unmatched routes */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
