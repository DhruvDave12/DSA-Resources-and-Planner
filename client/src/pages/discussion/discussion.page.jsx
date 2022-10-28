import React, { useEffect, useState } from "react";
import "./discussion.style.css";
import CustomSearchBar from "../../components/search-bar/search-bar.component";
import CustomDiscussionCard from "../../components/loading-card/loading-card.component";
import axiosInstance from "../../services/axios_instance";
import CustomButton from "../../components/custom-button/custom-button.component";
import CustomModal from "../../components/custom-modal/custom-modal.component";
import CustomQuestionModal from "../../components/custom-question-modal/custom-question-modal.component";
import { toast } from "react-toastify";

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

  useEffect(() => {
    fetchAllQuestions({ setLoading, setAllQuestions });
  }, []);

  const handleSearch = (value) => {
    if (!value) {
      fetchAllQuestions({ setLoading, setAllQuestions });
    } else {
      filterQuestions({ value, allQuestions, setAllQuestions });
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
      }
    } catch (err) {
      toast.error("Error submitting answer 😐");
      setConfirmLoading(false);
      setOpenQ(false);
    }
  };

  const handleAsynQuestion = async () => {
    setConfirmLoadingQues(true);
    const res = await axiosInstance.post("/discussion/create-question", {
      question,
      tags,
    });
    if (res.data.success) {
      setOpenQues(false);
      setConfirmLoadingQues(false);
      window.location.reload(false);
    } else {
      toast.error("Something went wrong 😢");
      setConfirmLoadingQues(false);
    }
  };

  const handleUpvote = async (answerID) => {
    try {
      const res = await axiosInstance.post(
        `/discussion/upvote-answer/${answerID}`
      );
      if (res.status === 200) {
        toast.success("Upvoted successfully 🤩");
        setOpenQ(false);
      }
    } catch (err) {
      toast.error("Error upvoting 😐");
      setOpenQ(false);
    }
  };

  const handleDownvote = async (answerID) => {
    try {
      const res = await axiosInstance.post(
        `/discussion/downvote-answer/${answerID}`
      );
      if (res.status === 200) {
        toast.success("Upvoted successfully 🤩");
        setOpenQ(false);
      }
    } catch (err) {
      toast.error("Error upvoting 😐");
      setOpenQ(false);
    }
  };

  return (
    <div>
      <div className="discussion__header">
        <h1 className="discussion__title">Discuss and Learn 👩‍💻</h1>
        <CustomButton text={"Ask Question"} handleChange={handleAskQuestion} />
      </div>

      <div className="custom__ameneties">
        <div className="inner__wrapper">
          <CustomSearchBar
            placeholder="Search for a topic"
            handleSearch={handleSearch}
          />
        </div>
      </div>

      <div className="discussion__grid__wrapper">
        {allQuestions ? (
          <div className="discussion__grid">
            {allQuestions.map((question) => {
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
          <h1 style={{ fontSize: 22, textAlign: "center" }}>No Discussion ☹</h1>
        )}
      </div>

      <CustomModal
        confirmLoading={confirmLoadingQues}
        handleCancel={() => {setTags([]); setQuestion(""); setOpenQues(false); setConfirmLoadingQues(false)}}
        handleOk={handleAsynQuestion}
        open={openQues}
        setQuestion={setQuestion}
        setTags={setTags}
      />

      <CustomQuestionModal
        confirmLoading={confirmLoading}
        handleCancel={() => {setAnswer(""); setOpenQ(false); setConfirmLoading(false);}}
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
