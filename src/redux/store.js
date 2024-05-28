import { createStore } from "redux";
import todo from "./reducer/todoReducer"
export const store = createStore(todo);