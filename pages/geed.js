import Link from 'next/link'
// import {  urlFor } from '../lib/sanity'
import { client } from '../lib/client'

const query = `*[_type == 'tweets']{_id, tweet, timestamp}`

export default function Geed({ tweets }) {
 console.log(tweets)
  return (
    <div>
      <h1>tweets</h1>
      <div>
        {tweets?.length > 0 &&
          tweets.map((item, index) => (
            <div >
              {item._id}
              <li key={item._id}>
                <Link href="/">
                  <a>
                    {/* <img src={urlFor(item.image).url()} /> */}
                    <p>This button</p>
                  </a>
                </Link>

                {/* <Link href='/'><a><img src="" alt=""/></a><span>{recipe.name}</span></Link> */}
              </li>
            </div>
          ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const tweets = await client.fetch(query)
   
  return {
    props: { tweets },
  };
}

// export default function Home({ recipes }) {
//   return (
//     <div >
//       <Head>
//         <title>Apps Kitchen</title>
//         <meta name="description" content="Generated by create next app" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <main >
//         <h1 className={styles.title}>Favorite Recipe</h1>
//         <div className={styles.grid}>
//           <a>
//             <h2></h2>
//             <p>Find in-depth information about pineapples and mangos</p>
//           </a>
//         </div>
//       </main>
//       <div >
//         {recipes?.length > 0 &&
//           recipes.map((recipe, index) => (
//             <div key={recipe._id}>
//               {recipe._id}
//             <li >
//               {/* <Link href='/'><a><img src="" alt=""/></a><span>{recipe.name}</span></Link> */}
//               <p2>{recipe.name}</p2>
//             </li>
//            </div>
//           ))}
//       </div>
//     </div>
//   );
// }

// export async function getStaticProps() {
//   const recipes = await sanityClient.fetch(recipesQuery);
//   return {
//     props: { recipes },
//   };
// }
