import '../styles/globals.css'
import '../lib/hexStyles.css'
import {TwitterProvider} from '../context/TwitterContext'

function MyApp({ Component, pageProps }) {
  console.log(42*3)
  return (
    <TwitterProvider>
      <Component {...pageProps} />
    </TwitterProvider>
  )
}

export default MyApp
