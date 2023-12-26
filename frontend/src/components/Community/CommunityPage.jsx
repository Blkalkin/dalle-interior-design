import ProjectIndex from "../Projects/ProjectIndex";
import './Community.css';
import CommunityFilter from "./CommunityFilter";

function CommunityPage () {

    return (
        <>
                <CommunityFilter/>
            <div className="community-container">
                <h1 className="community-title title">Community Projects</h1>
                <ProjectIndex/>
            </div>
        </>
    )
}

export default CommunityPage;
