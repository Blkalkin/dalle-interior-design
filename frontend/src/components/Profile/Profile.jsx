import './Profile.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Navigate, Link } from 'react-router-dom';
import ProjectIndex from '../Projects/ProjectIndex';
import { getUser } from '../../store/user';
import { useEffect } from "react"


function Profile () {
    const { id } = useParams();
    const dispatch = useDispatch()
    const currUser = useSelector(state => state.session.user)

    useEffect (() => {
        dispatch(getUser(id))
    }, [])

    const user = useSelector(state => state.user[id])

    if (!currUser) return <Navigate to='/login' replace={true}/>

    if (id === currUser._id) {
        return (
            <>
                <ProjectIndex title="My Projects" user={currUser}/>
                <Link to={'/createProject'} className='text get-started'>Add project</Link>
            </>
        );
    } else if (user) {
        return (
            <>
                <ProjectIndex user={user} />
            </>
        )
    } else {
        return (
            <>
                <h1>No User Found</h1>
            </>
        )
    }
}

export default Profile;
