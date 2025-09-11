import { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("Anudeep@gmail.com");
    const [password, setPassword] = useState("Anudeep@12345");
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


    return (
        <>
        <div className="flex justify-center my-5">
            <div className="bg-base-300 w-96">
            <div className="card-body">
                <h2 className="card-title flex justify-center">Login</h2>
                <fieldset className="fieldset">
                <legend className="fieldset-legend">EmailId</legend>
                <input type="text" className="input" placeholder="example@gmail.com" value={emailId} onChange={(e) => setEmailId(e.target.value)}/>
                </fieldset>
                <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input type="text" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </fieldset>
                <div className="card-actions justify-end">
                    <p className="text-red-500">{error}</p>
                <button className="btn btn-primary justify-center" onClick={handleLogin}>Login</button>
                </div>
            </div>
            </div>
            </div>
        </>
    )
}

export default Login