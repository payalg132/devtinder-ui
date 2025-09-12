import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { addUser } from "../utils/userSlice"

const Body = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();

    const fetchProfile = async () => {
        try{
            if (user) return;
            const res = await axios.get(BASE_URL + "profile/view", {withCredentials: true});

            dispatch(addUser(res.data));
        } catch (error) {
            if(error.response && error.response.status === 401){
                return navigate('/login');
            }
            console.log(error);
        }
        
    }

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <>
        <Navbar />
        <Outlet />
        <Footer />
        </>
    )
}

export default Body