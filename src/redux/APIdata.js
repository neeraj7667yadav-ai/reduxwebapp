import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
const URL= "https://6acb2de6ef37b150407790d7.mockapi.io/user"
export const Api =  createAsyncThunk(
     "user data",
    async()=>{
     const res = await axios.get(URL)
     console.log (res.data)
     return res.data
    },
 );
export const Userread =  createAsyncThunk(
     "user /read",
    async(read)=>{
     const res = await axios.get(`${URL}/${read}`)
     console.log (res.data)
     return res.data
    },
 );
export const Adduser =  createAsyncThunk(
     "add data",
    async(signupdata)=>{
     const res = await axios.post(URL,signupdata)
     console.log (res.data)
     return res.data
    },
 );
export const userdelete =  createAsyncThunk(
     "user/delete",
    async(userid)=>{
     await axios.delete(`${URL}/${userid}`)
     console.log (userid)
     return userid
    },
 );
export const updateuser =  createAsyncThunk(
     "user/update",
    async({id, data})=>{
     const res = await axios.put(`${URL}/${id}`,data)
     console.log ({id,data})
     return res.data

    },
 );