"use client"

import { ReactNode } from "react"
import CountUp from "react-countup"

interface Props {
    title: string,
    icon: ReactNode
    numbers: number,
}

export default function Stat({ numbers, title, icon }: Props) {
    return (
        <div className="border rounded-lg my-4 p-4">
            <h2 className="text-xl">
                {icon}
                <CountUp end={numbers} />
                &nbsp;
                {title}
            </h2>
        </div>
    )
}