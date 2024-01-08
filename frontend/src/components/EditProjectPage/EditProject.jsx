import './EditProject.css'
import { editProject, fetchProject, selectProject } from '../../store/project'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react"
import RecentPicture from './RecentPicture';
import FinishedModal from './FinishedModal';





function EditProject () {
    const dispatch = useDispatch()
    const { projectId } = useParams();
    const project = useSelector(selectProject(projectId))
    const newImages = useSelector(state => state.newImages)
    const [finishedModal, setFinishedModal] = useState(false);

    useEffect (() => {
        if (!project){
            dispatch(fetchProject(projectId))
        }
    }, [dispatch, project])

    const closeFinishModal = () => {
        setFinishedModal(false);
    };

    const doneButton = async (e) => {
        e.preventDefault();
        setFinishedModal(true)
    }



    if (project) {
        return (
            <>
                <div className='project-page' >
                    <h1>{project.title}</h1>
                    <RecentPicture
                        photoUrls={project.photoUrls}
                        newImages={newImages}
                        projectId={projectId}
                    />
                    <div className='mode-select-buttons'>
                        <button onClick={() => setFinishedModal(true)}>Done?</button>
                    </div>
                </div>
                {finishedModal && <FinishedModal photoUrls={project.photoUrls} closeFinishModal={closeFinishModal} projectId={projectId}/>}
            </>
        )
    } else {
        // navigate(`/createProject`)
    }
}

export default EditProject;
