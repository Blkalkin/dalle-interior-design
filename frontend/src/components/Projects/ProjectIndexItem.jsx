import { Link } from 'react-router-dom';
import "./ProjectIndexItem.css"
import { formatDate } from '../../utils/dateFormat';
import deleteIcon from '../../../assets/icons/trash.png'
import { useDispatch } from 'react-redux';
import { deleteProject } from '../../store/project';


const ProjectIndexItem = ({project}) => {
    const dispatch = useDispatch()

    return (
        <li className='project-details-container'>
            <h3 className="title">{project.title}</h3>
            {/* <Link className='single-project' to={`/profile/${project.author}/${project._id}`}> */}
            <Link className='single-project text' to={`/projectDetails/${project._id}`}>
              <img className='single-project-img' src="https://havenly.com/blog/wp-content/uploads/2023/10/kyliefitts_havenly_odetteannable_10-7-1500x970.jpg" alt="test" />
            </Link>
            <div className='bottom-details'>
                <h4 className='text'>Created: {formatDate(project.createdAt)}</h4>
                {/* <img onClick={()=> dispatch(deleteProject(project._id))} src={deleteIcon} className='deleteIcon' alt="delete" /> */}
            </div>
        </li>
    )
}

export default ProjectIndexItem
