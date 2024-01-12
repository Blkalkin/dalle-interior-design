import { useParams } from "react-router-dom";
import ProjectIndex from "../Projects/ProjectIndex";
import './Community.css';
import CommunityFilter from "./CommunityFilter";

function CommunityPage () {
    const {keyword} = useParams()

    return (
        <>  
            <div className="community-top">
                <CommunityFilter/>
            </div>
            <div className="community-container">
                {keyword? 
                <>
                    <h1 className="community-title title">Results for {keyword}</h1>
                    <ProjectIndex keyword={keyword}/>
                </>
                :
                <>
                    <h1 className="community-title title">Community Projects</h1>
                    <ProjectIndex/>
                </>
                }
            </div>
        </>
    )
}

export default CommunityPage;
