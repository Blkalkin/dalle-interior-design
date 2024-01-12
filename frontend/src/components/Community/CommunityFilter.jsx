import { Link } from 'react-router-dom'
import office from '../../../assets/landingPagePhotos/2-office-before.jpeg'
import living from "../../../assets/landingPagePhotos/1-livingroom-before.jpeg"
import bathroom from "../../../assets/landingPagePhotos/3-bathroom-after.png"
import bedroom from "../../../assets/landingPagePhotos/4-kids-room-after.png"
import dinning from "../../../assets/project-filter-images/dinning room.png"
import kitchen from "../../../assets/project-filter-images/kitchen.png"
import entryway from "../../../assets/project-filter-images/entryway.png"
import laundry from "../../../assets/project-filter-images/laundry.png"

import "./CommunityFilter.css"
import { capitalizeFirstLetter } from '../../utils/Helper_Functions'

const CommunityFilter = () => {
    const categories = [
        {"type":"kitchen", "image": kitchen},
        {"type": "bath", "image": bathroom}, 
        {"type": "bedroom", "image": bedroom}, 
        {"type": "living", "image": living}, 
        {"type": "dining", "image": dinning}, 
        {"type": "office", "image": office}, 
        {"type": "entry", "image": entryway}, 
        {"type": "laundry", "image": laundry}
    ]

    return (
        <div className="community-filter-container">
            {categories.map((category,idx) => 
                <Link to={`/community/${category.type}`} className='community-filter-item' key={idx}>
                    <img src={category.image} alt="" />
                    <h3 className='title'>{capitalizeFirstLetter(category.type)}</h3>
                </Link>
            )}
        </div>
    )
}

export default CommunityFilter