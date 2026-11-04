import Structuredash from "./Structuredash"
import {Api} from "../redux/APIdata.js"
import { useDispatch, } from "react-redux";
import { useEffect } from "react";
function Dashbaord() {
 const dispatch = useDispatch()
useEffect(()=>{
   dispatch(Api());
},[dispatch])
  return (
    <>
      <Structuredash/>
    </>
  )
}

export default Dashbaord
