'use client'

import { useEffect, useRef } from 'react'

interface GradeCircleProps {
  grade: number
}

export default function GradeCircle({ grade }: GradeCircleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return '#10b981' // green
    if (percentage >= 80) return '#059669' // emerald
    if (percentage >= 70) return '#d97706' // amber
    if (percentage >= 60) return '#ea580c' // orange
    return '#dc2626' // red
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = 50
    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    const centerX = size / 2
    const centerY = size / 2
    const radius = size / 2 - 4

    // Background circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.fillStyle = '#f3f4f6'
    ctx.fill()

    // Progress arc
    const startAngle = -0.5 * Math.PI
    const endAngle = startAngle + (grade / 100) * 2 * Math.PI
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, startAngle, endAngle)
    ctx.lineTo(centerX, centerY)
    ctx.fillStyle = getGradeColor(grade)
    ctx.fill()

    // Inner donut hole
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI)
    ctx.fillStyle = 'white'
    ctx.fill()

    // Text: show numeric grade
    ctx.fillStyle = '#111827'
    ctx.font = 'bold 14px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(`${grade}`, centerX, centerY)
  }, [grade])

  return <canvas ref={canvasRef} className="h-10 w-10" />
}
