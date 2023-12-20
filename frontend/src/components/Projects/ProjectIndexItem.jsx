import { Link } from 'react-router-dom';
import "./ProjectIndexItem.css"
import { formatDate } from '../../utils/dateFormat';

const ProjectIndexItem = ({project}) => {
    return (
        <li className='project-details-container'>
            <h3 className="title">{project.title}</h3>
            <Link className='single-project'>
              <img className='single-project-img' src="https://havenly.com/blog/wp-content/uploads/2023/10/kyliefitts_havenly_odetteannable_10-7-1500x970.jpg" alt="test" />
            </Link>
            {/* <Link>{project.photoUrls[project.photoUrls.length - 1]}</Link> */}
            <h4>{formatDate(project.createdAt)}</h4>
        </li>
    )
}

export default ProjectIndexItem
