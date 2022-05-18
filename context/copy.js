import { createContext, useEffect, useState } from 'react'
import { client } from '../lib/client'

export const TwitterContext = createContext()

export const TwitterProvider = ({ children }) => {
  const [tweets, setTweets] = useState([])

  const fetchTweets = async () => {
    const query = `
    *[_type == "tweets" ]{      
        tweet,
        timestamp
      }`
    const sanityResponse = await client.fetch(query)

    setTweets([])

    sanityResponse.forEach(async (item) => {
      const newItem = {
        tweet: item.tweet,
        timestamp: item.timestamp,
      }
      setTweets((prevState) => [...prevState, newItem])
    })
  }

  return (
    <TwitterContext.Provider
      value={{
        tweets,
        fetchTweets,
      }}
    >
      {children}
    </TwitterContext.Provider>
  )
}
