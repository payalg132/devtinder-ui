import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection);

    const fetchConnections = async () => {
       try {
        const res = await axios.get(BASE_URL + "user/connections", {withCredentials: true});

        dispatch(addConnection(res?.data));
       } catch (err) {
        console.log(err);
       }
    }

    useEffect(() => {
        fetchConnections();
    }, []);

    if(!connections) return;

  return (
    <div className="text-center my-10">
        <h2 className="text-bold text-3xl">Connections</h2>
        {connections.map((conn, idx) => (
          <div className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
          <div>
          <img alt="photo" className="w-20 h-20 rounded-full object-cover" src={conn.photoUrl} />
          </div>
          <div className="text-left mx-4 ">
            <h2 className="font-bold text-xl">{conn.firstName} {conn.lastName}</h2>
            <p>{conn.about}</p>
          </div>
            <Link to={"/chat/"+ conn._id}><button class="btn btn-primary">Chat</button></Link>
        </div>
      ))}
    </div>
  )
}

export default Connections;