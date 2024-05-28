import {
  ADD_TODO,
  INIT_STATE,
  REMOVE_TODO,
  TOGGLE_COMPLETED,
  REMOVE_ALL_COMPLETED,
  UPDATE_TODO_WITH_ID,
} from "./types";

// action to add a new todo
export const addTodo = (todo) => {
  return {
    type: ADD_TODO,
    todo: todo,
  };
};

// action to intialize the state with local storage at the start
export const initializeState = () => {
  return {
    type: INIT_STATE,
  };
};

// action to remove the todo
export const removeTodo = (id) => {
  return {
    type: REMOVE_TODO,
    id,
  };
};

// action to make todo complete by id
export const tglCompleted = (id) => {
  return {
    type: TOGGLE_COMPLETED,
    id,
  };
};

// action to remove all Completed
export const rmAllComp = () => {
  return {
    type: REMOVE_ALL_COMPLETED,
  };
};

// action to update a todo with ID
export const updateTodoWithID = (value, id) => {
  return {
    type: UPDATE_TODO_WITH_ID,
    value,
    id,
  };
};
