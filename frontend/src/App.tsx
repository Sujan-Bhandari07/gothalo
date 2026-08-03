import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Protective from "./components/Protective"
import Public from "./components/Public"
import Authinit from "./components/Authinit"

const App = () => {
  return (

<Routes>

{/* <Route element={<Authinit/>}> */}


  {/* Public routes */}
  <Route element={<Public />}>
    <Route path="/login" element={<Login />} />
  </Route>

  {/* Protected routes */}
  <Route element={<Protective />}>
    <Route path="/" element={<Home />} />
  </Route>
{/* </Route> */}

</Routes>

  )
}

export default App