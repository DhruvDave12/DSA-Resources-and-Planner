import React from "react";
import CustomSearchBar from "../../components/search-bar/search-bar.component";
import {toast} from "react-toastify";
import axiosInstance from "../../services/axios_instance";
import CustomPracticeCard from "../../components/practice-card/practice-card.component";
import "./practice.style.css";

const Practice = () => {
    const [result, setResult] = React.useState();
    const [loading, setLoading] = React.useState(true);

    const handleSearch = async (value) => {
        setLoading(true);
        if(!value){
            setResult(null);
            toast("Please enter a valid search query");
        }
        else {
            const res = await axiosInstance.get(`/practice/get-data?q=${value}`);
            console.log("RES: ", res.data);
            setResult(res.data.result);
        }

        setLoading(false);
    }

    return (
        <div className="practice__page">
            <h1 className="practice__title">Practice Section 📝</h1>
            <div style={{margin: '1rem 0', width: '80%'}}>
                <CustomSearchBar handleSearch={handleSearch} placeholder={"Search anything"} />
            </div>
            {
                !loading ?
                    <div className="practice__grid__wrapper">
                        <div className="practice__grid__inner">
                            {
                                result && result.map((item, index) => (
                                    <CustomPracticeCard item={item} loading={loading} onClick={() => {}}/>
                                ))
                            }
                        </div>
                    </div>
                : null
            }

        </div>
    )
}

export default Practice;