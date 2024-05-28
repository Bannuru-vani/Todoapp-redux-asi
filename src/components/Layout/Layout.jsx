import { Layout } from "antd";
import React from "react";

// import local
import "./layout.css";

const { Content } = Layout;

const AppLayout = ({ children }) => {
  return (
    <div className="layout">
      <Content>{children}</Content>
    </div>
  );
};

export default AppLayout;
