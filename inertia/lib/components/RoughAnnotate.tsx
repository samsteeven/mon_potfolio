// TypeScript React
import React, { useEffect, useRef } from 'react'
import { annotate } from 'rough-notation'

type RoughType =
  | 'underline'
  | 'box'
  | 'circle'
  | 'highlight'
  | 'strike-through'
  | 'crossed-off'
  | 'bracket'

type RoughProps = {
  children: React.ReactNode
  type?: RoughType
  color?: string
  strokeWidth?: number
  padding?: number | [number, number]
  animationDuration?: number
  iterations?: number
  show?: boolean
}

export function RoughAnnotate({
  children,
  type = 'underline',
  color = '#f59e0b',
  strokeWidth = 2,
  padding = 2,
  animationDuration = 800,
  iterations = 1,
  show = true,
}: RoughProps) {
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const annotation = annotate(ref.current, {
      type,
      color,
      strokeWidth,
      padding,
      animationDuration,
      iterations,
    } as any)

    if (show) {
      annotation.show()
    }

    return () => {
      try {
        annotation.remove()
      } catch {
        /* no-op */
      }
    }
  }, [type, color, strokeWidth, padding, animationDuration, iterations, show])

  return <span ref={ref}>{children}</span>
}
