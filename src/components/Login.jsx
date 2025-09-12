import { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try{
            const res = await axios.post(BASE_URL + "login", {
                emailId,
                password
            }, {withCredentials: true});
            
            dispatch(addUser(res.data));
            navigate('/');
        } catch (error) {
            if(error.response && error.response.data){
                setError(error.response.data);
            } else {
                setError("Something went wrong. Please try again later.");
            }
        }
        
    }

    const handleSignUp = async () => {
        try{
            const res = await axios.post(BASE_URL + "signup", {firstName, lastName, emailId, password}, {withCredentials:true});
            dispatch(addUser(res.data));
            navigate("/profile");
        } catch(error) {

        }
    }


    return (
        <>
        <div className="flex justify-center my-5">
            <div className="bg-base-300 w-96">
            <div className="card-body">
                <h2 className="card-title flex justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
                {!isLoginForm && (<><fieldset className="fieldset">
                <legend className="fieldset-legend">FirstName</legend>
                <input type="text" className="input" placeholder="" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </fieldset>
                <fieldset className="fieldset">
                <legend className="fieldset-legend">LastName</legend>
                <input type="text" className="input" placeholder="" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </fieldset></>)}
                <fieldset className="fieldset">
                <legend className="fieldset-legend">EmailId</legend>
                <input type="text" className="input" placeholder="" value={emailId} onChange={(e) => setEmailId(e.target.value)}/>
                </fieldset>
                <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input type="text" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </fieldset>
                <div className="card-actions justify-end justify-center">
                    <p className="text-red-500">{error}</p>
                {isLoginForm ? (<button className="btn btn-primary justify-center" onClick={handleLogin}>Login</button>) : 
                (<button className="btn btn-primary justify-center" onClick={handleSignUp}>SignUp</button>)}
                </div>
                <div>
                    <p className="justify-center underline cursor-pointer" onClick={() => setIsLoginForm((value) => !value)}>{isLoginForm ? "New User Sign up here" : "Existig User Login here"}</p>
                </div>
                
            </div>
            </div>
            </div>
        </>
    )
}

export default Login