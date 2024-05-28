// Imports - libs
import { v4 as uuidv4 } from "uuid";

// Imports - local
import {
  ADD_TODO,
  INIT_STATE,
  REMOVE_TODO,
  TOGGLE_COMPLETED,
  REMOVE_ALL_COMPLETED,
  UPDATE_TODO_WITH_ID,
} from "../actions/types";

// Util method to update the local storage
const updateLocalStorage = (newState) => {
  localStorage.setItem("myTodos", JSON.stringify(newState));
};

// Initial State
const initialState = {
  todos: [],
  allCount: 0,
  activeCount: 0,
  completedCount: 0,
};

// To get the todo count of all, active and completed states
const getTodoCount = (todos) => {
  let activeCount = 0;
  let completedCount = 0;
  todos.forEach((todo) => {
    if (todo.isCompleted) {
      completedCount += 1;
    } else {
      activeCount += 1;
    }
  });
  return {
    allCount: activeCount + completedCount,
    activeCount,
    completedCount,
  };
};

const reducer = (state = initialState, action) => {
  let updatedTodos = {};
  switch (action.type) {
    // To Add a new TODO
    case ADD_TODO:
      const todoAry = [
        ...state.todos,
        { title: action.todo, isCompleted: false, id: uuidv4() },
      ];
      // Update local storage
      updatedTodos = {
        todos: todoAry,
        ...getTodoCount(todoAry),
      };
      updateLocalStorage(updatedTodos);
      return updatedTodos;

    // Initial Todo loading from localStorage
    case INIT_STATE:
      let initState = localStorage.getItem("myTodos");
      let exampleTodo = {
        title: "An Example todo",
        isCompleted: false,
        id: uuidv4(),
      };
      if (!initState) {
        initState = JSON.stringify({
          ...state,
          todos: [exampleTodo],
          ...getTodoCount([exampleTodo]),
        });
      }
      return JSON.parse(initState);

    // To Remove a Todo by ID
    case REMOVE_TODO:
      const newTodos = state.todos.filter((todo) => todo.id !== action.id);
      // Update local storage
      updatedTodos = {
        todos: newTodos,
        ...getTodoCount(newTodos),
      };
      updateLocalStorage(updatedTodos);
      return updatedTodos;

    // Toggle the Completed State of Todo with ID
    case TOGGLE_COMPLETED:
      const upDatedTodosAfterToggle = state.todos.map((todo) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }
        return todo;
      });

      updatedTodos = {
        todos: upDatedTodosAfterToggle,
        ...getTodoCount(upDatedTodosAfterToggle),
      };
      // Update local storage
      updateLocalStorage(updatedTodos);
      return updatedTodos;

    // Removing All Completed
    case REMOVE_ALL_COMPLETED:
      const allActive = state.todos.filter((todo) => !todo.isCompleted);

      updatedTodos = {
        todos: allActive,
        ...getTodoCount(allActive),
      };
      // Update local storage
      updateLocalStorage(updatedTodos);
      return updatedTodos;

    // Updating the todo with ID
    case UPDATE_TODO_WITH_ID:
      const updatedWithId = state.todos.map((todo) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            title: action.value,
          };
        }
        return todo;
      });

      updatedTodos = {
        todos: updatedWithId,
        ...getTodoCount(updatedWithId),
      };
      // Update local storage
      updateLocalStorage(updatedTodos);
      return updatedTodos;
    default:
      return state;
  }
};
export default reducer;
