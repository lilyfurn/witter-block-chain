import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { client } from '../lib/client'
import { sanityClient } from '../lib/sanity'
// swap client for sanityClient

export const TwitterContext = createContext()

export const TwitterProvider = ({ children }) => {
  const [appStatus, setAppStatus] = useState('')
  const [currentAccount, setCurrentAccount] = useState('')
  const [tweets, setTweets ] = useState([])
  const [currentUser, setCurrentUser] = useState({})


  const router = useRouter()

  useEffect(() => {
    checkIfWalletIsConnected() 
  }, [])

  useEffect(() => {
    if (!currentAccount && appStatus === 'connected') return
      getCurrentUserDetails(currentAccount)
  }, [currentAccount, appStatus])
  /**
   * check if there is an active wallet connection
   */
  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setAppStatus('noMetaMask')
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      })
      if (addressArray.length > 0) {
        setAppStatus('connected')
        setCurrentAccount(addressArray[0])
        createUserAccount(addressArray[0])
        
      } else {
        router.push('/')
        setAppStatus('notConnected')
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * initialize meta mask wallet
   */
  const connectWallet = async () => {
    if (!window.ethereum) return setAppStatus('noMetaMask')
    try {
      setAppStatus('loading')

      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (addressArray.length > 0) {
        setAppStatus('connected')
        setCurrentAccount(addressArray[0])
        createUserAccount(addressArray[0])
        
        
      } else {
        router.push('/')
        setAppStatus('notConnected')
      }
    } catch (error) {
      setAppStatus('error')
    }
  }
  /**
   * Creates an account in Sanity DB if the user does not already have one
   * @param {String} userWalletAddress Wallet address of the currently logged in user
   */
  const createUserAccount = async (userWalletAddress = currentAccount) => {
    if (!window.ethereum) return setAppStatus('noMetaMask')
    try {
      const userDoc = {
        _type: 'users',
        _id: userWalletAddress,
        name: 'Unnamed',
        isProfileImageNft: false,
        profileImage:
          'https://storage.googleapis.com/furcat.appspot.com/furcat-token.png',
        walletAddress: userWalletAddress,
      }

      await client.createIfNotExists(userDoc)
    } catch (error) {
      router.push('/')
      setAppStatus('error')
    }
  }

  const fetchTweets = async () => {
    const query = `
    *[_type == "tweets"]{
      "author": author->{name, walletAddress, profileImage, isProfileImageNft},
      tweet,
      timestamp
    }|order(timestamp desc)
  `
    const sanityResponse = await client.fetch(query);

    setTweets([])
    
    sanityResponse.forEach(async item => {
      const newItem = {
        tweet: item.tweet,
        timestamp: item.timestamp,
        author: {
          name: item.author.name,
          walletAddress: item.author.walletAddress,
          profileImage: profileImageUrl,
          isProfileImageNft: item.author.isProfileImageNft,
        },
      }
    })
    setTweets(prevState => [...prevState, newItem])
  }

  const getCurrentUserDetails = async (userAccount = currentAccount) => {
    if (appStatus !== 'connected') return

    const query = `
      *[_type == "users" && _id == "${userAccount}"]{
        "tweets": tweets[]->{timestamp, tweet}|order(timestamp desc),
        name,
        profileImage,
        isProfileImageNft,
        coverImage,
        walletAddress
      }
    `
    const response = await client.fetch(query)

    setCurrentUser({
      tweets: response[0].tweets,
      name: response[0].name,
     profileImage: response[0].profileImage,
      walletAddress: response[0].walletAddress,
      coverImage: response[0].coverImage,
      isProfileImageNft: response[0].isProfileImageNft,
    })
    
  }
  
 // const fetchTweets = async => {}

  return (
    <TwitterContext.Provider
    value={{
      appStatus,
      currentAccount,
      connectWallet,
      tweets,
      fetchTweets,
      setAppStatus,
      currentUser,
      getCurrentUserDetails,
    }}
    >
      {children}
    </TwitterContext.Provider>
  )
}
