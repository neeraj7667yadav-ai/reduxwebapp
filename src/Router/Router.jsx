import App from "../App"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Page/Home";
import Dashbaord from "../Dashbaord/Dashbaord";
import Admindas from "../Component/Admindas";
import JobDetails from "../Component/Roledetail";


const ways = createBrowserRouter([
    {path:"/",element:<App/>,children:[
        {index:true, element:<Home/>},
        {path:"/home", element:<Home/>},
        {path:"/Roledetail/:id", element:<JobDetails/>},
        {path:"/Dashboard", element:<Admindas><Dashbaord/>
        </Admindas>},
    ]}
   ])


function Router() {
  return (

    <RouterProvider router={ways}/>
  )
}

export default Router
