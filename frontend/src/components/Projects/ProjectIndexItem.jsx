import { Link } from 'react-router-dom';
import "./ProjectIndexItem.css"
import { formatDateString } from '../../utils/Helper_Functions';
import deleteIcon from '../../../assets/icons/trash.png'
import { useDispatch, useSelector} from 'react-redux';
import { deleteProject } from '../../store/project';
import { useState } from 'react';



const ProjectIndexItem = ({project}) => {
    const dispatch = useDispatch()
    const lastImage = project.photoUrls[project.photoUrls.length - 1]
    const currentUser = useSelector(state => state.session.user)
    const projectOwner = currentUser && currentUser._id === project.author._id
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    return (
        <li className='project-details-container'>
            <h3 className="title">{project.title}</h3>
            <Link className='single-project text' to={`/project-details/${project._id}`}>
              <img className='single-project-img' src={lastImage} alt="test" />
            </Link>
            <div className='bottom-details'>
                <h4 className='text created-text'>Created {formatDateString(project.createdAt)}</h4>
                {projectOwner? (
                    <img onClick={() => setShowDeleteModal(true)} src={deleteIcon} className='deleteIcon' alt="delete" />
                ):(null)}
                { showDeleteModal && <div className='modal-background'>
                    <div className='modal-content text'>
                        <div className='delete-confirmation-div'>
                            <p>Delete this project?</p>  
                            <p>
                                <span className='delete-options' onClick={() => dispatch(deleteProject(project._id))}>Yes&nbsp;&nbsp;&nbsp;&nbsp;</span> 
                                <span className='delete-options' onClick={() => setShowDeleteModal(false)}> No </span> 
                            </p>
                        </div>
                    </div>
                </div>}
            </div>
        </li>
    )
}

export default ProjectIndexItem
