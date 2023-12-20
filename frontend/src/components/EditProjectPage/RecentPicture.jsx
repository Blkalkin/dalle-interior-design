import './EditProject.css'

function RecentPicture ({photoUrls}) {
    return (
        <>
            <div class="image-container">
                <div class="image-box" onclick="handleClick('firstBox')">
                    Image Box 1
                </div>
                <div class="image-box" onclick="handleClick('secondBox')">
                    Image Box 2
                </div>
            </div>
        </>
    )
}

export default RecentPicture
