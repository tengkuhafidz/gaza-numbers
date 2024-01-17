import dayjs from "dayjs";
import { Metadata } from "next";
import { FaChildren, FaUserDoctor } from "react-icons/fa6";
import { GiAmbulance } from "react-icons/gi";
import { IoWoman } from "react-icons/io5";
import { MdRecordVoiceOver } from "react-icons/md";
import abbreviate from 'number-abbreviate';
import Headline from "./Headline";
import Stat from "./Stat";


async function getData() {
  const res = await fetch('https://data.techforpalestine.org/api/v1/summary.json')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return await res.json()
}

export async function generateMetadata(
): Promise<Metadata> {
  const { martyred } = await getData()
  const daysOfWarCrimes = dayjs().diff('2023-10-07', 'day')

  const title = 'Gaza in Numbers 🇵🇸'
  const description = 'Stay informed on the latest Gaza-Nakba numbers'
  const ogImgTitle = `${daysOfWarCrimes} Days. ${abbreviate(martyred.total)}+ Killed.`
  const ogImgFooter = '#CeasefireNOW'

  return {
    title,
    description,
    metadataBase: new URL('https://gazanumbers.jariyah.app'),
    openGraph: {
      title,
      description: description,
      siteName: title,
      images: `https://og.tailgraph.com/og?fontFamily=Roboto&title=${encodeURIComponent(ogImgTitle)}&titleTailwind=font-bold%20text-6xl%20text-white&text=${encodeURIComponent(description)}&textTailwind=text-2xl%20mt-4%20text-white&logoTailwind=h-8&bgTailwind=bg-black&footer=${encodeURIComponent(ogImgFooter)}&footerTailwind=text-white&t=1705504316657&refresh=1`,
    }
  }
}


export default async function Home() {
  const { martyred, injured, lastDailyUpdate } = await getData()
  const { total, children, women, civilDefence, press, medical } = martyred

  const daysOfWarCrimes = dayjs().diff('2023-10-07', 'day')

  return (
    <div className=" bg-black">
      <main className='text-center p-8 max-w-xl mx-auto justify-center align-center items-center min-h-screen text-white'>
        <Headline numbers={daysOfWarCrimes} title="days" />
        <Headline numbers={total} title="killed" />
        <Headline numbers={injured.total} title="injured" />
        <div className="py-12">
          <p>Amongst those who have martyred:</p>
          <Stat numbers={children} title={"Children"} icon={<FaChildren className="text-4xl text-center block mx-auto" />} />
          <Stat numbers={women} title={"Women"} icon={<IoWoman className="text-4xl text-center block mx-auto" />} />
          <Stat numbers={press} title={"Journalists"} icon={<MdRecordVoiceOver className="text-4xl text-center block mx-auto" />} />
          <Stat numbers={medical} title={"Medical Personnels"} icon={<FaUserDoctor className="text-4xl text-center block mx-auto" />} />
          <Stat numbers={civilDefence} title={"Emergency Personnels"} icon={<GiAmbulance className="text-4xl text-center block mx-auto" />} />
        </div>

        <div className="text-sm font-light ">
          <p>Data from: <a href="https://data.techforpalestine.org/docs/summary/" target="_blank" className="underline">data.techforpalestine.org</a></p>
          <p>Last updated: {dayjs(lastDailyUpdate).format('DD MMM YYYY')}</p>
        </div>
      </main>
    </div>
  )
}
