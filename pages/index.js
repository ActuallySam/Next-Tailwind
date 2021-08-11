import Head from 'next/head';
import Header from '../components/Header';
import Banner from '../components/Banner';
import SmallCard from '../components/SmallCard';
import MediumCard from '../components/MediumCard';

export default function Home({ exploreData, cardsData }) {

  return (
    <div className="">

      <Head>
        <title>Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner /> 

      <main className="max-w-7xl mx-auto px-8 sm:pd-16">

        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

          {/* Pull some data from a server - API endpoints // Server Side Rendering (SSR) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map((item) => (
              <SmallCard
                key={item.img}
                img={item.img}
                location={item.location}
                distance={item.distance} />
            ))}
          </div>
        </section>


        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          <div className="flex space-x-3 overflow-scroll">
            {cardsData?.map(item => (
              <MediumCard 
                key={item.img}
                img={item.img}
                title={item.title} />
            ))}
          </div>
        </section>

      </main>

    </div>
  )
}

export async function getStaticProps() {
  const exploreData = await fetch('https://jsonkeeper.com/b/R4QG').then(
    (res) => res.json()
  );

  const cardsData = await fetch("https://jsonkeeper.com/b/5JXB").then(
    (res) => res.json()
  );

  return {
    props: {
      exploreData,
      cardsData
    },
  }; 
}