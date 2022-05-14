import { sanityClient } from '../../lib/sanity'

const query = `
*[_type == "tweets"]{
  tweet,
  timestamp
}|order(timestamp desc)
`
export default function Home({ tweets }) {
    return (
      <div >
        <div >
          {tweets?.length > 0 &&
            tweets.map((tweet, timestamp) => (
              <div>
               <p2>{tweet.tweet}</p2>
               <p2>{tweet.timestamp}</p2>
             </div>
            ))}
        </div>
      </div>
    );
  }

export async function getStaticProps() {
    const tweets = await sanityClient.fetch(query);
    return {
      props: { tweets },
    };
  }
  