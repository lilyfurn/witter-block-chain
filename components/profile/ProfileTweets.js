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
  return (
    <div>
      ProfileTweets
      {tweets?.map((tweet, index) => (
        <Post
          key={index}
          displayName={`${tweet.userName.slice(0, 4)}...${tweet.userName.slice(
            -4
          )}`}
          text={tweet.text}
          avatar={tweet.avatar}
          isProfileImageNft={tweet.isProfileImageNft}
          timestamp={tweet.timestamp}
        />
      ))}
    </div>
  )
}

export default ProfileTweets
