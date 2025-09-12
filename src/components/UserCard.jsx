import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({user, isShow}) => {
    if (!user) return <h3>No more Request found !!</h3>;
     if(user.length <= 0) return <h3>No more Request found !!</h3>;

    const {_id, firstName, lastName, photoUrl, age, gender, about} = user;
    const dispatch = useDispatch();

    const handleRequest = async (status, id) => {
        try{
            const res = await axios.post(BASE_URL + "request/send/" + status + "/" + id, {}, {withCredentials:true});
            dispatch(removeUserFromFeed(id));
        } catch (error) {
            console.log(error.message);
        }
    }

    return ( <div>
        <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
            <img className="w-50"
            src={photoUrl}
            alt="photo" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName + " "+ lastName}</h2>
            {age && gender && <p>{age}  {gender}</p>}
            <p>{about}</p>
            {isShow && (<div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={() => handleRequest("ignored", _id)}>Ignored</button>
            <button className="btn btn-primary" onClick={() => handleRequest("interested", _id)}>Interested</button>
            </div>)}
        </div>
        </div>
    </div> )
}

export default UserCard