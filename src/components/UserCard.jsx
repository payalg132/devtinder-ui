const UserCard = ({user}) => {
    const {firstName, lastName, photoUrl, age, gender, about} = user;
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
            <div className="card-actions justify-center">
            <button className="btn btn-primary">Ignored</button>
            <button className="btn btn-primary">Interested</button>
            </div>
        </div>
        </div>
    </div> )
}

export default UserCard