import React from "react";
import { Spin, Space } from "antd";

class loader extends React.Component {
  render() {
    return (
      (
        <Space size="middle">
          <Spin size="large" />
        </Space>
      ),
      mountNode
    );
  }
}
export default loader;
