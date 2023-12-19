import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Navigate, Link } from 'react-router-dom';
import ProjectIndex from '../Projects/ProjectIndex';
import LoginForm from '../SessionForms/LoginForm';


function Profile () {
    const { id } = useParams();
    const dispatch = useDispatch()
    const currUser = useSelector(state => state.session.user)

    if (!currUser) return <Navigate to='/login' replace={true}/>

    if (id === currUser._id) {
        return (
            <>
                <ProjectIndex title="My Projects"/>
                <Link to={'/createProject'} className='text get-started'>Add project</Link>
            </>
        );
    } else {
        return (
            <>
                <ProjectIndex id={id} />
            </>
        )
    }
}

export default Profile;
