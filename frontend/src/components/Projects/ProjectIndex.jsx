import "./ProjectIndex.css"
import ProjectIndexItem from "./ProjectIndexItem"
import { useEffect, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { fetchProjects, fetchUserProjects, selectProjectsArray } from "../../store/project"

const ProjectIndex = ({user, currentUser, keyword}) => {
    const dispatch = useDispatch()
    const projects = useSelector(selectProjectsArray)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      setLoading(true);
  
      const fetchData = async () => {
        try {
          if (user) {
            await dispatch(fetchUserProjects(user._id));
          } else if (currentUser) {
            await dispatch(fetchUserProjects(currentUser._id));
          } else if (keyword) {
            await dispatch(fetchProjects(keyword));
          } else {
            await dispatch(fetchProjects());
          }
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [dispatch, user, currentUser, keyword]);

    if (!loading) {
      return (
          <div className="project-index-container">
            {projects.length === 0 ? <h2 className="title">Nothing found for {keyword}</h2> : null}
              <ul className="projects-index-grid">
                  {projects.map((project) => (
                      <ProjectIndexItem
                          key={project._id}
                          project={project}
                      />
                  ))}
              </ul>
          </div>
      )
    } else {
      return <div className="project-index-container"></div>
    }
}

export default ProjectIndex
