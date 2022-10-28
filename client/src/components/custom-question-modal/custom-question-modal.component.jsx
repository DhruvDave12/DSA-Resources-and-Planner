import React from "react";
import { Modal, Typography, Input, Divider} from "antd";
import Answer from "../answer-modal/answer.component";
import "./custom-question-modal.style.css";
const { Title } = Typography;
const { TextArea } = Input;

const CustomQuestionModal = ({
  open,
  handleOk,
  confirmLoading,
  handleCancel,
  question,
  handleUpvote,
  handleDownvote,
  setAnswer,
}) => {
if(!question) return;
console.log("QUES: ", question);
  const title = `#${question?._id.slice(5, 20).toUpperCase()}`;
  return (
    <Modal
      title={title}
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText={"Submit Answer"}
    >
      <Title level={4} style={{ textAlign: "center", margin: 0 }}>
        {question.question}
      </Title>
      <Divider />

      <div className="answer__wrapper">
        {question.answer.map((answer) => {
          return (
            <Answer
              handleUpvote={handleUpvote}
              handleDownvote={handleDownvote}
              answer={answer}
              author={answer.author}
            />
          );
        })}
      </div>

      <div className="own__answer">
        <TextArea
          rows={4}
          placeholder={"Type your answer here ..."}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default CustomQuestionModal;
