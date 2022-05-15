import TweetBox from './TweetBox'
import { BsStars } from 'react-icons/bs'
import Post from '../Post'
import { useContext } from 'react'
import { TwitterContext } from '../../context/TwitterContext'

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
    avatar:
      'https://storage.googleapis.com/furcat.appspot.com/furcat-token.png',
    text: 'gm',
    isProfileImageNft: false,
    timestamp: '2021-03-01T07:00:08.000Z', // this is how sanity stores timestamps
  },
  {
    displayName: 'Andros',
    userName: '0x29f417d103F71051f817C30D07848D43c842d810',
    avatar:
      'https://storage.googleapis.com/furcat.appspot.com/furcat-token.png',
    text: 'gm',
    isProfileImageNft: false,
    timestamp: '2022-03-01T07:00:08.000Z', // this is how sanity stores timestamps
  },
  {
    displayName: 'Andros',
    userName: '0x28f417d103F71051f817C30D07848D43c842d810',
    avatar:
      'https://storage.googleapis.com/furcat.appspot.com/furcat-token.png',
    text: 'gm',
    isProfileImageNft: false,
    timestamp: '2022-03-01T07:00:08.000Z', // this is how sanity stores timestamps
  },
]

function Feed() {
  const { tweets, currentUser, currentAccount } =
    useContext(TwitterContext)
  // const { allUserTweets } = useContext(TwitterContext) ///
  return (
    <div className={`${style.wrapper} no-scrollbar`}>
      <div className={style.header}>
        <div className={style.headerTitle}>Home</div>
        <BsStars />
      </div>
      <TweetBox />
      <div>{tweets.length}</div>
      <h1>walladdy: {currentAccount}</h1>
      {/* {currentUser.tweets} {currentUser.tweets.length}*/}

      {/* {tweets?.length > 0 &&
        tweets.map((tweet, index) => (
          <Post
            key={tweet.timestamp}
            displayName={
              currentUser.name === 'Unnamed'
                ? currentUser.walletAddress
                : currentUser.name
            }
            userName={`${currentAccount.slice(0, 4)}...${currentAccount.slice(
              -4
            )}`}
            text={tweet.tweet}
            avatar={currentUser.profileImage}
            isProfileImageNft={tweet.isProfileImageNft}
            timestamp={tweet.timestamp}
          />
        ))} */}

      {tweets?.map((tweet, index) => (
        <Post
          key={index}
          displayName={
            currentUser.name === 'Unnamed'
              ? currentUser.walletAddress
              : currentUser.name
          }
          userName={`${currentAccount.slice(0, 4)}...${currentAccount.slice(
            -4
          )}`}
          text={tweet.tweet}
          avatar={currentUser.profileImage}
          isProfileImageNft={tweet.isProfileImageNft}
          timestamp={tweet.timestamp}
        />
      ))}

      {/* {tweets.map((tweet, index) => (
        
        <Post
          key={index}
          displayName={tweet.author.name
            currentUser.tweet.author.name === 'Unnamed'
              ? `${tweet.author.walletAddress.slice(
                  0,
                  4
                )}...${tweet.author.walletAddress.slice(41)}`
              : tweet.author.name
          }
          userName={`${tweet.author.walletAddress.slice(
            0,
            4
          )}...${tweet.author.walletAddress.slice(-3)}`}
          avatar={tweet.author.profileImage}
          text={tweet.tweet}
          isProfileImageNft={tweet.isProfileImageNft}
          timestamp={tweet.timestamp}
        />
      ))} */}
    </div>
  )
}

export default Feed
