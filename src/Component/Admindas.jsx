import { useSelector } from "react-redux"
import {  Navigate } from "react-router-dom"


function Admindas({children}) {
    const { isAuthenticate} = useSelector((s)=> s.constructer)
    if(!isAuthenticate){
        return <Navigate to="/home"/>
    }
  return (
    <>
    {children}
    </>
  )
   
}

export default Admindas
