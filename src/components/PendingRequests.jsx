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

    if(!requests) return <h2 className="my-5  font-bold">No Requests found !!</h2>
    if(requests.length == 0) return <h2 className="my-5  font-bold text-center">No Requests found !!</h2>

    return (
    <div className="text-center">
        <h2 className="my-5  font-bold">Requests</h2>
        {requests.map((req, idx) => (
            <div class=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300  mx-auto w-3/4">
                <div>
                    <img alt="photo" class="w-20 h-20 rounded-full" src={req.fromUserId.photoUrl} />
                </div>
                <div class="text-left mx-4 ">
                    <h2 class="font-bold text-xl">{req.fromUserId.firstName}  {req.fromUserId.lastName}</h2>
                    <p>{req.fromUserId.age}, {req.fromUserId.gender}</p><p>{req.fromUserId.about}</p>
                </div>
                <div>
                    <button class="btn btn-primary mx-2" onClick={() => saveResponse("rejected", res._id)}>Reject</button>
                    <button class="btn btn-secondary mx-2" onClick={() => saveResponse("accepted", res._id)}>Accept</button>
                </div>
            </div>
        ))}
    </div>
  )
}

export default PendingRequests;