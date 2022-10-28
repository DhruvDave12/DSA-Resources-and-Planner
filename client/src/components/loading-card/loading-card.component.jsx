import React from "react";
import "./loading-card.styles.css";
import { Card, Skeleton, Tag, Divider} from "antd";
const { Meta } = Card;

const CustomDiscussionCard = ({ title, description, loading, tags, onClick}) => {
  return (
    <div className="custom__card" onClick={onClick}>
      <Card style={{ width: "100%" }}>
        <Skeleton loading={loading} avatar active>
          <Meta title={title} description={description} />
          <Divider />
          <div className="tags__grid">
            {tags.map((tag) => {
              return <Tag color="geekblue">{tag}</Tag>;
            })}
          </div>
        </Skeleton>
      </Card>
    </div>
  );
};

export default CustomDiscussionCard;
