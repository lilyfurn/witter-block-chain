import TweetBox from './TweetBox'
import { BsStars } from 'react-icons/bs'
import Post from '../Post'
// overflow-y-scroll on wrapper
const style = {
  wrapper: `flex-[2] border-r border-l border-[#38444d] `,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
}

const tweets = [
    {
        displayName: 'Andros',
        userName: '0x29f417d103F71051f817C30D07848D43c842d810',
        avatar: 'https://storage.googleapis.com/furcat.appspot.com/furcat-token.png',
        text: 'gm',
        isProfileImageNft: false,
        timestamp: '2021-03-01T07:00:08.000Z', // this is how sanity stores timestamps
    },
    {
        displayName: 'Andros',
        userName: '0x29f417d103F71051f817C30D07848D43c842d810',
        avatar: 'https://storage.googleapis.com/furcat.appspot.com/furcat-token.png',
        text: 'gm',
        isProfileImageNft: false,
        timestamp: '2022-03-01T07:00:08.000Z', // this is how sanity stores timestamps
    },
    {
        displayName: 'Andros',
        userName: '0x29f417d103F71051f817C30D07848D43c842d810',
        avatar: 'https://storage.googleapis.com/furcat.appspot.com/furcat-token.png',
        text: 'gm',
        isProfileImageNft: false,
        timestamp: '2022-03-01T07:00:08.000Z', // this is how sanity stores timestamps
    },

]

function Feed() {
  return (
      <div className={`${style.wrapper} no-scrollbar`}>
          <div className={style.header}>
              <div className={style.headerTitle}>Home</div>
              <BsStars />
          </div>
          <TweetBox />
          {tweets.map((tweet, index) => (
              <Post 
              key={index}
              displayName={tweet.displayName}
              userName={`${tweet.userName.slice(0, 4)}...${tweet.userName.slice (- 3)}`}
              avatar={tweet.avatar}
              text={tweet.text}
              isProfileImageNft={tweet.isProfileImageNft}
              timestamp={tweet.timestamp}
              />
          ))}
      </div>
  )
}

export default Feed
