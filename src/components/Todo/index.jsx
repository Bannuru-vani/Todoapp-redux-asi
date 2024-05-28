import React, { useState } from "react";
import { List, Checkbox, Button, Input } from "antd";
import { CloseOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";

// Import local
import "./todo.css";

const ToDoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  // Toggle state between edit state and view state
  const [isEditing, setIsEditing] = useState(false);

  // value of text from props
  const [newText, setNewText] = useState(todo.title);

  // Start editing of a todo
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Save after edit complete
  const handleSave = () => {
    onUpdate(todo.id, newText);
    setIsEditing(false);
  };

  return (
    <List.Item
      className="list-item"
      actions={[
        isEditing ? (
          <Button type="text" icon={<CheckOutlined />} onClick={handleSave} />
        ) : (
          <Button type="text" icon={<EditOutlined />} onClick={handleEdit} />
        ),
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() => onDelete(todo.id)}
          disabled={isEditing}
        />,
      ]}
    >
      <Checkbox checked={todo.isCompleted} onChange={() => onToggle(todo.id)}>
        {isEditing ? (
          <Input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onPressEnter={handleSave}
          />
        ) : (
          todo.title
        )}
      </Checkbox>
    </List.Item>
  );
};

export default ToDoItem;
