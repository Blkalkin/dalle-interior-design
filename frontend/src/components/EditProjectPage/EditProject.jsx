import './EditProject.css'
import { fetchProject, selectProject } from '../../store/project'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react"
import RecentPicture from './RecentPicture';
import FinishedModal from './FinishedModal';





function EditProject () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { projectId } = useParams();
    const project = useSelector(selectProject(projectId))
    const newImages = useSelector(state => state.newImages)
    const currUser = useSelector(state => state.session.user)
    const [finishedModal, setFinishedModal] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true)

    
    if (project && currUser && firstLoad) {
        const isAuthor = currUser && currUser._id === project.author._id
        isAuthor ? null : navigate('/')
        setFirstLoad(false)
    }
    
    
    useEffect (() => {
        if (!project) dispatch(fetchProject(projectId))
    }, [dispatch, project, projectId])


    const closeFinishModal = () => {
        setFinishedModal(false);
    };

    const doneButton = async (e) => {
        e.preventDefault();
        setFinishedModal(true)
    }



    if (project) {
        return (
            <div className='project-page' >
                {finishedModal && <FinishedModal photoUrls={project.photoUrls} closeFinishModal={closeFinishModal} projectId={projectId}/>}
                <h1 className='project-text title'>{project.title}</h1>
                <RecentPicture
                    photoUrls={project.photoUrls}
                    newImages={newImages}
                    projectId={projectId}
                />
                {project.photoUrls.length >= 2 ? 
                    <button className='text done-btn' onClick={doneButton}>Love what I got, all done!</button>
                : null}
                <div className='mode-info-container'>
                    <div className='mode-info-content text'>
                        <h3>What are the modes?</h3>
                        <h3>Standard</h3>
                        <div className='step-1 steps'>
                            <p>Elevate your existing space by enhancing its current layout and features. Ideal for practical redesigns and clear thematic updates, we focus on refining and optimizing your space to better suit your style and needs while respecting its original structure and character.</p>
                        </div>
                        
                        <h3>Creative</h3>
                        <div className='step-1 steps'>
                            <p>Unleash our creativity to transform your space with bold, imaginative designs that merge audacious style with practicality. Expect a bespoke living masterpiece, uniquely tailored to your personality and preferences, where innovative and daring elements create an unforgettable and inspiring environment.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditProject;
