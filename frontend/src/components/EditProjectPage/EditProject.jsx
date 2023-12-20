import './EditProject.css'
import { fetchProject, selectProject } from '../../store/project'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react"
import RecentPicture from './RecentPicture';

function EditProject () {

    const [description, setDescription] = useState("test");

    const { id } = useParams();
    const dispatch = useDispatch(fetchProject)
    const currProject = selectProject(id)

    useEffect (() => {
        dispatch(fetchProject(id))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (errors.length > 0) return

        const res = dispatch(createProject(payload))
        if (res.ok) {
            setImage(null);
            setTitle('');
            setErrors([]);
            setDisable(true);
            setImageLoading(false)
            navigate(`/profile/${currentUserId}`)
        }
    }

    const handleChange = (event) => {
        setDescription(event.target.value);
      };

    return (
        <>
            <div className='project-page' >
                <h1>{obj.title}</h1>
                <RecentPicture photoUrls={obj.photoUrls}/>
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
}

export default EditProject;
