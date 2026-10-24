import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  easeInOut,
} from 'framer-motion'
import { PageProgressContext } from './pageProgress'

// position of an element inside `root`, ignoring CSS transforms
const layoutOf = (el, root) => {
  let x = 0
  let y = 0
  let n = el
  while (n && n !== root) {
    x += n.offsetLeft
    y += n.offsetTop
    const p = n.offsetParent
    if (p) {
      x += p.clientLeft
      y += p.clientTop
    }
    n = p
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight }
}

const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
const ease01 = (x) => ease(Math.min(1, Math.max(0, x)))

const sections = [
  { hash: 'contact', start: 0.89 },
  { hash: 'opensource', start: 0.71 },
  { hash: 'stack', start: 0.53 },
  { hash: 'projects', start: 0.15 },
]

const updateUrlHash = (progress) => {
  const section = sections.find(({ start }) => progress >= start)
  const hash = section ? `#${section.hash}` : ''
  const nextUrl = `${window.location.pathname}${window.location.search}${hash}`

  if (window.location.pathname + window.location.search + window.location.hash !== nextUrl) {
    window.history.replaceState(null, '', nextUrl)
  }
}

// the card's project page, living inside the card's rectangle in the hero
const CardLayer = ({ geo, progress, zoom, children }) => {
  const t = useTransform(progress, (p) => ease01((p - zoom[0]) / (zoom[1] - zoom[0])))
  const opacity = useTransform(t, [0.3, 0.6], [0, 1])
  const frameOpacity = useTransform(t, [0.55, 0.85], [1, 0])
  const radius = useTransform(t, [0.5, 0.9], [12, 0])
  const events = useTransform(opacity, (v) => (v > 0.6 ? 'auto' : 'none'))

  return (
    <motion.div
      style={{
        left: geo.cx - geo.w / 2,
        top: geo.cy - geo.h / 2,
        width: geo.w,
        height: geo.h,
        rotate: geo.deg,
        opacity,
        borderRadius: radius,
        pointerEvents: events,
      }}
      className='absolute z-30 overflow-hidden bg-[#fffdf5]'
    >
      {/* full-size page, shrunk by 1/S so the zoom brings it back to exactly 100% */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: geo.W,
          height: geo.H,
          transform: `translate(-50%, -50%) scale(${1 / geo.S})`,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        {children}
      </div>

      <motion.div
        style={{ opacity: frameOpacity, borderRadius: radius }}
        className='pointer-events-none absolute inset-0 border-[3px] border-ink'
      />
    </motion.div>
  )
}

// a full-screen slide that rises from the bottom and lays on top of what's below
const SlideUpLayer = ({ progress, enter, span = 0.3, index, children }) => {
  const y = useTransform(progress, enter, ['115%', '0%'], { ease: easeInOut })
  const dim = useTransform(
    progress,
    [enter[0], (enter[0] + enter[1]) / 2, enter[1]],
    [0, 0.35, 0],
  )
  const local = useTransform(progress, [enter[1], enter[1] + span], [0, 1])
  const events = useTransform(progress, (p) => (p >= enter[1] - 0.02 ? 'auto' : 'none'))

  return (
    <>
      {/* darkens whatever this slide is about to cover */}
      <motion.div
        style={{ opacity: dim, zIndex: 40 + index * 2 }}
        className='pointer-events-none absolute inset-0 bg-black'
      />
      <motion.div
        style={{ y, pointerEvents: events, zIndex: 41 + index * 2 }}
        className='absolute inset-0 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.35)]'
      >
        <PageProgressContext.Provider value={local}>{children}</PageProgressContext.Provider>
      </motion.div>
    </>
  )
}

// card = { id, zoom: [start, end], page }
// next = [{ enter: [start, end], page }]  (each slides up over the previous one)
const ZoomIntoCard = ({ hero, card, next = [] }) => {
  const sectionRef = useRef(null)
  const worldRef = useRef(null)
  const geoRef = useRef(null)
  const [geo, setGeo] = useState(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return

    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView()
    })
  }, [])

  // slight dimming of the page underneath as the next slide covers it
  const firstEnter = next[0]?.enter
  const dim = useTransform(
    scrollYProgress,
    firstEnter ? [firstEnter[0], (firstEnter[0] + firstEnter[1]) / 2, firstEnter[1]] : [2, 3],
    firstEnter ? [0, 0.35, 0] : [0, 0],
  )

  // zoom the hero into the card
  const apply = (p) => {
    const world = worldRef.current
    const g = geoRef.current
    if (!world || !g) return

    const v = ease01((p - card.zoom[0]) / (card.zoom[1] - card.zoom[0]))

    // once the first slide fully covers the screen, stop painting the hero
    const coverEnd = next[0]?.enter[1]
    world.style.visibility = coverEnd !== undefined && p >= coverEnd ? 'hidden' : 'visible'

    if (v === 0) {
      world.style.transform = 'none'
      return
    }
    const s = 1 + (g.S - 1) * v
    const px = g.cx + (g.W / 2 - g.cx) * v
    const py = g.cy + (g.H / 2 - g.cy) * v
    world.style.transform = `translate(${px}px, ${py}px) scale(${s}) rotate(${-g.deg * v}deg) translate(${-g.cx}px, ${-g.cy}px)`
  }
  useMotionValueEvent(scrollYProgress, 'change', apply)
  useMotionValueEvent(scrollYProgress, 'change', updateUrlHash)

  useLayoutEffect(() => {
    const measure = () => {
      const world = worldRef.current
      const el = world?.querySelector(`[data-zoom-target="${card.id}"]`)
      if (!world || !el) return
      const { x, y, w, h } = layoutOf(el, world)
      const W = world.clientWidth
      const H = world.clientHeight
      const g = {
        cx: x + w / 2,
        cy: y + h / 2,
        w,
        h,
        W,
        H,
        deg: Number(el.dataset.rotate || 0),
        S: Math.max(W / w, H / h), // zoom needed for the card to cover the screen
      }
      geoRef.current = g
      setGeo(g)
      apply(scrollYProgress.get())
    }

    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('load', measure)
    document.fonts?.ready.then(measure)
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)
    }
  }, [])

  return (
    <section ref={sectionRef} className='relative h-[700vh]'>
      <div aria-hidden='true' className='pointer-events-none absolute inset-0'>
        <span id='projects' className='absolute left-0 top-[90vh]' />
        <span id='stack' className='absolute left-0 top-[360vh]' />
        <span id='opensource' className='absolute left-0 top-[468vh]' />
        <span id='contact' className='absolute left-0 top-[594vh]' />
      </div>
      <div className='sticky top-0 h-screen overflow-hidden bg-coral'>
        <div ref={worldRef} className='absolute inset-0 origin-top-left'>
          {hero}
          {geo && (
            <CardLayer geo={geo} progress={scrollYProgress} zoom={card.zoom}>
              {card.page}
            </CardLayer>
          )}
        </div>

        <motion.div
          style={{ opacity: dim }}
          className='pointer-events-none absolute inset-0 z-[35] bg-black'
        />

       {next.map((n, i) => (
  <SlideUpLayer key={i} progress={scrollYProgress} enter={n.enter} span={n.span} index={i}>
    {n.page}
  </SlideUpLayer>
))}
      </div>
    </section>
  )
}

export default ZoomIntoCard