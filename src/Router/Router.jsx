import App from "../App"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Page/Home";
import Dashbaord from "../Dashbaord/Dashbaord";


const ways = createBrowserRouter([
    {path:"/",element:<App/>,children:[
        {index:true, element:<Home/>},
        {path:"/home", element:<Home/>},
        {path:"/Dashboard", element:<Dashbaord/>},
    ]}
   ])


function Router() {
  return (

    <RouterProvider router={ways}/>
  )
}

export default Router
