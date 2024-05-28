import React from "react";
import { Typography } from "antd";

// Import local
import "./header.css";

const { Title } = Typography;

const Header = () => {
  return (
    <div className="header">
      <Title level={3}>Todo</Title>
    </div>
  );
};

export default Header;
