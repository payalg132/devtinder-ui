import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const PendingRequests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.request);

    const pendingRequest = async() => {
        try {
            const res = await axios.get(BASE_URL + "user/request/recieved", { withCredentials:true });
            console.log(res.data);
            dispatch(addRequests(res.data));
        } catch(error) {
            console.log(error.message);
        }
    }

    const saveResponse = async(status, id) => {
        try{
            const res = await axios.post(BASE_URL +"request/review/"+ status + "/" + id, {}, {withCredentials:true});
            //console.log(res);
            dispatch(removeRequest(id));
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        pendingRequest();
    }, []);

    return (
    <div className="text-center">
        <h2 className="my-5  font-bold">Requests</h2>
        <div className="flex flex-col w-100 justify-center mx-auto">
            <ul className="list bg-base-100 rounded-box shadow-md">

                 {requests && requests.length > 0 ? (
    requests.map((req, idx) => (
      <li className="list-row" id={idx}>
                    <div><img className="size-10 rounded-box" src={req.fromUserId.photoUrl}/></div>
                    <div>
                    <div>{req.fromUserId.firstName} {req.fromUserId.lastName} </div>
                    <div className="text-xs uppercase font-semibold opacity-60">{req.fromUserId.age} {req.fromUserId.gender}</div>
                    </div>
                    <p className="list-col-wrap text-xs">
                    {req.fromUserId.about}
                    </p>
                    <button className="btn btn-active btn-success" onClick={() => saveResponse("accepted", req._id)}>Accept</button>
                    <button className="btn btn-active btn-error"  onClick={() => saveResponse("rejected", req._id)}>Reject</button>
                </li>
                ))
            ) : (
                <li>No requests found.</li>
            )}
  
            </ul>
        </div>
    </div>
  )
}

export default PendingRequests;