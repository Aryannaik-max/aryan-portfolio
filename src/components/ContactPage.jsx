import React, { useId, useState, useRef, useEffect } from 'react'
import { motion, motionValue, useTransform, cubicBezier } from 'framer-motion'
import { usePageProgress } from './pageProgress'
import Halftone from './HalfTone'
import Navbar from './Navbar'

const DONE = motionValue(1)
const pop = cubicBezier(0.16, 1, 0.3, 1)

const EMAIL = 'aryannaik365@gmail.com'
const RESUME_URL = '/resume.pdf'

const MAIL_SUBJECT = 'Internship opportunity: saw your portfolio'
const MAIL_BODY = `Hi Aryan,

I came across your portfolio and wanted to reach out about...

`
const enc = encodeURIComponent
const MAILTO = `mailto:${EMAIL}?subject=${enc(MAIL_SUBJECT)}&body=${enc(MAIL_BODY)}`
// opens a Gmail compose window with your address in the "To" field
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(EMAIL)}&su=${enc(MAIL_SUBJECT)}&body=${enc(MAIL_BODY)}`

const links = [
  { label: 'GitHub', handle: 'Aryannaik-max', href: 'https://github.com/Aryannaik-max' },
  { label: 'LinkedIn', handle: 'aryan-naik', href: 'https://linkedin.com/in/aryan-naik-a75b98324' },
  { label: 'Codeforces', handle: 'holy_lodge_14', href: 'https://codeforces.com/profile/holy_lodge_14' },
]

const copyText = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

const ContactPage = () => {
  const progress = usePageProgress() ?? DONE
  const grainId = 'grain-' + useId().replace(/:/g, '')
  const ringId = 'ring-' + useId().replace(/:/g, '')

  // 'idle' | 'copied' | 'failed'
  const [copyState, setCopyState] = useState('idle')
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const handleCopy = async () => {
    const ok = await copyText(EMAIL)
    setCopyState(ok ? 'copied' : 'failed')
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopyState('idle'), 2000)
  }

  const handleEmail = (e) => {
    e.preventDefault()
    window.open(GMAIL_COMPOSE, '_blank', 'noopener,noreferrer')
  }

  // postcard gets thrown up from the bottom
  const t = useTransform(progress, [0, 0.3], [0, 1], { ease: pop })
  const y = useTransform(t, (v) => `${(1 - v) * 160}px`)
  const rotate = useTransform(t, (v) => 2 + (1 - v) * 20)
  const opacity = useTransform(t, [0, 0.3], [0, 1])

  return (
    <div className='h-full w-full bg-coral'>
      <div className='relative flex h-full flex-col overflow-hidden border-[3px] border-ink bg-cream text-ink'>

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

        <div className='grid flex-1 grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]'>
          <div className='relative flex min-w-0 flex-col justify-between gap-8 overflow-hidden bg-coral p-6 text-cream md:p-10'>
            <Navbar />

            <div className='relative z-10 flex flex-1 flex-col justify-center'>
              <h2
                className='font-display font-black uppercase leading-[0.9] tracking-tight'
                style={{
                  fontSize: 'clamp(3.5rem, 9vw, 9rem)',
                  fontVariationSettings: '"SOFT" 100, "opsz" 144',
                  wordSpacing: '0.12em',
                }}
              >
                Let&apos;s
                <br />
                talk.
              </h2>

              {/* solid ink instead of faded cream, so it reads on coral */}
              <p className='mt-6 max-w-sm text-base font-medium uppercase tracking-[0.12em] text-ink md:text-xl'>
                Full-stack developer · Open to internships
              </p>

              <div className='mt-8 flex flex-wrap gap-4'>
                <a
                  href={MAILTO}
                  onClick={handleEmail}
                  className='border-[3px] border-ink bg-ink px-6 py-3 font-mono text-sm font-bold uppercase tracking-[0.2em] text-cream shadow-[5px_5px_0_0_#1a1917] transition-all duration-200 hover:-translate-y-1 hover:bg-cream hover:text-ink'
                >
                  Email me →
                </a>
                <a
                  href={RESUME_URL}
                  download
                  className='border-[3px] border-ink bg-cream px-6 py-3 font-mono text-sm font-bold uppercase tracking-[0.2em] text-ink shadow-[5px_5px_0_0_#1a1917] transition-all duration-200 hover:-translate-y-1 hover:bg-ink hover:text-cream'
                >
                  Resume ↓
                </a>
              </div>

            </div>
          </div>
          <div className='relative flex min-w-0 items-center justify-center overflow-hidden bg-cream p-6 md:p-10'>
            <Halftone />

            <motion.div
              style={{ y, rotate, opacity }}
              className='relative z-10 w-full max-w-xl border-[3px] border-ink bg-cream shadow-[10px_10px_0_0_#1a1917]'
            >
              {/* postmark */}
              {/* <motion.svg
                aria-hidden
                viewBox='0 0 120 120'
                className='pointer-events-none absolute -left-8 -top-10 z-10 w-24 md:w-28'
                animate={{ rotate: 360 }}
                transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
              >
                <defs>
                  <path id={ringId} d='M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0' />
                </defs>
                <circle cx='60' cy='60' r='56' className='fill-cream stroke-ink' strokeWidth='2' />
                <text className='fill-ink font-mono uppercase' style={{ fontSize: 9 }}>
                  <textPath href={`#${ringId}`} textLength='272' lengthAdjust='spacing'>
                    HIRE ME • HIRE ME • HIRE ME • HIRE ME • HIRE ME •
                  </textPath>
                </text>
                <circle cx='60' cy='60' r='6' className='fill-coral' />
              </motion.svg> */}

              <div className='flex items-start justify-between border-b-[3px] border-ink p-6 md:p-7'>
                <p className='font-mono text-xs uppercase leading-relaxed tracking-[0.2em] md:text-sm'>
                  Postcard
                  <br />
                  <span className='text-coral'>To: whoever&apos;s hiring</span>
                </p>
                <div className='flex h-20 w-[4.5rem] items-center justify-center border-2 border-dashed border-ink bg-mustard text-center font-mono text-xs font-bold uppercase leading-tight tracking-widest md:h-24 md:w-20'>
                  Full
                  <br />
                  stack
                </div>
              </div>

              <div className='flex flex-col'>
                {links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group flex items-center justify-between gap-4 border-b-2 border-ink px-6 py-5 transition-colors duration-200 last:border-b-0 hover:bg-ink hover:text-cream md:px-7 md:py-6'
                  >
                    <span>
                      <span className='block font-mono text-xs uppercase tracking-[0.2em] text-coral md:text-sm'>
                        {l.label}
                      </span>
                      <span className='block font-display text-xl font-black uppercase leading-tight tracking-tight md:text-3xl'>
                        {l.handle}
                      </span>
                    </span>
                    <span className='font-mono text-2xl transition-transform duration-200 group-hover:translate-x-1'>
                      →
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ContactPage