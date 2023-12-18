import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserTweets, clearTweetErrors, selectUserTweetsArray } from '../../store/tweets';
// import TweetBox from '../Tweets/TweetBox';

function Profile () {
  const dispatch = useDispatch();
//   const currentUser = useSelector(state => state.session.user);
//   const userTweets = useSelector(selectUserTweetsArray);

  useEffect(() => {
    dispatch(fetchUserTweets(currentUser._id));
    return () => dispatch(clearTweetErrors());
  }, [currentUser, dispatch]);

  if (userTweets.length === 0) {
    return <div>{currentUser.username} has no Tweets</div>;
  } else {
    return (
      <>
        <h2>All of {currentUser.username}&apos;s Tweets</h2>
        {userTweets.map(tweet => (
          <TweetBox
            key={tweet._id}
            tweet={tweet}
          />
        ))}
      </>
    );
  }
}

export default Profile;
