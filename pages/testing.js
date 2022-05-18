import { useContext, useEffect } from 'react'
import { TwitterContext } from '../context/copy'

import Post from '../components/Post'

const tweets = [
  {
    tweet: 'The first of spring!',
    timestamp: '2021-03-01T07:00:08.000Z', // this is how sanity stores timestamps
  },
  {
    tweet: 'Stuck on this tweet',
    timestamp: '2021-03-01T07:00:08.000Z', // this is how sanity stores timestamps
  },
  {
    tweet: 'downgrading to mewe',
    timestamp: '2021-03-01T07:00:08.000Z', // this is how sanity stores timestamps
  },
]

function Feed() {
    const { tweets } = useContext(TwitterContext)

  return (
    <>
      <div>
        {tweets?.map((tweet, index) => (
          <Post key={index} text={tweet.tweet} timestamp={tweet.timestamp} />
        ))}
      </div>
    </>
  )
}

export default Feed
