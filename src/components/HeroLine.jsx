import { useEffect, useRef } from 'react'

// The literal "line": a glowing equity curve that draws and drifts upward,
// with a pulsing leading edge. Robust sizing, never renders blank.
export default function HeroLine() {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let W = 0
    let H = 0
    let dpr = 1
    let raf = 0
    let t = 0

    const size = () => {
      const r = wrap.getBoundingClientRect()
      W = Math.max(1, Math.floor(r.width))
      H = Math.max(1, Math.floor(r.height))
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    size()
    const ro = new ResizeObserver(size)
    ro.observe(wrap)

    const N = 170
    const pts = []
    let v = 0
    for (let i = 0; i < N; i++) {
      v += (Math.random() - 0.44) * 1.0
      pts.push(v)
    }

    const draw = () => {
      try {
        if (W < 2 || H < 2) size()
        ctx.clearRect(0, 0, W, H)

        v += (Math.random() - 0.44) * 1.0
        pts.push(v)
        if (pts.length > N) pts.shift()

        let min = Infinity
        let max = -Infinity
        for (const p of pts) {
          if (p < min) min = p
          if (p > max) max = p
        }
        const span = max - min || 1
        const pad = H * 0.2
        const X = (i) => (i / (N - 1)) * W
        const Y = (p) => H - pad - ((p - min) / span) * (H - pad * 2)

        // area fill
        ctx.beginPath()
        ctx.moveTo(0, H)
        pts.forEach((p, i) => ctx.lineTo(X(i), Y(p)))
        ctx.lineTo(W, H)
        ctx.closePath()
        const g = ctx.createLinearGradient(0, 0, 0, H)
        g.addColorStop(0, 'rgba(0,255,156,0.14)')
        g.addColorStop(1, 'rgba(0,255,156,0)')
        ctx.fillStyle = g
        ctx.fill()

        // glow line
        ctx.beginPath()
        pts.forEach((p, i) => (i ? ctx.lineTo(X(i), Y(p)) : ctx.moveTo(X(i), Y(p))))
        ctx.strokeStyle = '#00FF9C'
        ctx.lineWidth = 2
        ctx.shadowColor = '#00FF9C'
        ctx.shadowBlur = 18
        ctx.stroke()
        ctx.shadowBlur = 0

        // leading dot + pulse
        const hx = X(N - 1)
        const hy = Y(pts[N - 1])
        const pulse = (Math.sin(t * 0.14) + 1) / 2
        ctx.beginPath()
        ctx.arc(hx, hy, 6 + pulse * 8, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0,255,156,${0.45 - pulse * 0.35})`
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(hx, hy, 3.2, 0, Math.PI * 2)
        ctx.fillStyle = '#00FF9C'
        ctx.shadowColor = '#00FF9C'
        ctx.shadowBlur = 12
        ctx.fill()
        ctx.shadowBlur = 0

        t++
      } catch (e) {
        /* keep looping */
      }
      raf = requestAnimationFrame(draw)
    }

    if (reduce) {
      // draw a static curve once
      draw()
      cancelAnimationFrame(raf)
    } else {
      raf = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
