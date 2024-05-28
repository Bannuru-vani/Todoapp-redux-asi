import React, { useState } from "react";
import { Button, Input } from "antd";
import { useDispatch } from "react-redux";

// import local
import "./todoinput.css";
import { addTodo } from "../../redux/actions/todoActions";

const TodoInput = () => {
  const dispatch = useDispatch();
  // Todo Title state
  const [title, setTitle] = useState("");

  // On submit / Click of Create button / Enter button click dispatch the action with new todo text
  const onSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTodo(title));
      setTitle("");
    }
  };

  return (
    <div className="input-wrapper">
      <form onSubmit={onSubmit}>
        <Input
          size="large"
          placeholder="Start Typing.."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <Button type="submit" onClick={onSubmit}>
          Create
        </Button>
      </form>
    </div>
  );
};

export default TodoInput;
