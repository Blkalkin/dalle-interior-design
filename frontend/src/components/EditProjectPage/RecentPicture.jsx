import './EditProject.css'

function RecentPicture ({photoUrls}) {
    return (
        <>
            <div className='first-photo'>
                <h2>{photoUrls[0]}</h2>
            </div>
        </>
    )
}

export default RecentPicture
