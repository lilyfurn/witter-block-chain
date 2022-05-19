import Feed from '../components/home/Feed'
import { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import { TwitterContext } from '../context/TwitterContext'
import Image from 'next/image'
import metamaskLogo from '../assets/metamask.png'
import errorImg from '../assets/error.png'
import { client } from '../lib/client'
import { homedir } from 'os'
import { BsStars } from 'react-icons/bs'
import TweetBox from '../components/home/TweetBox'
import Post from '../components/Post'

const style = {
  wrapper: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400] w-2/3 flex justify-between`,
  loginContainer: `w-full h-full flex flex-col justify-center items-center pb-48`,
  walletConnectButton: `text-2xl text-black bg-white font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]`,
  loginContent: `text-3xl font-bold text-center mt-24`,
  mainContent: `flex-[2] border-r border-l border-[#38444d] `,
}

const stylex = {
  wrapper: `flex-[2] border-r border-l border-[#38444d] `,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
}

const Home = ({ tweets }) => {
  const { appStatus, connectToWallet, currentUser, currentAccount } =
    useContext(TwitterContext)

  const app = (status = appStatus) => {
    switch (status) {
      case 'connected':
        return userLoggedIn

      case 'notConnected':
        return noUserFound

      case 'noMetaMask':
        return noMetaMaskFound

      case 'error':
        return error

      default:
        return loading
    }
  }

  const userLoggedIn = (
    <div className={style.content}>
      <Sidebar />
      <div className={style.wrapper}>
        <div className={`${stylex.wrapper} no-scrollbar`}>
          <div className={stylex.header}>
            <div className={stylex.headerTitle}>Home</div>
            <BsStars />
          </div>
          <TweetBox />
          {/* {currentUser.tweets} {currentUser.tweets.length}*/}

          {tweets?.length > 0 &&
            tweets.map((tweet, index) => (
              <Post
                key={tweet.timestamp}
                displayName={
                  tweet.author.name === 'Unnamed'
                    ? tweet.author.walletAddress
                    : tweet.author.name
                }
                userName={`${tweet.author.walletAddress.slice(
                  0,
                  4
                )}...${tweet.author.walletAddress.slice(-4)}`}
                text={tweet.tweet}
                avatar={tweet.author.profileImage}
                isProfileImageNft={tweet.isProfileImageNft}
                timestamp={tweet.timestamp}
              />
            ))}
        </div>
      </div>

      {/* <Feed /> */}
      <Widgets />
    </div>
  )

  const noUserFound = (
    <div className={style.loginContainer}>
      <Image src={metamaskLogo} width={200} height={200} />
      <div
        className={style.walletConnectButton}
        onClick={() => connectToWallet()}
      >
        Connect Wallet
      </div>
      <div className={style.loginContent}>Connect to Metamask.</div>
    </div>
  )

  const noMetaMaskFound = (
    <div className={style.loginContainer}>
      <Image src={metamaskLogo} width={200} height={200} />
      <div className={style.loginContent}>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://metamask.io/download.html`}
        >
          You must install Metamask, a <br /> virtual Ethereum wallet, in your
          browser.
        </a>
      </div>
    </div>
  )

  const error = (
    <div className={style.loginContainer}>
      <Image src={errorImg} width={250} height={200} />
      <div className={style.loginContent}>
        An error occurred. Please try again later.
      </div>
    </div>
  )

  const loading = (
    <div className={style.loginContainer}>
      <div className={style.loginContent}>Loading...</div>
    </div>
  )

  return (
    <div>
      <div className={style.wrapper}>{app(appStatus)}</div>
    </div>
  )
}

const query = `*[_type == "tweets"]{
  "author": author->{name, walletAddress, profileImage, isProfileImageNft},
     tweet,
  timestamp
}|order(timestamp desc) `

export async function getStaticProps() {
  const tweets = await client.fetch(query)

  return {
    props: {
      tweets,
    },
  }
}

export default Home
