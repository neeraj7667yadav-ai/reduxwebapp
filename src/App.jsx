import AnimatedBackground from "./Component/AnimatedBackground"
import Diwali from "./Component/Diwali"
import Navbar from "./Component/Navbar"  
import { Outlet } from "react-router-dom"
import Fireworks from "./Diwali_special/Fireworks"
import Garland from "./Diwali_special/Garland"
import GiftBox from "./Diwali_special/GiftBox"

function App() {
  return (
    <div className="container">
      <AnimatedBackground/>
      <Fireworks/>
      <Garland/>
      <Diwali/>
      <GiftBox/>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default App
