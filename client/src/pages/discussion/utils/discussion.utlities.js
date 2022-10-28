import axiosInstance from "../../../services/axios_instance";

export const fetchAllQuestions = async ({setLoading, setAllQuestions}) => {
    setLoading(true);
    const res = await axiosInstance.get("/discussion/get-all-questions");
    console.log(res.data.questions);
    setAllQuestions(res?.data?.questions);
    setLoading(false);
}

export const filterQuestions = async ({value, setAllQuestions, allQuestions}) => {
    const newQuestions = allQuestions.filter((question) => {
        return (
          question.question.toLowerCase().includes(value.toLowerCase()) ||
          question.tags.includes(value.toLowerCase()) ||
          question.author.username.toLowerCase().includes(value.toLowerCase())
        );
      });
      setAllQuestions(newQuestions);
}

