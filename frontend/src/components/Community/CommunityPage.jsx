import ProjectIndex from "../Projects/ProjectIndex";
import './Community.css';

function CommunityPage () {

    return (
        <div className="community-container">
            <h1 className="community-title title">Community Projects</h1>
            <ProjectIndex/>
        </div>
    )
}

export default CommunityPage;
