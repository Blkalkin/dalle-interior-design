import { Link } from 'react-router-dom';
import "./ProjectIndexItem.css"

const ProjectIndexItem = ({project}) => {
    return (
        <li className='project-details-container'>
            <h3>{project.title}</h3>
            <Link>{project.photoUrls[project.photoUrls.length - 1]}</Link>
            <h4>{project.description}</h4>
        </li>
    )
}

export default ProjectIndexItem