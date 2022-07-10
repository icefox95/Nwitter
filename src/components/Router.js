import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

//<></> : Fragment(많은 요소를 Render하고 싶을 때)

const AppRouter = ({refreshUser, isLoggedIn, userObj}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} /> }
            <Routes>
                {isLoggedIn ? (
                <>
                <Route exact path="/" element={<Home userObj={userObj} />} />
                <Route exact path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />} />
                </> ) : ( 
                <Route exact path="/" element={<Auth />} />
                )}
            </Routes>
        </Router>
    )
}

export default AppRouter;