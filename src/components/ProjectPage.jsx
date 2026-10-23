import React, { useId } from 'react'
import { motion, motionValue, useTransform, cubicBezier } from 'framer-motion'
import { usePageProgress } from './pageProgress'
import Halftone from './HalfTone'
import Navbar from './Navbar'

const petals = [0, 60, 120, 180, 240, 300]

// used when a page isn't driven by scroll: everything counts as already landed
const DONE = motionValue(1)

// fast launch, soft landing
const launch = cubicBezier(0.16, 1, 0.3, 1)

// where each thrown card lands. range = slice of the page's own scroll (0..1)
const LAYOUT = [
  { top: '7%', left: '7%', deg: -6, spin: -50, fromX: -14, z: 1, range: [0.0, 0.34], bg: 'bg-mustard' },
  { top: '31%', left: '30%', deg: 4, spin: 60, fromX: 12, z: 2, range: [0.28, 0.62], bg: 'bg-coral' },
  { top: '55%', left: '11%', deg: -3, spin: -40, fromX: -6, z: 3, range: [0.56, 0.9], bg: 'bg-[#E6D2B0]' },
]

const ThrownCard = ({ progress, spec, title, index, card }) => {
  const t = useTransform(progress, spec.range, [0, 1], { ease: launch })
  const y = useTransform(t, (v) => `${(1 - v) * 120}vh`)
  const x = useTransform(t, (v) => `${(1 - v) * spec.fromX}vw`)
  const rotate = useTransform(t, (v) => spec.deg + (1 - v) * spec.spin)
  const scale = useTransform(t, (v) => 0.75 + 0.25 * v)

  return (
    <motion.div
      style={{ top: spec.top, left: spec.left, y, x, rotate, scale, zIndex: spec.z }}
      className={`absolute aspect-[16/10] w-[62%] overflow-hidden rounded-xl border-[3px] border-ink shadow-[6px_6px_0_#1B1A17] ${spec.bg}`}
    >
      {card?.src ? (
        <img src={card.src} alt={`${title} screenshot ${index + 1}`} className='h-full w-full object-cover object-top' />
      ) : (
        <div className='flex h-full items-end justify-between p-3 font-mono text-xs font-bold uppercase tracking-widest'>
          <span>{card?.label ?? `${title} screen`}</span>
          <span>0{index + 1}</span>
        </div>
      )}
    </motion.div>
  )
}

const rays = Array.from({ length: 16 }, (_, i) => i * 22.5)

const Shape = ({ shape, fill }) =>
  shape === 'sun' ? (
    <svg viewBox='0 0 200 200' className={`w-[95%] animate-[slow-spin_90s_linear_infinite] ${fill}`}>
      <circle cx='100' cy='100' r='46' />
      {rays.map((a) => (
        <rect key={a} x='96' y='6' width='8' height='34' rx='4' transform={`rotate(${a} 100 100)`} />
      ))}
    </svg>
  ) : (
    <svg viewBox='0 0 200 200' className={`w-[95%] animate-[slow-spin_90s_linear_infinite] ${fill}`}>
      <circle cx='100' cy='100' r='52' />
      {petals.map((a) => (
        <circle
          key={a}
          cx={100 + 58 * Math.cos((a * Math.PI) / 180)}
          cy={100 + 58 * Math.sin((a * Math.PI) / 180)}
          r='38'
        />
      ))}
    </svg>
  )

