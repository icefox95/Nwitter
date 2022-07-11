import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "fbase";
import { updateProfile } from "@firebase/auth";

const Profile = ({ refreshUser, userObj }) => { 
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    }

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(authService.currentUser, { displayName: newDisplayName });
            refreshUser();
        }
    }

    return (
    <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
            <input 
                onChange={onChange}
                type="text"
                autoFocus
                placeholder="Display Name" 
                value={newDisplayName}
                className="formInput"
            />
            <input
                type="submit"
                value="Update Profile"
                className="formBtn"
                style={{
                    marginTop: 10,
                }}
            />
        </form>
        <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
            Log Out
        </span>
    </div>
    );
}

export default Profile;