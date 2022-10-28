import React from "react";
import { Typography, Button, Divider} from "antd";
import {
    UpCircleOutlined,
    DownCircleOutlined
} from "@ant-design/icons";
const { Title } = Typography;


const Answer = ({ handleUpvote, handleDownvote, answer, author }) => {
    
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column"}}>
        
      <Title level={5} style={{fontWeight: '300'}}>{answer.answer}</Title>
      {/* <Title level={5}>{author}</Title> */}
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={() => handleUpvote(answer._id)} style={{ width: "40%", display:'flex', columnGap: '5px', justifyContent:'space-evenly'}}>
          <UpCircleOutlined style={{marginTop: 4}}/>
          <p>{answer?.upvotes?.length}</p>
        </Button>
        <Button onClick={() => handleDownvote(answer._id)} style={{ width: "40%", display:'flex', columnGap: '5px', justifyContent:'space-evenly'}}>
          <DownCircleOutlined style={{marginTop: 4}}/>
          <p>{answer?.downvotes?.length}</p>
        </Button>
      </div>
        <Divider />
    </div>
  );
};

export default Answer;