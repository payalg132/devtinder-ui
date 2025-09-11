const UserCard = ({user}) => {
    const {firstName, lastName, phtoUrl, age, gender, about} = user;
    return ( <div>
        <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
            <img className="w-50"
            src={phtoUrl}
            alt="photo" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName + " "+ lastName}</h2>
            <p>{about}</p>
            {age && gender && <p>{age}  {gender}</p>}
            <div className="card-actions justify-center">
            <button className="btn btn-primary">Ignored</button>
            <button className="btn btn-primary">Interested</button>
            </div>
        </div>
        </div>
    </div> )
}

export default UserCard