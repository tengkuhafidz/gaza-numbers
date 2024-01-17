"use client"

import dayjs from "dayjs"
import Stat from "./Stat";
import { useEffect, useState } from "react";
import { FaChildren, FaUserDoctor } from "react-icons/fa6";
import { IoWoman } from "react-icons/io5";
import { MdRecordVoiceOver } from "react-icons/md";
import { GiAmbulance } from "react-icons/gi";
import CountUp from "react-countup";

export default function Home() {
  const [data, setData] = useState()

  useEffect(() => {
    fetch("https://data.techforpalestine.org/data/casualties_daily.json")
      .then(response => response.json())
      .then(dataArr => {
        // only use latest data
        setData(dataArr.slice(-1)[0])
      })
  }, [])

  if (!data) {
    return <></>
  }

  const { martyred_cum, ext_martyred_children_cum, ext_martyred_women_cum, injured_cum, ext_med_martyred_cum, ext_civdef_martyred_cum, ext_press_martyred_cum, report_date } = data
  const daysOfWarCrimes = dayjs().diff('2023-10-07', 'day')
  return (
    <div className=" bg-black">
      <main className='text-center p-8 max-w-xl mx-auto justify-center align-center items-center min-h-screen text-white'>
        <h1 className="text-4xl"><CountUp end={daysOfWarCrimes} /> days</h1>
        <p className="text-4xl"><CountUp end={martyred_cum} /> killed</p>
        <p className="text-4xl"><CountUp end={injured_cum} /> injured</p>
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
