import {bookReducer} from "./bookReducer";
import { authorReducer } from "./authorReducer";
import { createStore, combineReducers } from "redux";

const defineReducers=()=>{
    return combineReducers({
        book:bookReducer,
        author:authorReducer
    })
};

export default ()=>createStore(defineReducers());