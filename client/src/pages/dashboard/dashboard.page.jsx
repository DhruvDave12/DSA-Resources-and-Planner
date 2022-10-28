import React from "react";
import { AuthContext } from "../../context/auth.context";

const Dashboard = () => {
    const {user} = React.useContext(AuthContext);
    
    console.log("USER: ", user);
    return (
        <div className="dashboard__page">
            {
                user ? 
                <h1 style={{fontSize: 28}}>Welcome, {user.username} 👋</h1>
                : <h1>COULDNT FETCH USER</h1>
            }
            {
                user ?
                <h2 style={{fontSize: 20}}>Score: {user.score}</h2>
                : <h2>COULDNT FETCH SCORE</h2>
            }
        </div>
    )
}

export default Dashboard;