import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);

    const getFeed = async () => {
        if( feed ) return;
        try{
            const res = await axios.get(BASE_URL + "feed", {withCredentials: true});
            console.log(res.data);
            dispatch(addFeed(res.data));
        } catch (error) {
            console.log(error);
        }   
    }

    useEffect(() => {
        getFeed();
    }
    , []);

  return ( feed && (
    <div className="flex justify-center my-5">
        <UserCard user={feed[0]} />
    </div> )
  )
}

export default Feed