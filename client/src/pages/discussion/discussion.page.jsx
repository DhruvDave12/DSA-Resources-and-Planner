import React, { useEffect, useState } from "react";
import "./discussion.style.css";
import CustomSearchBar from "../../components/search-bar/search-bar.component";
import CustomDiscussionCard from "../../components/loading-card/loading-card.component";
import axiosInstance from "../../services/axios_instance";
import CustomButton from "../../components/custom-button/custom-button.component";
import CustomModal from "../../components/custom-modal/custom-modal.component";
import CustomQuestionModal from "../../components/custom-question-modal/custom-question-modal.component";
import { toast } from "react-toastify";
import { Dropdown, Menu, Space } from "antd";
import {
  DownOutlined
} from "@ant-design/icons";
import { options } from "../../components/custom-modal/utils/options.utilities";

import {
  fetchAllQuestions,
  filterQuestions,
} from "./utils/discussion.utlities";

const Discussion = () => {
  const [allQuestions, setAllQuestions] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [openQues, setOpenQues] = useState(false);
  const [confirmLoadingQues, setConfirmLoadingQues] = useState(false);
  const [currQuestion, setCurrQuestion] = useState(null);
  const [question, setQuestion] = useState();
  const [tags, setTags] = useState([]);
  const [answer, setAnswer] = useState();
  const [openQ, setOpenQ] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selected, setSelected] = useState("All");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    fetchAllQuestions({ setLoading, setAllQuestions, setFilteredQuestions });
  }, [pageLoading]);

  const handleSearch = (value) => {
    if (!value) {
      fetchAllQuestions({ setLoading, setAllQuestions, setFilteredQuestions });
    } else {
      filterQuestions({ value, allQuestions, setAllQuestions, setFilteredQuestions });
    }
  };

  const handleAskQuestion = () => {
    setOpenQues(true);
  };

  const showQuestion = (ques) => {
    setCurrQuestion(ques);
    setOpenQ(true);
  };

  const handleSubmitAnswer = async () => {
    setPageLoading(true);
    setConfirmLoading(true);
    const data = {
      answer: answer,
    };
    const questionID = currQuestion._id;

    try {
      const res = await axiosInstance.post(
        `/discussion/create-answer/${questionID}`,
        data
      );
      console.log("SUBMIT ANSWER: ", res);
      if (res.status === 200) {
        toast.success("Answer submitted successfully 🤩");
        setConfirmLoadingQues(false);
        setOpenQ(false);
        setPageLoading(false);
        setAnswer("");
      }
    } catch (err) {
      toast.error("Error submitting answer 😐");
      setConfirmLoading(false);
      setOpenQ(false);
      setPageLoading(false);
    }
  };

  const handleAsynQuestion = async () => {
    setPageLoading(true);
    setConfirmLoadingQues(true);
    const res = await axiosInstance.post("/discussion/create-question", {
      question,
      tags,
    });
    if (res.data.success) {
      setOpenQues(false);
      setConfirmLoadingQues(false);
      setPageLoading(false);
      setQuestion("");
      setTags([]);
    } else {
      toast.error("Something went wrong 😢");
      setConfirmLoadingQues(false);
      setPageLoading(false);
    }
  };

  const handleUpvote = async (answerID) => {
    setPageLoading(true);
    try {
      const res = await axiosInstance.post(
        `/discussion/upvote-answer/${answerID}`
      );
      if (res.status === 200) {
        toast.success("Upvoted successfully 🤩");
        setOpenQ(false);
      }
      setPageLoading(false);
    } catch (err) {
      toast.error("Error upvoting 😐");
      setOpenQ(false);
      setPageLoading(false);
    }
  };

  const handleDownvote = async (answerID) => {
    setPageLoading(true);
    try {
      const res = await axiosInstance.post(
        `/discussion/downvote-answer/${answerID}`
      );
      if (res.status === 200) {
        toast.success("Upvoted successfully 🤩");
        setOpenQ(false);
        setPageLoading(false);
      }
    } catch (err) {
      toast.error("Error upvoting 😐");
      setOpenQ(false);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    // setPageLoading(true);
    console.log("SELECTED: ", selected);
    if (selected === "All") {
      fetchAllQuestions({ setLoading, setAllQuestions,setFilteredQuestions });
    } else {
      filterQuestions({ value: selected, allQuestions, setAllQuestions, setFilteredQuestions });
    }
    // setPageLoading(true);
  }, [selected])

  const newOptions = [{label: "All", value: "All"}, ...options];

  const toShow = filteredQuestions.length > 0 ? filteredQuestions : allQuestions;
  return (
    <div>
      <div className="discussion__header">
        <h1 className="discussion__title">Discuss and Learn 👩‍💻</h1>
        <CustomButton text={"Ask Question"} handleChange={handleAskQuestion} />
      </div>

      <div className="custom__ameneties">
        <div className="inner__wrapper">
          <div style={{width: '80%'}}>
            <CustomSearchBar
              placeholder="Search for a topic"
              handleSearch={handleSearch}
            />
          </div>

      
          <Dropdown
            overlay={<Menu className="menuuuuu" selectable items={newOptions} onChange={e => console.log(e)} onSelect={e => setSelected(newOptions[parseInt(e.key.split('-')[1])].value)}/>}
            trigger={["click"]}
          >
            <a onClick={(e) => {e.preventDefault()}}>
              <Space>
                Filter using tags
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>

      {!pageLoading ? (
        <div className="discussion__grid__wrapper">
          {filterQuestions ? (
            <div className="discussion__grid">
              {filteredQuestions.map((question) => {
                return (
                  <CustomDiscussionCard
                    title={question.question}
                    description={`By ${question.author.username}`}
                    loading={loading}
                    tags={question.tags}
                    onClick={() => showQuestion(question)}
                  />
                );
              })}
            </div>
          ) : (
            <h1 style={{ fontSize: 22, textAlign: "center" }}>
              No Discussion ☹
            </h1>
          )}
        </div>
      ) : (
        <p>LOADING PLEASE WAIT....</p>
      )}

      <CustomModal
        confirmLoading={confirmLoadingQues}
        handleCancel={() => {
          setTags([]);
          setQuestion("");
          setOpenQues(false);
          setConfirmLoadingQues(false);
        }}
        handleOk={handleAsynQuestion}
        open={openQues}
        setQuestion={setQuestion}
        setTags={setTags}
      />

      <CustomQuestionModal
        confirmLoading={confirmLoading}
        handleCancel={() => {
          setAnswer("");
          setOpenQ(false);
          setConfirmLoading(false);
        }}
        handleOk={handleSubmitAnswer}
        open={openQ}
        question={currQuestion}
        setAnswer={setAnswer}
        handleDownvote={handleDownvote}
        handleUpvote={handleUpvote}
      />
    </div>
  );
};

export default Discussion;
