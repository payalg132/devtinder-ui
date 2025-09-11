import { useSelector } from "react-redux";
import EditProfile from "./EditProfile"

const Profile = () => {
    const user = useSelector((state) => state.user.user);
    return (
        user && (<div>
            <EditProfile/>
        </div>)
    )
}
export default Profile