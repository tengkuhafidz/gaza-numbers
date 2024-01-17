"use client"

import CountUp from "react-countup"

interface Props {
    title: string,
    numbers: number,
}

export default function Headline({ numbers, title }: Props) {
    return (
        <h1 className="text-4xl"><CountUp end={numbers} /> {title}</h1>
    )
}