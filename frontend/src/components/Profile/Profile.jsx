import './Profile.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Navigate, Link } from 'react-router-dom';
import ProjectIndex from '../Projects/ProjectIndex';
import { getUser } from '../../store/user';
import { useEffect, useState } from "react"


function Profile () {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const [profileOwner, setProfileOwner] = useState(false)
    const currUser = useSelector(state => state.session.user)
    const user = useSelector(state => state.users[userId])

    const capitalizeFirstLetter = str => {
        if (str) return str.charAt(0).toUpperCase() + str.slice(1); 
    }

    
    useEffect (() => {
        if (currUser._id === userId) {
            setProfileOwner(true)
        } else {
            dispatch(getUser(userId))
        }

    }, [dispatch, userId, profileOwner, currUser])



    return (
        <div className='profile-container text'>
            <h2>
                {profileOwner? `${capitalizeFirstLetter(currUser.username)}` : `${capitalizeFirstLetter(user?.username)}`}
            </h2>
                {profileOwner? (
                    <ProjectIndex currentUser={currUser} projectOwner={profileOwner}/>
                ):(
                    <ProjectIndex user={user}/>
                )}
        </div>
    )

}

export default Profile;
