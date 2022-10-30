import axiosInstance from "../../../services/axios_instance";

export const fetchAllQuestions = async ({setLoading, setAllQuestions, setFilteredQuestions}) => {
    setLoading(true);
    // setPageLoading(true);
    const res = await axiosInstance.get("/discussion/get-all-questions");
    console.log(res.data.questions);
    setAllQuestions(res?.data?.questions);
    setFilteredQuestions(res?.data?.questions);
    // setPageLoading(false);
    setLoading(false);
}

export const filterQuestions = async ({value, setAllQuestions, allQuestions, setFilteredQuestions}) => {
    const newQuestions = allQuestions.filter((question) => {
        return (
          question.question.toLowerCase().includes(value.toLowerCase()) ||
          question.tags.includes(value) ||
          question.author.username.toLowerCase().includes(value.toLowerCase())
        );
      });
      // setAllQuestions(newQuestions);
      setFilteredQuestions(newQuestions);
  }

