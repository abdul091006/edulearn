'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import type { Submission } from '@/types/submission'

interface GradeSummaryProps {
  submissions: Submission[]
}

export default function GradesSummary({ submissions }: GradeSummaryProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const calculateStats = () => {
    if (submissions.length === 0) {
      return {
        average: 0,
        highest: 0,
        lowest: 0,
        totalCompleted: 0,
        letterGrade: 'N/A',
      }
    }

    const percentages = submissions.map((s) => s.grade).filter((g): g is number => g !== undefined)

    if (percentages.length === 0) {
      return {
        average: 0,
        highest: 0,
        lowest: 0,
        totalCompleted: 0,
        letterGrade: 'N/A',
      }
    }

    const average = percentages.reduce((a, b) => a + b, 0) / percentages.length
    const highest = Math.max(...percentages)
    const lowest = Math.min(...percentages)
    const totalCompleted = percentages.length

    let letterGrade = 'F'
    if (average >= 90) letterGrade = 'A'
    else if (average >= 80) letterGrade = 'B'
    else if (average >= 70) letterGrade = 'C'
    else if (average >= 60) letterGrade = 'D'

    return {
      average: parseFloat(average.toFixed(1)),
      highest: parseFloat(highest.toFixed(1)),
      lowest: parseFloat(lowest.toFixed(1)),
      totalCompleted,
      letterGrade,
    }
  }

  const stats = calculateStats()

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return '#10b981' // green
    if (percentage >= 80) return '#059669' // emerald
    if (percentage >= 70) return '#d97706' // amber
    if (percentage >= 60) return '#ea580c' // orange
    return '#dc2626' // red
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Support high-DPI / Retina display
    const size = 160
    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    // Calculate center and radius
    const centerX = size / 2
    const centerY = size / 2
    const radius = size / 2 - 10

    // Draw background circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.fillStyle = '#f3f4f6'
    ctx.fill()

    // Draw progress arc
    const startAngle = -0.5 * Math.PI // Start at top
    const endAngle = startAngle + (stats.average / 100) * 2 * Math.PI

    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, startAngle, endAngle)
    ctx.lineTo(centerX, centerY)
    ctx.fillStyle = getGradeColor(stats.average)
    ctx.fill()

    // Draw inner circle (donut hole)
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.7, 0, 2 * Math.PI)
    ctx.fillStyle = 'white'
    ctx.fill()

    // Draw text
    ctx.fillStyle = '#111827' 
    ctx.font = 'bold 32px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(stats.letterGrade, centerX, centerY - 10)

    ctx.fillStyle = '#6b7280'
    ctx.font = '16px sans-serif'
    ctx.fillText(`${stats.average}%`, centerX, centerY + 15)
  }, [stats])

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-bold text-gray-800">Grade Summary</h2>

      <div className="mb-6 flex justify-center">
        <canvas ref={canvasRef} className="h-40 w-40" />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between rounded-lg bg-gray-50 p-3">
          <span className="text-sm font-medium text-gray-600">Assignments</span>
          <span className="font-medium text-gray-900">{stats.totalCompleted}</span>
        </div>
        <div className="flex justify-between rounded-lg bg-gray-50 p-3">
          <span className="text-sm font-medium text-gray-600">Average</span>
          <span className="font-medium" style={{ color: getGradeColor(stats.average) }}>
            {stats.average}%
          </span>
        </div>
        <div className="flex justify-between rounded-lg bg-gray-50 p-3">
          <span className="text-sm font-medium text-gray-600">Highest</span>
          <span className="font-medium" style={{ color: getGradeColor(stats.highest) }}>
            {stats.highest}%
          </span>
        </div>
        <div className="flex justify-between rounded-lg bg-gray-50 p-3">
          <span className="text-sm font-medium text-gray-600">Lowest</span>
          <span className="font-medium" style={{ color: getGradeColor(stats.lowest) }}>
            {stats.lowest}%
          </span>
        </div>
      </div>
    </div>
  )
}
