import './EditProject.css'
import { fetchProject, selectProject } from '../../store/project'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from "react"
import RecentPicture from './RecentPicture';

function EditProject () {

    const obj = {
        _id: "658218b08522932af6596a6a",
        author: "658218af8522932af6596a62",
        title: "Tactus depereo esse corporis tenuis barba adeo desparatus cunctatio ta…",
        description: "Vos vulnus audentia aestivus culpa.",
        photoUrls: ["hi", "hi2"],
        public: true
    }

    const { id } = useParams();
    const dispatch = useDispatch(fetchProject)
    const currProject = selectProject(id)

    useEffect (() => {
        dispatch(fetchProject(id))
    }, [])

    return (
        <>
            <div className='project-page'>
                <h1>{obj.title}</h1>
                <RecentPicture photoUrls={obj.photoUrls}/>
            </div>
        </>
    )
}

export default EditProject;
