import React, { useId } from 'react'
import { motion, motionValue, useTransform, cubicBezier } from 'framer-motion'
import { usePageProgress } from './pageProgress'
import Halftone from './HalfTone'
import Navbar from './Navbar'

const DONE = motionValue(1) // used if the page isn't scroll-driven: everything shown
const pop = cubicBezier(0.16, 1, 0.3, 1)
const petals = [0, 60, 120, 180, 240, 300]

// pulled from the resume's Technical Skills section
const groups = [
  { title: 'Languages', items: ['C++', 'JavaScript', 'TypeScript', 'SQL', 'HTML', 'CSS'] },
  { title: 'Frontend', items: ['React.js', 'Next.js', 'Redux Toolkit', 'Tailwind CSS', 'Monaco Editor'] },
  { title: 'Backend', items: ['Node.js', 'Express.js', 'Socket.IO', 'Prisma ORM', 'Passport.js', 'JWT'] },
  { title: 'Databases & Infra', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Docker', 'Cloudinary'] },
  { title: 'Tools & Methods', items: ['Git', 'GitHub', 'Postman', 'Vercel', 'Render', 'Microservices', 'REST APIs'] },
]

const total = groups.reduce((n, g) => n + g.items.length, 0)
const allTools = groups.flatMap((g) => g.items)
// spread pill start points so the last pill still finishes before progress hits 1
const STEP = 0.8 / total

// one sticker-style tool pill, popping in at its own point in the page's scroll
const Pill = ({ progress, start, index, children }) => {
  const t = useTransform(progress, [start, start + 0.12], [0, 1], { ease: pop })
  const y = useTransform(t, (v) => `${(1 - v) * 60}px`)
  const rotate = useTransform(t, (v) => (1 - v) * (((index * 37) % 11) - 5) * 4)
  const scale = useTransform(t, (v) => 0.6 + 0.4 * v)
  const opacity = useTransform(t, [0, 0.4], [0, 1])

  return (
    <motion.li
      style={{ y, rotate, scale, opacity, fontSize: 'clamp(0.85rem, 1.15vw, 1.15rem)' }}
      className='cursor-default rounded-full border-2 border-ink bg-cream px-5 py-2 font-display font-bold uppercase leading-none tracking-tight shadow-[3px_3px_0_0_#1a1917] transition-colors duration-200 hover:bg-coral hover:text-cream'
    >
      {children}
    </motion.li>
  )
}

const TechStackPage = () => {
  const progress = usePageProgress() ?? DONE
  const grainId = 'grain-' + useId().replace(/:/g, '')
  const ringId = 'ring-' + useId().replace(/:/g, '')
  let n = -1

  return (
    <div className='h-full w-full bg-coral'>
      <div className='relative flex h-full flex-col overflow-hidden border-[3px] border-ink bg-cream text-ink'>

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

        <div className='grid flex-1 grid-cols-1 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]'>

          {/* left: title on a dark panel */}
          <div className='relative flex flex-col justify-between gap-10 overflow-hidden bg-ink p-6 text-cream md:p-10'>
            <Navbar dark />

            {/* blob pushed down + smaller so the title sits on black */}
            <svg
              aria-hidden
              viewBox='0 0 200 200'
              className='pointer-events-none absolute -bottom-[42%] -left-[25%] w-[90%] animate-[slow-spin_90s_linear_infinite] fill-[#4F8A8B]'
            >
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

            {/* spinning stamp */}
            {/* <motion.svg
              aria-hidden
              viewBox='0 0 120 120'
              className='pointer-events-none absolute right-6 top-6 z-10 w-24 md:right-10 md:top-8 md:w-32'
              animate={{ rotate: 360 }}
              transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
            >
              <defs>
                <path id={ringId} d='M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0' />
              </defs>
              <text className='fill-cream font-mono uppercase' style={{ fontSize: 9 }}>
                <textPath href={`#${ringId}`} textLength='272' lengthAdjust='spacing'>
                  UI • API • DB • DEPLOY • UI • API • DB • DEPLOY •
                </textPath>
              </text>
              <circle cx='60' cy='60' r='6' className='fill-coral' />
            </motion.svg> */}

            <h2
              className='relative z-10 flex-1 pt-50 font-display  font-black uppercase leading-[0.95] tracking-tight'
              style={{
                fontSize: 'clamp(2.75rem, 6vw, 6.5rem)',
                fontVariationSettings: '"SOFT" 100, "opsz" 144',
                wordSpacing: '0.12em',
              }}
            >
              The
              <br />
              techstack.
            </h2>
          </div>

          {/* right: category rows + ticker */}
          <div className='relative flex min-w-0 flex-col overflow-hidden bg-cream'>
            {/* dots toned down to texture level (tweak opacity-40 / opacity-60 to taste) */}
            <div className='absolute inset-0 opacity-50'>
              <Halftone />
            </div>
            <div className='relative z-10 flex flex-1 flex-col'>
              {groups.map((g, gi) => (
                <div
                  key={g.title}
                  className='flex flex-1 flex-col justify-center gap-3 border-b-[3px] border-ink px-6 py-4 md:px-10'
                >
                  <p className='self-start rounded-sm bg-cream px-2 py-1 font-mono text-[13px] font-semibold uppercase leading-relaxed tracking-[0.14em]'>
                    <span className='block font-bold text-[#b8341c]'>0{gi + 1}</span>
                    {g.title}
                  </p>
                  <ul className='flex flex-wrap items-center gap-3'>
                    {g.items.map((item) => {
                      n += 1
                      return (
                        <Pill key={item} progress={progress} start={n * STEP} index={n}>
                          {item}
                        </Pill>
                      )
                    })}
                  </ul>
                </div>
              ))}

              {/* endless ticker */}
              <div className='overflow-hidden bg-ink py-3 text-cream'>
                <motion.div
                  className='flex w-max whitespace-nowrap font-mono text-[15px] font-medium uppercase tracking-[0.2em]'
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ duration: 75, ease: 'linear', repeat: Infinity }}
                >
                  {[...allTools, ...allTools].map((tool, i) => (
                    <span key={i} className='flex items-center gap-8 pr-8'>
                      {tool}
                      <span className='text-coral'>✦</span>
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default TechStackPage