import { createSlice } from "@reduxjs/toolkit";
import { Adduser, Api, logout, updateuser, userdelete, Userread } from "./APIdata.js";

const work = createSlice({
    name:"Dashbord",

    initialState:{
        Userdata:[],
        allUserdata:[],
        SearchFilter:"",
        signupdata:
            {
                name:"",
                email:"",
                age:"",
                contact: "",
                address:"",
                image:"",
                isAuthenticate:false,
            }
        
    },
    reducers:{
      addname:(state,action)=>{
        state.signupdata [action.payload.name] = action.payload.value
      },
      resetupdata:(state)=>{

        state.signupdata=   {
                name:"",
                email:"",
                age:"",
                contact: "",
                address:"",
                image:""
            }
      },
      setuserupdate:(state,action)=>{
         state.signupdata = {...action.payload}
      },
      setsearch:(state, action)=>{
        state.SearchFilter= action.payload
      }
    },
    extraReducers:(builder)=>{
        builder 
        .addCase(Api.fulfilled,(state,action)=>{
             state.Userdata = action.payload  // api kaa sara data yaha store hoga
             state.allUserdata= action.payload // backup data yaha store hoga 
        })
        .addCase(Adduser.fulfilled,(state,action)=>{
             state.Userdata.push(action.payload) // api mai data jayega 
             state.allUserdata.push(action.payload) // backup data yaha store hoga 
             state.isAuthenticate=true
        })
        .addCase(userdelete.fulfilled,(state,action)=>{
            state.Userdata = state.Userdata.filter((U)=>U.id !== action.payload)
        })
        .addCase(updateuser.fulfilled,(state,action)=>{
            state.Userdata = state.Userdata.map((U)=>{
              return  U.id === action.payload.id ? action.payload:U
            }) 
        })
        .addCase(Userread.fulfilled,(state,action)=>{
            state.signupdata = {...action.payload}
        })
        .addCase(logout.fulfilled,(state,action)=>{
            state.isAuthenticate= action.payload
        })
        // .addCase(Api.rejected,(state,action)=>{
        // console.log ("error aya", action.error.message)
        // })
    }
})
export const {addname,resetupdata,setuserupdate,setsearch} = work.actions
export default work.reducer