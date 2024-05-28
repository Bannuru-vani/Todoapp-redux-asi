import React, { useEffect, useState } from "react";
import { Typography, Flex, Button, Divider, Empty, Badge } from "antd";
import { List } from "antd";
import { useSelector, useDispatch } from "react-redux";

// import local
import ToDoItem from "../Todo";
import "./todolist.css";
import {
  initializeState,
  removeTodo,
  rmAllComp,
  tglCompleted,
  updateTodoWithID,
} from "../../redux/actions/todoActions";

const TodoList = () => {
  const state = useSelector((state) => state);
  // Destructuring the properties from state
  const { todos, allCount, activeCount, completedCount } = state;

  const dispatch = useDispatch();
  // tab state to shoe todos accoding to the status
  const [tab, setTab] = useState("all");

  // Calling the Redux action - initState (to load the todos at component mounting time)
  useEffect(() => {
    dispatch(initializeState());
  }, []);

  // Event Handler for Tab Change
  const onChangeTab = (type) => {
    setTab(type);
  };

  // On checkbox taggle to change the status of todo
  const handleToggle = (id) => {
    dispatch(tglCompleted(id));
  };

  // Delete todo with id
  const handleDelete = (id) => {
    dispatch(removeTodo(id));
  };

  // Update todo with id
  const handleUpdate = (id, newText) => {
    dispatch(updateTodoWithID(newText, id));
  };

  // Clear all completed todos at once
  const clearCompleted = () => {
    dispatch(rmAllComp());
  };

  // To get the todos upon selection of tab default "all"
  const getFilteredTodo = () => {
    switch (tab) {
      case "all":
        return todos;
      case "active":
        return todos.filter((todo) => todo.isCompleted === false);
      case "completed":
        return todos.filter((todo) => todo.isCompleted === true);
      default:
        return todos;
    }
  };

  // Empty list display label
  const getEmptyText = () => {
    switch (tab) {
      case "all":
        return "No Todo's items to show";
      case "active":
        return "No Active items to show";
      case "completed":
        return "No Completed items to show";
      default:
        return todos;
    }
  };
  return (
    <div className="list-wrapper">
      <List
        className="list"
        dataSource={getFilteredTodo(todos)}
        locale={{
          emptyText: <Empty description={getEmptyText()} />,
        }}
        renderItem={(todo) => (
          <ToDoItem
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        )}
      />
      <Divider style={{ margin: 0 }} />
      <Flex align="center" justify="space-between" className="list-footer">
        <p>
          {todos.filter((todo) => todo.isCompleted === false).length} items left
        </p>
        <Flex gap={30}>
          <Badge count={allCount} size="small" color={"#ccc"}>
            <Button
              type="text"
              style={{ color: tab === "all" ? "#4b40ef" : "#aaa" }}
              onClick={() => onChangeTab("all")}
            >
              All
            </Button>
          </Badge>
          <Badge count={activeCount} size="small" color={"#ccc"}>
            <Button
              type="text"
              style={{ color: tab === "active" ? "#4b40ef" : "#aaa" }}
              onClick={() => onChangeTab("active")}
            >
              Active
            </Button>
          </Badge>
          <Badge count={completedCount} size="small" color={"#ccc"}>
            <Button
              type="text"
              style={{ color: tab === "completed" ? "#4b40ef" : "#aaa" }}
              onClick={() => onChangeTab("completed")}
            >
              Completed
            </Button>
          </Badge>
        </Flex>
        <div>
          <Button type="text" onClick={clearCompleted}>
            Clear Completed
          </Button>
        </div>
      </Flex>
    </div>
  );
};

export default TodoList;
