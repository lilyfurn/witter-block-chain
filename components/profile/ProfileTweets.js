import { useContext } from 'react'
import { TwitterContext } from '../../context/TwitterContext'
import Post from '../Post'

const style = {
  wrapper: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] w-2/3 flex justify-between`,
  mainContent: `flex-[2] border-r border-l border-[#38444d] overflow-y-scroll`,
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
    userName: '0x29f417d103F71051f817C30D07848D43c842d810',
    avatar:
      'https://storage.googleapis.com/furcat.appspot.com/furcat-token.png',
    text: 'gm',
    isProfileImageNft: false,
    timestamp: '2022-03-01T07:00:08.000Z', // this is how sanity stores timestamps
  },
]

const ProfileTweets = () => {
  const { currentAccount, currentUser } = useContext(TwitterContext)
  return (
    <div>
      {currentUser.tweets?.map((tweet, index) => (
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
    </div>
  )
}

export default ProfileTweets
