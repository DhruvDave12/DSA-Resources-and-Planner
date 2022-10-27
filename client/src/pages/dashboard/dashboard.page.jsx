import React from "react";
import { AuthContext } from "../../context/auth.context";

const Dashboard = () => {
    const {user} = React.useContext(AuthContext);
    return (
        <div className="dashboard__page">
            {
                user ? 
                <h1 style={{fontSize: 28}}>Welcome, {user.username} 👋</h1>
                : <h1>COULDNT FETCH USER</h1>
            }
        </div>
    )
}

export default Dashboard;