import dayjs from "dayjs"
import Stat from "./Stat";
import { FaChildren, FaUserDoctor } from "react-icons/fa6";
import { IoWoman } from "react-icons/io5";
import { MdRecordVoiceOver } from "react-icons/md";
import { GiAmbulance } from "react-icons/gi";
import CountUp from "react-countup";
import Headline from "./Headline";

async function getData() {
  const res = await fetch('https://data.techforpalestine.org/data/casualties_daily.json')
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  const matyredRecords = await res.json()
  // only return latest data
  return matyredRecords.slice(-1)[0]
}


export default async function Home() {
  const latestMatyredRecord = await getData()

  const { martyred_cum, ext_martyred_children_cum, ext_martyred_women_cum, injured_cum, ext_med_martyred_cum, ext_civdef_martyred_cum, ext_press_martyred_cum, report_date } = latestMatyredRecord
  const daysOfWarCrimes = dayjs().diff('2023-10-07', 'day')
  return (
    <div className=" bg-black">
      <main className='text-center p-8 max-w-xl mx-auto justify-center align-center items-center min-h-screen text-white'>
        <Headline numbers={daysOfWarCrimes} title="days" />
        <Headline numbers={martyred_cum} title="killed" />
        <Headline numbers={injured_cum} title="injured" />
        <div className="py-12">
          <p>Amongst those who have matyred:</p>
          <Stat numbers={ext_martyred_children_cum} title={"Children"} icon={<FaChildren className="text-4xl text-center block mx-auto" />} />
          <Stat numbers={ext_martyred_women_cum} title={"Women"} icon={<IoWoman className="text-4xl text-center block mx-auto" />} />
          <Stat numbers={ext_press_martyred_cum} title={"Journalists"} icon={<MdRecordVoiceOver className="text-4xl text-center block mx-auto" />} />
          <Stat numbers={ext_med_martyred_cum} title={"Medical Personnels"} icon={<FaUserDoctor className="text-4xl text-center block mx-auto" />} />
          <Stat numbers={ext_civdef_martyred_cum} title={"Emergency Personnels"} icon={<GiAmbulance className="text-4xl text-center block mx-auto" />} />
        </div>

        <div className="text-sm font-light ">
          <p>Data from: <a href="https://data.techforpalestine.org/docs/casualties-daily/" target="_blank" className="underline">data.techforpalestine.org</a></p>
          <p>Last updated: {dayjs(report_date).format('DD MMM YYYY')}</p>
        </div>
      </main>
    </div>
  )
}