const ProjectPage = ({ project }) => {
  const {
    index,
    title,
    tagline,
    features = [],
    stack = [],
    live = '#',
    repo = '#',
    src = '',
    cards,
    pattern,
    accent = 'bg-mustard',
    panel = 'bg-coral', // images panel colour
    contentBg = '', // content panel colour (empty = cream)
    flowerFill = 'fill-cream', // shape colour
    shape = 'flower', // 'flower' | 'sun'
    flip = false, // images on the left
    cardBg, // st
    tilt = 'rotate-3',
  } = project

  const progress = usePageProgress() ?? DONE

  // unique id so several pages on the same screen don't share one grain filter
  const grainId = 'grain-' + useId().replace(/:/g, '')

  return (
    <div className='h-full w-full bg-coral'>
      <div className='relative flex h-full flex-col overflow-hidden border-[3px] border-ink bg-cream text-ink'>

        {/* paper grain overlay */}
     <svg
  aria-hidden
  className='pointer-events-none absolute inset-0 z-20 h-full w-full opacity-20 mix-blend-overlay'
>
  <filter id='paper-grain'>
    {/* Lower baseFrequency makes the grain particles larger and chunkier like film */}
    {/* Fewer octaves (e.g., 2 or 3) keep it looking organic rather than digital static */}
    <feTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' seed='2' stitchTiles='stitch' />
    
    {/* Enhanced contrast matrix to make the grain pop sharply */}
    <feColorMatrix
      type='matrix'
      values='0 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 0 0 2.5 -0.6'
    />
  </filter>
  <rect width='100%' height='100%' filter='url(#paper-grain)' />
</svg>

        <div className='grid flex-1 grid-cols-1 md:grid-cols-2'>

          {/* Section 1: content */}
     <div className={`relative flex flex-col justify-between gap-10 overflow-hidden border-b-[3px] border-ink p-6 md:border-b-0 md:p-10 ${flip ? 'md:border-l-[3px]' : 'md:border-r-[3px]'} ${contentBg}`}>

  <Navbar dark={contentBg === 'bg-ink'} />

 

  <div className='relative z-10'>
    <h2
      className='font-display font-black uppercase leading-[0.95] tracking-tight'
      style={{
        fontSize: 'clamp(2.75rem, 6vw, 6.5rem)',
        fontVariationSettings: '"SOFT" 100, "opsz" 144',
      }}
    >
      {title}
    </h2>
    <p className='mt-5 max-w-md text-base uppercase tracking-[0.12em] md:text-xl'>
      {tagline}
    </p>
  </div>

  <div className='relative z-10'>
    <ul className='flex flex-wrap gap-2'>
      {features.map((f) => (
        <li
          key={f}
          className='rounded-full border-2 border-ink px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em]'
        >
          {f}
        </li>
      ))}
    </ul>

    <ul className='mt-3 flex flex-wrap gap-2'>
      {stack.map((s) => (
        <li
          key={s}
          className={`rounded-full border-2 border-ink px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] ${accent}`}
        >
          {s}
        </li>
      ))}
    </ul>

    <div className='mt-6 flex flex-wrap gap-3'>
      <a
        href={live}
        target='_blank'
        rel='noreferrer'
        className='rounded-full border-2 border-ink bg-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-cream transition hover:-translate-y-0.5'
      >
        Live
      </a>
      <a
        href={repo}
        target='_blank'
        rel='noreferrer'
        className='rounded-full border-2 border-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition hover:bg-ink hover:text-cream'
      >
        Code
      </a>
    </div>
  </div>
</div>

          {/* Section 2: images */}
         <div className={`relative min-h-[420px] overflow-hidden md:min-h-0 ${panel} ${flip ? 'md:order-first' : ''}`}>
  <div className='absolute inset-0 flex items-center justify-center' aria-hidden>
    <Shape shape={shape} fill={flowerFill} />
  </div>
  <Halftone />

            {cards ? (
              LAYOUT.slice(0, cards.length).map((spec, i) => (
                <ThrownCard
                  key={i}
                  progress={progress}
                  spec={spec}
                  title={title}
                  index={i}
                  card={cards[i]}
                />
              ))
            ) : (
              <div
                className={`absolute left-1/2 top-1/2 aspect-[16/10] w-[78%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border-[3px] border-ink shadow-[6px_6px_0_#1B1A17] ${accent} ${tilt}`}
              >
                {src ? (
                  <img src={src} alt={`${title} screenshot`} className='h-full w-full object-cover object-top' />
                ) : (
                  <div className='flex h-full items-end p-3 font-mono text-xs font-bold uppercase tracking-widest'>
                    {title} screenshot here
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProjectPage