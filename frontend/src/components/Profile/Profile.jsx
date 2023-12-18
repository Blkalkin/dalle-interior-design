// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProjectIndex from '../Projects/ProjectIndex';
// import { fetchUserTweets, clearTweetErrors, selectUserTweetsArray } from '../../store/tweets';
// import TweetBox from '../Tweets/TweetBox';

function Profile () {
    const { id } = useParams();
    
    return (
     <>

        <ProjectIndex />
      </>
    );
}

export default Profile;
