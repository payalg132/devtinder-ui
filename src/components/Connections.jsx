import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection);

    const fetchConnections = async () => {
       try {
        const res = await axios.get(BASE_URL + "user/connections", {withCredentials: true});
        console.log(res.data);

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
    <div className="text-center">
        <h2 className="my-5  font-bold">Connections</h2>
        <div className="flex flex-col w-100 justify-center mx-auto">
            <ul className="list bg-base-100 rounded-box shadow-md">

                 {connections && connections.length > 0 ? (
    connections.map((conn, idx) => (
      <li className="list-row" id={idx}>
                    <div><img className="size-10 rounded-box" src={conn.photoUrl}/></div>
                    <div>
                    <div>{conn.firstName} {conn.lastName} </div>
                    <div className="text-xs uppercase font-semibold opacity-60">{conn.age} {conn.gender}</div>
                    </div>
                    <p className="list-col-wrap text-xs">
                    {conn.about}
                    </p>
                </li>
    ))
  ) : (
    <li>No connections found.</li>
  )}
  
            </ul>
        </div>
    </div>
  )
}

export default Connections;