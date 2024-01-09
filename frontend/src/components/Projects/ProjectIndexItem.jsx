import { Link } from 'react-router-dom';
import "./ProjectIndexItem.css"
import { formatDateString } from '../../utils/Helper_Functions';
import deleteIcon from '../../../assets/icons/trash.png'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProject } from '../../store/project';



const ProjectIndexItem = ({project}) => {
    const dispatch = useDispatch()
    const lastImage = project.photoUrls[project.photoUrls.length - 1]
    const currentUser = useSelector(state => state.session.user)
    const projectOwner = currentUser && currentUser._id === project.author._id


    
    return (
        <li className='project-details-container'>
            <h3 className="title">{project.title}</h3>
            <Link className='single-project text' to={`/project-details/${project._id}`}>
              <img className='single-project-img' src={lastImage} alt="test" />
            </Link>
            <div className='bottom-details'>
                <h4 className='text created-text'>Created {formatDateString(project.createdAt)}</h4>
                {projectOwner? (
                    <img onClick={()=> dispatch(deleteProject(project._id))} src={deleteIcon} className='deleteIcon' alt="delete" />
                ):(null)}
            </div>
        </li>
    )
}

export default ProjectIndexItem
