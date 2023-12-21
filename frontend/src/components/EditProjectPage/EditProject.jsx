import './EditProject.css'
import { editProject, fetchProject, selectProject } from '../../store/project'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react"
import RecentPicture from './RecentPicture';





function EditProject () {
    const dispatch = useDispatch()
    const { projectId } = useParams();
    const project = useSelector(selectProject(projectId))
    const [description, setDescription] = useState("test");
    const newImages = useSelector(state => state.newImages)
 

    useEffect (() => {
        if (projectId){
            dispatch(fetchProject(projectId))
        }
    }, [dispatch, projectId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const res = dispatch(editProject(payload))
        // if (res.ok) {
        //     setImage(null);
        //     setTitle('');
        //     setErrors([]);
        //     setDisable(true);
        //     setImageLoading(false)
        //     // navigate(`/profile/${currentUserId}`)
        // }
    }

    const handleChange = (event) => {
        setDescription(event.target.value);
      };

    if (project) {
        return (
            <>
                <div className='project-page' >
                    <h1>{project.title}</h1>
                    <RecentPicture photoUrls={project.photoUrls} newImage={newImage}/>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={description}
                            onChange={handleChange}
                            placeholder="Enter text"
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </>
        )
    } else {
        // navigate(`/createProject`)
    }
}

export default EditProject;
