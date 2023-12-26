import './Profile.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ProjectIndex from '../Projects/ProjectIndex';
import { fetchUser } from '../../store/user';
import { useEffect } from "react"
import { capitalizeFirstLetter } from '../../utils/Helper_Functions';


function Profile () {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const currUser = useSelector(state => state.session.user)
    const user = useSelector(state => state.users[userId])
    const profileOwner = currUser && currUser._id === userId
    


    useEffect (() => {
        dispatch(fetchUser(userId))
    }, [dispatch, userId, navigate])


    if (currUser || user) {
        return (
            <div className='profile-container'>
                <h1 className='profile-title title'>
                    {profileOwner? (
                        `${capitalizeFirstLetter(currUser.username)}'s Projects`
                        ) : (
                            user? (`${capitalizeFirstLetter(user.username)}'s Projects`) : "404 Profile NOT FOUND"
                            )}
                </h1>
                    {profileOwner? (
                        <ProjectIndex currentUser={currUser} projectOwner={profileOwner}/>
                    ):(
                        <ProjectIndex user={user}/>
                    )}
            </div>
        )
    }

}

export default Profile;
