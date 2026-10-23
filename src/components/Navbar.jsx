import React, { useState } from 'react'
import menu from '../assets/menu.png'

const Navbar = ({ dark = false }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* Header bar branding & hamburger button */}
      <div className={`relative z-30 flex items-center justify-between ${dark ? 'text-cream' : 'text-ink'}`}>
        <span className='font-display text-2xl font-black'>
        </span>

        <button
          onClick={toggleMenu}
          className={`group cursor-pointer rounded-lg border-ink p-1.5 transition ${
            dark ? 'hover:bg-cream hover:text-ink' : 'hover:bg-ink hover:text-cream'
          }`}
          aria-label='Open Menu'
        >
          <img
            src={menu}
            alt='Menu'
            className={`h-8 w-8 ${dark ? 'invert group-hover:invert-0' : 'group-hover:invert'}`}
          />
        </button>
      </div>

      {/* Full-screen Menu Drawer (Slides in from the Left) */}
      <div
        className={`fixed inset-0 z-50 flex h-screen w-screen flex-col justify-between bg-cream p-6 text-ink transition-transform duration-1500 ease-in-out md:p-10 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header inside overlay */}
        <div className='flex items-center justify-between pb-6'>
          {/* Close button */}
          <button
            onClick={closeMenu}
            className='flex ml-auto h-12 w-12 items-center justify-center rounded-full border-2 border-ink font-mono text-xl font-black transition hover:bg-ink hover:text-cream'
            aria-label='Close Menu'
          >
            ✕
          </button>
        </div>

        {/* Navigation Links */}
        <nav className='my-auto flex flex-col gap-40 font-display justify-center items-center font-black text-4xl uppercase sm:text-6xl md:text-7xl'>
          <a
            href='#projects'
            onClick={closeMenu}
            className='inline-block transition-transform duration-200 hover:translate-x-4 hover:text-coral'
          >
            01. Projects
          </a>
          <a
            href='#stack'
            onClick={closeMenu}
            className='inline-block transition-transform duration-200 hover:translate-x-4 hover:text-coral'
          >
            02. Stack
          </a>
          <a
            href='#opensource'
            onClick={closeMenu}
            className='inline-block transition-transform duration-200 hover:translate-x-4 hover:text-coral'
          >
            03. Open Source
          </a>
          <a
            href='#contact'
            onClick={closeMenu}
            className='inline-block transition-transform duration-200 hover:translate-x-4 hover:text-coral'
          >
            04. Contact
          </a>
        </nav>

        {/* Bottom Drawer Footer */}
      </div>
    </>
  )
}

export default Navbar