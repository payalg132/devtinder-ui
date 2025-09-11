import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const EditProfile = ()  => {
    const user = useSelector((store) => store.user.user);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [error, setError] = useState("");
    const [toast, setToast] = useState(false);
    const dispatch = useDispatch();

    const saveProfile = async () => {
        setError("");
       try {
        const res = await axios.patch(BASE_URL + "profile/edit", {
            firstName,
            lastName,
            photoUrl,
        age, gender, about
        }, {withCredentials: true});

        dispatch(addUser(res.data));
        setToast(true);

        setTimeout(() => {
            setToast(false);
        }, 3000);
    } catch(error) {
        if(error.response && error.response.data){
            setError(error.response.data);
        } else {
            setError("Something went wrong. Please try again later.");
        }
    }

    }

  return (
    <div>
         <div className="flex justify-center mt-2 mb-20">
            {toast && (<div className="toast toast-top toast-center">
            <div className="alert alert-success">
                <span>Profile updated successfully.</span>
            </div>
            </div>)}
            <div className="bg-base-300 w-96 mx-5">
            <div className="card-body">
                <h2 className="card-title flex justify-center">Edit Profile</h2>
                <fieldset className="fieldset">
                <legend className="fieldset-legend">FirstName</legend>
                <input type="text" className="input" placeholder="example@gmail.com" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </fieldset>
                <fieldset className="fieldset">
                <legend className="fieldset-legend">LastName</legend>
                <input type="text" className="input" placeholder="" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </fieldset>
                <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo URL</legend>
                <input type="text" className="input" placeholder="" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)}/>
                </fieldset>
                <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input type="text" className="input" placeholder="" value={age} onChange={(e) => setAge(e.target.value)}/>
                </fieldset>
                <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <input type="text" className="input" placeholder="" value={gender} onChange={(e) => setGender(e.target.value)}/>
                </fieldset>
                <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <input type="text" className="input" placeholder="" value={about} onChange={(e) => setAbout(e.target.value)}/>
                </fieldset>
                <p className="text-red-500">{error}</p>
                <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
                </div>
            </div>
            </div>
            <UserCard user={{firstName, lastName, photoUrl, age, gender, about}} />
            </div>
        </div>
    );
}

export default EditProfile;