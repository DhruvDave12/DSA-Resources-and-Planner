import React from "react";
import "./practice-card.style.css";
import { Card, Skeleton, Divider, Image, Typography } from "antd";
const { Title } = Typography;

const CustomPracticeCard = ({ item, loading, onClick }) => {
  return (
    <a href={`https://youtu.be/${item?.id?.videoId}`} className="custom__card" onClick={onClick}>
      <Card style={{ width: "100%" }}>
        <Skeleton loading={loading} avatar active>
          <Image
            preview={false}
            width={'100%'}
            src={item?.snippet?.thumbnails?.high?.url}
            placeholder={
              <Image
                preview={false}
                src={item?.snippet?.thumbnails?.high?.url}
                width={'100%'}
              />
            }
          />
          <Divider />
          <Title level={5}>{`${item?.snippet?.title?.slice(0, 30)}...`}</Title>
        </Skeleton>
      </Card>
    </a>
  );
};

export default CustomPracticeCard;
