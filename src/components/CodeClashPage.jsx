import React from 'react'
import ProjectPage from './ProjectPage'
import codeclashHome from '../assets/codeclash-project-home.png'
import codeclashProfile from '../assets/codeclash-project-profile.png'
import codeclashMatch from '../assets/codeclash-project-match.png'

const project = {
  index: 2,
  title: 'CodeClash',
  tagline: 'A pixel-art Wild West duel.',
  features: ['Pixel-art arena', 'Start a match', 'Login & signup'],
  stack: ['React', 'Node.js', 'Socket.io'],
  live: 'https://code-clash-pi.vercel.app/',
  repo: 'https://github.com/Aryannaik-max/CodeClash',
  cards: [
    { src: codeclashHome, label: 'Landing' },
    { src: codeclashProfile, label: 'Profile' },
    { src: codeclashMatch, label: 'Match' },
  ],
  accent: 'bg-mustard',          // stack pills pick up the game's gold
  contentBg: '',                 // cream paper, no more coral
  panel: 'bg-[#4F8A8B]',         // dusty desert-sky teal, contrasts the orange screenshots
  shape: 'sun',
  flowerFill: 'fill-[#F2E3BC]',  // pale parchment sun, reads as a glow behind the cards
  flip: true,
}

const CodeClashPage = () => <ProjectPage project={project} />

export default CodeClashPage