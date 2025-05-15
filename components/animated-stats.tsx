"use client"

import { useEffect, useState, useRef } from "react"
import { useInView } from "react-intersection-observer"

interface StatProps {
  value: number
  label: string
  suffix?: string
  duration?: number
}

function AnimatedStat({ value, label, suffix = "", duration = 2000 }: StatProps) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  const countingDone = useRef(false)

  useEffect(() => {
    if (!inView || countingDone.current) return

    let start = 0
    const end = value
    const totalDuration = duration
    const incrementTime = totalDuration / end

    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= end) {
        clearInterval(timer)
        countingDone.current = true
      }
    }, incrementTime)

    return () => clearInterval(timer)
  }, [inView, value, duration])

  return (
    <div ref={ref} className="text-center p-6">
      <div className="text-4xl md:text-5xl font-bold text-accgk-blue mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  )
}

export default function AnimatedStats() {
  const stats = [
    { value: 1250, label: "Certified Caregivers", suffix: "+" },
    { value: 15, label: "Institutional Partners", suffix: "+" },
    { value: 8, label: "Training Programs", suffix: "" },
    { value: 95, label: "Satisfaction Rate", suffix: "%" },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accgk-blue">Our Impact in Numbers</h2>
          <div className="w-20 h-1 bg-accgk-pink mx-auto mb-8"></div>
          <p className="text-lg text-gray-700">
            ACCGK continues to make significant strides in professionalizing caregiving across Kenya.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <AnimatedStat key={index} value={stat.value} label={stat.label} suffix={stat.suffix} />
          ))}
        </div>
      </div>
    </section>
  )
}
