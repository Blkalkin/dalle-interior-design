import './EditProject.css'

function RecentPicture ({photoUrls, newImage}) {
    return (
        <>
            <div class="image-container">
                <div className="image-box" onclick="handleClick('firstBox')">
                    Image Box 1
                </div>
                <div className="image-box" onclick="handleClick('secondBox')">
                    Image Box 2
                </div>
            </div>
        </>
    )
}

export default RecentPicture
