
import { BrowserRouter,Routes, Route } from "react-router-dom"
import Login from "./Components/Login"
import Body from "./Components/Body"
import Profile from "./Components/Profile"
function App() {
  

  return (
    <>
     <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>
     </BrowserRouter>
      
    </>
  )
}

export default App
  