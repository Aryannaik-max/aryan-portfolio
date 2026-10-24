import React from 'react'
import ProjectPage from './ProjectPage'
import codeclashHome from '../assets/codeclash-project-home.png'
import codeclashProfile from '../assets/codeclash-project-profile.png'
import codeclashMatch from '../assets/codeclash-project-match.png'

const project = {
  index: 2,
  title: 'CodeClash',
  tagline: 'A pixel-art Wild West duel.',
  description:
    'A 1v1 competitive programming platform. Two players are matched into a live duel, solve the same problem, and get judged against hidden test cases. Every match moves your Elo rating, so the bounty on your wanted poster reflects how you actually play. Code runs remotely through the Wandbox API, and match state stays in sync over Socket.IO with a Redis adapter.',
  features: ['Pixel-art arena', 'Start a match', 'Login & signup'],
  stack: ['Next.js', 'TypeScript', 'Socket.IO', 'PostgreSQL', 'Prisma', 'Redis'],
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