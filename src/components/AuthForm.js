import React, {useState} from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    } from 'firebase/auth';


const AuthForm = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [newAccount,setNewAccount] = useState(true);
    const [error,setError] = useState("");

    const onChange = (event) => {
        const {
            target: {name,value},
        } = event;
        if(name === "email"){
            setEmail(value);
        } else if(name === "password"){
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            const auth = getAuth();
            if (newAccount) {
                data = await createUserWithEmailAndPassword(auth, email, password);
            } else {
                data = await signInWithEmailAndPassword(auth, email, password);
            }
            
            console.log(data);
            } catch (error) {
                setError(error.message);
            }
    };

    const toggleAccount = () => {
        setNewAccount((prev) => !prev);
    };

    return (
        <>
            <form onSubmit={onSubmit} className="container"> 
                <input
                    name="email"
                    type="email" 
                    placeholder="Email" 
                    required 
                    value={email} 
                    onChange={onChange}
                    className="authInput"
                />
                <input
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                    required 
                    value={password}
                    className="authInput"
                    onChange={onChange}
                />
                <input 
                    type="submit" 
                    value={newAccount ? "Create Account" : "Log In"} 
                />
                {error && <span className="authError">{error}</span>}
                </form>
                <span onClick={toggleAccount} className="authSwitch">
                    {newAccount ? "Sign in" : "Create Account"}
                </span>
            </>
    );
}

export default AuthForm;
