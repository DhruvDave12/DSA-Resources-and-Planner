import React from "react";
import { Modal, Input, Select, Typography } from "antd";
import {options} from "./utils/options.utilities";

const { Title } = Typography;

const CustomModal = ({
  open,
  handleOk,
  confirmLoading,
  handleCancel,
  setQuestion,
  setTags,
}) => {
    const handleChange = (value) => {
        console.log("VALUE: ", value);
        setTags(value);
    }

  return (
    <Modal
      title="Ask a question"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Title level={3} style={{textAlign:'center', margin: 0}}>Ask your questions</Title>
      <p style={{textAlign:'center', fontWeight:'300'}}>We will try our best to get you the best community answer</p>
      
      <Input
        placeholder="Enter your question"
        onChange={(e) => setQuestion(e.target.value)}
      />

      <Select
        mode="multiple"
        style={{ width: "100%", margin: '20px 0'}}
        placeholder="Enter tags"
        onChange={handleChange}
        options={options}
      />

    </Modal>
  );
};

export default CustomModal;
