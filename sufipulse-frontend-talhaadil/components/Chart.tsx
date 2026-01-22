"use client"

import { useEffect, useRef } from "react"

interface ChartProps {
  data: { name: string; value: number }[]
  title: string
}

export default function Chart({ data, title }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set canvas size
    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2)

    const width = canvas.offsetWidth
    const height = canvas.offsetHeight
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Find max value
    const maxValue = Math.max(...data.map((d) => d.value))

    // Draw bars
    const barWidth = (chartWidth / data.length) * 0.8
    const barSpacing = (chartWidth / data.length) * 0.2

    data.forEach((item, index) => {
      const barHeight = (item.value / maxValue) * chartHeight
      const x = padding + index * (barWidth + barSpacing)
      const y = height - padding - barHeight

      // Draw bar
      ctx.fillStyle = "#064e3b" // emerald-900
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw label
      ctx.fillStyle = "#1e293b" // slate-800
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(item.name, x + barWidth / 2, height - padding + 20)

      // Draw value
      ctx.fillStyle = "#f8fafc" // slate-50
      ctx.fillText(item.value.toString(), x + barWidth / 2, y - 5)
    })
  }, [data])

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      <canvas ref={canvasRef} className="w-full h-64" style={{ width: "100%", height: "256px" }} />
    </div>
  )
}
