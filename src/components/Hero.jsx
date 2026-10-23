  import React from 'react'
  import novaspace from '../assets/novaspace.png'
  import codeclashHero from '../assets/codeclash-hero.png'
  import Navbar from './Navbar'
  import Halftone from './HalfTone'

    const cards = [
      { name: 'CodeClash', bg: 'bg-mustard', rotate: '-rotate-6', deg: -6, pos: 'top-[8%] left-[8%]', src: codeclashHero },
    { name: 'NovaSpace', bg: 'bg-coral', rotate: 'rotate-3', deg: 3, zoom: true, pos: 'top-[36%] left-[28%]', src: novaspace },
  ]

  const petals = [0, 60, 120, 180, 240, 300]

  const Hero = () => {
    return (
      <div className='w-full min-h-screen md:h-screen bg-coral'>
        
        <div className='relative flex h-full min-h-[calc(100vh-1.5rem)] flex-col overflow-hidden border-[3px] border-ink bg-cream text-ink md:min-h-0'>

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
            <div className='flex flex-col justify-between gap-16 border-b-[3px] border-ink p-6 md:border-b-0 md:border-r-[3px] md:p-10'>
              
              {/* Navbar component housing logo, hamburger icon & full-screen overlay */}
              <Navbar />

              <h1
                className='mt-4 font-display font-black uppercase leading-[0.95] tracking-tight md:mt-10'
                style={{
                  fontSize: 'clamp(3rem, 7vw, 7.5rem)',
                  fontVariationSettings: '"SOFT" 100, "opsz" 144',
                }}
              >
                  I build
                  <br />
                  web apps
                  <br />
                  end to end.
              </h1>

              <p className='text-base uppercase tracking-[0.12em] md:text-xl'>
                Full-stack developer · Open to internships
              </p>
            </div>

            {/* Section 2: images */}
            <div className='relative min-h-[480px] overflow-hidden bg-coral md:min-h-0'>
              <Halftone/>
              <div className='absolute inset-0 flex items-center justify-center' aria-hidden>
                <svg viewBox='0 0 200 200' className='w-[95%] animate-[slow-spin_90s_linear_infinite] fill-cream'>
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
              </div>

              {cards.map((c, i) => (
                <div
                  key={c.name}
                  data-rotate={c.deg}
                  data-zoom-target={c.name.toLowerCase()}
                  className={`absolute aspect-[16/10] w-[62%] overflow-hidden rounded-xl border-[3px] border-ink shadow-[6px_6px_0_#1B1A17] transition hover:-translate-y-1 ${c.bg} ${c.rotate} ${c.pos}`}
                >
                  {c.src ? (
                    <img src={c.src} alt={`${c.name} preview`} className='h-full w-full object-cover object-top' />
                  ) : (
                    <div className='flex h-full items-end justify-between p-3 font-mono text-xs font-bold uppercase tracking-widest'>
                      <span>{c.name}</span>
                      <span>0{1 - i + 1}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    )
  }

  export default Hero