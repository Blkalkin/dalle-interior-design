import { Link } from 'react-router-dom';
import "./ProjectIndexItem.css"
import { formatDate, formatDateString } from '../../utils/dateFormat';
import deleteIcon from '../../../assets/icons/trash.png'
import { useDispatch } from 'react-redux';
import { deleteProject } from '../../store/project';
import { useEffect } from 'react';


const ProjectIndexItem = ({project, idx}) => {
    const dispatch = useDispatch()
    const lastImage = project.photoUrls[project.photoUrls.length - 1]


    useEffect(()=>{

    },[dispatch])

    return (
        <li className='project-details-container'>
            <h3 className="title">{project.title}</h3>
            <Link className='single-project text' to={`/projectDetails/${project._id}`}>
              <img className='single-project-img' src={lastImage} alt="test" />
            </Link>
            <div className='bottom-details'>
                <h4 className='text'>{formatDateString(project.createdAt)}</h4>
                <img onClick={()=> dispatch(deleteProject(project._id, idx))} src={deleteIcon} className='deleteIcon' alt="delete" />
            </div>
        </li>
    )
}

export default ProjectIndexItem
