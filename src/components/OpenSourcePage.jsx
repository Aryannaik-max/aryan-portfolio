import React, { useId } from 'react'
import { motion, motionValue, useTransform, cubicBezier } from 'framer-motion'
import { usePageProgress } from './pageProgress'
import Halftone from './Halftone'
import Navbar from './Navbar'

const DONE = motionValue(1) // used if the page isn't scroll-driven: everything shown
const pop = cubicBezier(0.16, 1, 0.3, 1)

// edit status / href to match reality
const contributions = [
  {
    repo: 'iD Editor',
    org: 'OpenStreetMap',
    pr: '#12373',
    title: 'Safer external links',
    body: 'Fixed a marked()-generated link that was missing target="_blank" and rel="noopener noreferrer". Worked through maintainer feedback, a merge conflict and CI approval until it was mergeable.',
    type: 'Bug fix',
    status: 'Mergeable',
    href: 'https://github.com/openstreetmap/iD/pull/12373',
    tilt: -2,
  },
  {
    repo: 'Jasmine',
    org: 'Testing framework',
    pr: '#2107',
    title: 'pendingReason, traced',
    body: 'Tracked a bug in how pendingReason propagates through the framework, followed it across four files, and fixed it at the source.',
    type: 'Bug fix',
    status: 'Merged',
    href: 'https://github.com/jasmine/jasmine/pull/2107',
    tilt: 1.5,
  },
  {
    repo: 'kana-dojo',
    org: 'Japanese learning app',
    pr: 'PR #1',
    title: 'Content entry',
    body: 'Added a content entry to a Japanese-learning project and got it merged.',
    type: 'Content',
    status: 'Merged',
    href: 'https://github.com/aryannaik-max/kana-dojo',
    tilt: -1,
  },
]

// one PR ticket, thrown up from the bottom at its own point in the page's scroll
const Ticket = ({ progress, start, index, data }) => {
  const t = useTransform(progress, [start, start + 0.25], [0, 1], { ease: pop })
  const y = useTransform(t, (v) => `${(1 - v) * 140}px`)
  const rotate = useTransform(t, (v) => data.tilt + (1 - v) * (index - 1) * 18)
  const opacity = useTransform(t, [0, 0.3], [0, 1])

  const Foot = data.href ? 'a' : 'div'
  const footProps = data.href ? { href: data.href, target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <motion.li style={{ y, rotate, opacity }} className='relative'>
      <div className='group relative flex h-full flex-col border-[3px] border-ink bg-cream shadow-[6px_6px_0_0_#1a1917] transition-transform duration-300 hover:-translate-y-2 hover:rotate-1'>
        {/* status stamp */}
        <span className='absolute -right-3 -top-4 z-10 rotate-12 border-2 border-coral bg-cream px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-coral'>
          {data.status}
        </span>

        {/* top: repo + title */}
        <div className='flex flex-1 flex-col gap-3 p-5 md:p-6'>
          <p className='font-mono text-[11px] uppercase tracking-[0.2em]'>
            <span className='text-coral'>{data.pr}</span> / {data.org}
          </p>
          <h3
            className='font-display font-black uppercase leading-[0.95] tracking-tight'
            style={{
              fontSize: 'clamp(1.75rem, 3vw, 3rem)',
              fontVariationSettings: '"SOFT" 100, "opsz" 144',
            }}
          >
            {data.repo}
          </h3>
          <p className='font-display text-base font-bold uppercase leading-tight tracking-tight md:text-lg'>
            {data.title}
          </p>
          <p className='text-sm leading-relaxed'>{data.body}</p>
        </div>

        {/* stub */}
        <Foot
          {...footProps}
          className='flex items-center justify-between border-t-2 border-dashed border-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-200 hover:bg-ink hover:text-cream md:px-6'
        >
          <span>{data.type}</span>
          <span>{data.href ? 'View PR →' : '✦'}</span>
        </Foot>
      </div>
    </motion.li>
  )
}

const OpenSourcePage = () => {
  const progress = usePageProgress() ?? DONE
  const grainId = 'grain-' + useId().replace(/:/g, '')

  return (
    <div className='h-full w-full bg-coral'>
      <div className='relative flex h-full flex-col overflow-hidden border-[3px] border-ink bg-[#4F8A8B] text-ink'>

        {/* paper grain overlay */}
        <svg
          aria-hidden
          className='pointer-events-none absolute inset-0 z-20 h-full w-full opacity-10 mix-blend-multiply'
        >
          <filter id={grainId}>
            <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='2' stitchTiles='stitch' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1.8 -0.3'
            />
          </filter>
          <rect width='100%' height='100%' filter={`url(#${grainId})`} />
        </svg>

        {/* halftone dots toned down for texture contrast on teal */}
        <div className='absolute inset-0 opacity-30'>
          <Halftone />
        </div>

        <div className='relative z-10 flex min-h-0 flex-1 flex-col'>

          {/* header */}
          <div className='flex flex-col gap-4 border-b-[3px] border-ink px-6 py-6 md:flex-row md:items-end md:justify-between md:px-10'>
            <div className='flex-1'>
              <h2
                className='font-display font-black uppercase leading-[0.95] tracking-tight text-cream [text-shadow:2px_2px_0_#1a1917]'
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                  fontVariationSettings: '"SOFT" 100, "opsz" 144',
                }}
              >
                Fixed in public.
              </h2>
            </div>
            <p className='max-w-xs text-base uppercase h-full flex items-center tracking-[0.12em] md:text-right md:text-lg'>
              <Navbar />
            </p>
          </div>

          {/* tickets */}
          <ul className='grid flex-1 grid-cols-1 content-center gap-8 px-6 py-8 md:grid-cols-3 md:gap-8 md:px-10'>
            {contributions.map((c, i) => (
              <Ticket key={c.repo} progress={progress} start={i * 0.15} index={i} data={c} />
            ))}
          </ul>

          {/* footer strip */}
          <a
            href='https://github.com/Aryannaik-max'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center justify-between bg-ink px-6 py-3 font-mono text-sm uppercase tracking-[0.2em] text-cream transition-colors duration-200 hover:bg-coral md:px-10'
          >
            <span>github.com/Aryannaik-max</span>
            <span>See everything →</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default OpenSourcePage