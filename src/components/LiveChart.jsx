import { useEffect, useRef } from 'react'

// A looping, self-drawing chart demo: candles form, a zone prints,
// the code fires entry / stop / target, and a pip counter runs to TARGET HIT.
export default function LiveChart() {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const C = {
      grid: '#0d1712',
      band: 'rgba(0,255,156,0.09)',
      bandEdge: '#0b6b45',
      up: '#00FF9C',
      down: '#255c44',
      wick: '#2c5a45',
      phos: '#00FF9C',
      red: '#FF5C5C',
      mute: '#5E7268',
    }

    let W = 0
    let H = 0
    let dpr = 1
    let raf = 0
    let live = true

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = wrap.getBoundingClientRect()
      W = Math.max(1, Math.floor(r.width))
      H = Math.max(1, Math.floor(r.height))
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    const io = new IntersectionObserver(
      (e) => e.forEach((x) => (live = x.isIntersecting)),
      { threshold: 0.05 }
    )
    io.observe(wrap)

    // ---- scenario: chop -> drop into zone -> rip to target ----
    function scenario() {
      const n = 62
      const drop = 16
      const zone = 28
      const bars = []
      let p = 4351 + (Math.random() * 8 - 4)
      for (let i = 0; i < n; i++) {
        let d
        if (i < drop) d = (Math.random() - 0.5) * 1.7
        else if (i < zone) d = -(0.7 + Math.random() * 1.5)
        else d = 0.85 + Math.random() * 1.7
        const o = p
        p += d + (Math.random() - 0.5) * 0.7
        const c = p
        bars.push({
          o,
          c,
          h: Math.max(o, c) + Math.random() * 1.1,
          l: Math.min(o, c) - Math.random() * 1.1,
        })
      }
      let lowIdx = zone
      let low = Infinity
      for (let i = drop; i < zone + 4; i++)
        if (bars[i].l < low) {
          low = bars[i].l
          lowIdx = i
        }
      const zoneLo = low - 0.6
      const zoneHi = low + 3.4
      const entry = zoneHi + 1.1
      const stop = zoneLo - 3.2
      let high = -Infinity
      for (let i = lowIdx; i < n; i++) high = Math.max(high, bars[i].h)
      const target = high - 0.8
      return { bars, zoneLo, zoneHi, entry, stop, target, entryIdx: lowIdx + 1 }
    }

    let sc = scenario()
    let shown = reduce ? sc.bars.length : 15
    let sub = 0
    let phase = 'run' // run | hit | reset
    let hold = 0
    let flash = 0
    const VIS = 44
    const PAD = 18

    const lerp = (a, b, t) => a + (b - a) * t

    function loop() {
      if (live && !reduce) {
        if (phase === 'run') {
          sub += 0.085
          if (sub >= 1) {
            sub = 0
            shown++
            if (shown >= sc.bars.length) {
              shown = sc.bars.length
              phase = 'hit'
              hold = 0
              flash = 1
            }
          }
        } else if (phase === 'hit') {
          hold += 1
          flash = Math.max(0, flash - 0.02)
          if (hold > 130) phase = 'reset'
        } else {
          sc = scenario()
          shown = 15
          sub = 0
          phase = 'run'
        }
      }
      draw()
      raf = requestAnimationFrame(loop)
    }

    function draw() {
      try {
      if (W < 2 || H < 2) resize()
      ctx.clearRect(0, 0, W, H)
      const start = Math.max(0, shown - VIS)
      const view = sc.bars.slice(start, shown)
      if (!view.length) return

      let lo = Infinity
      let hi = -Infinity
      view.forEach((k) => {
        lo = Math.min(lo, k.l)
        hi = Math.max(hi, k.h)
      })
      lo = Math.min(lo, sc.zoneLo, sc.stop)
      hi = Math.max(hi, sc.zoneHi, sc.target)
      const r = hi - lo
      lo -= r * 0.06
      hi += r * 0.06

      const y = (price) => PAD + ((hi - price) / (hi - lo)) * (H - PAD * 2)
      const cw = W / VIS
      const bw = Math.max(2, cw * 0.58)

      // grid
      ctx.strokeStyle = C.grid
      ctx.lineWidth = 1
      for (let g = 0; g <= 4; g++) {
        const gy = PAD + ((H - PAD * 2) * g) / 4
        ctx.beginPath()
        ctx.moveTo(0, gy)
        ctx.lineTo(W, gy)
        ctx.stroke()
      }

      // supply zone
      const zTop = y(sc.zoneHi)
      const zBot = y(sc.zoneLo)
      ctx.fillStyle = C.band
      ctx.fillRect(0, zTop, W, zBot - zTop)
      ctx.strokeStyle = C.bandEdge
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(0, zTop)
      ctx.lineTo(W, zTop)
      ctx.moveTo(0, zBot)
      ctx.lineTo(W, zBot)
      ctx.stroke()
      ctx.setLineDash([])

      // trade overlay (after entry reached)
      const armed = shown > sc.entryIdx
      if (armed) {
        const drawLevel = (price, color, dash, tag) => {
          ctx.strokeStyle = color
          ctx.setLineDash(dash)
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(0, y(price))
          ctx.lineTo(W, y(price))
          ctx.stroke()
          ctx.setLineDash([])
          ctx.fillStyle = color
          ctx.font = '600 10px "JetBrains Mono", monospace'
          ctx.textAlign = 'right'
          const ly = y(price)
          const off = ly < 58 ? 14 : -4
          ctx.fillText(tag + ' ' + price.toFixed(1), W - 6, ly + off)
        }
        drawLevel(sc.target, C.phos, [6, 4], 'TP')
        drawLevel(sc.entry, C.phos, [], 'ENTRY')
        drawLevel(sc.stop, C.red, [3, 3], 'SL')
      }

      // candles
      view.forEach((k, i) => {
        const isLast = start + i === shown - 1 && phase === 'run'
        const c = isLast
          ? { o: k.o, h: lerp(k.o, k.h, sub), l: lerp(k.o, k.l, sub), c: lerp(k.o, k.c, sub) }
          : k
        const x = i * cw + cw / 2
        const up = c.c >= c.o
        ctx.strokeStyle = C.wick
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(x, y(c.h))
        ctx.lineTo(x, y(c.l))
        ctx.stroke()
        ctx.fillStyle = up ? C.up : C.down
        const top = Math.min(y(c.o), y(c.c))
        ctx.fillRect(x - bw / 2, top, bw, Math.max(1.5, Math.abs(y(c.c) - y(c.o))))
      })

      // running pip counter
      if (armed) {
        const lastClose = sc.bars[Math.min(shown, sc.bars.length) - 1].c
        const pips = Math.max(0, Math.round((lastClose - sc.entry) * 10))
        const hitNow = phase === 'hit'
        // backing panel so text never collides with level lines
        ctx.fillStyle = 'rgba(5,7,6,0.82)'
        ctx.fillRect(10, 12, 210, 42)
        ctx.textAlign = 'left'
        ctx.font = '800 20px "JetBrains Mono", monospace'
        if (hitNow && flash > 0) {
          ctx.shadowColor = C.phos
          ctx.shadowBlur = 22 * flash
        }
        ctx.fillStyle = C.phos
        ctx.fillText((hitNow ? 'TARGET HIT ' : '') + '+' + pips + ' pips', 16, 34)
        ctx.shadowBlur = 0
        ctx.font = '600 10px "JetBrains Mono", monospace'
        ctx.fillStyle = C.mute
        ctx.fillText(hitNow ? 'position closed' : 'position open · long', 16, 49)
      }
      } catch (e) {
        /* keep the loop alive */
      }
    }

    if (reduce) draw()
    else raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return (
    <div className="frame overflow-hidden">
      <div className="frame-bar">
        <span className="flex gap-1.5">
          <span className="h-2 w-2 border border-line2" />
          <span className="h-2 w-2 border border-line2" />
          <span className="h-2 w-2 bg-phosdim" />
        </span>
        <span className="font-display text-[10px] tracking-[0.14em] text-mute">
          xauusd — engine view
        </span>
        <span className="ml-auto flex items-center gap-2 font-display text-[10px] tracking-[0.14em] text-phos">
          <span className="h-1.5 w-1.5 rounded-full bg-phos" />
          LIVE
        </span>
      </div>
      <div ref={wrapRef} className="relative h-[280px] w-full bg-ink sm:h-[360px]">
        <canvas ref={canvasRef} className="block h-full w-full" />
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-line bg-panel2 px-4 py-2 font-display text-[10px] tracking-[0.14em] text-mute sm:px-5">
        <span>ZONE: LOCKED</span>
        <span className="hidden sm:inline">ENTRY · STOP · TARGET</span>
        <span>REPAINT: OFF</span>
        <span className="ml-auto text-phosdim">simulated replay — for illustration</span>
      </div>
    </div>
  )
}
