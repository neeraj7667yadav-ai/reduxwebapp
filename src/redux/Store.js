import { configureStore } from "@reduxjs/toolkit";
import work from './Conterslice.js';


const store = configureStore(
    {
        reducer:{
            constructer: work
        }
    }
)
export default store