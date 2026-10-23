import React from 'react'
import ProjectPage from './ProjectPage'
import novaspaceProjectHome from '../assets/novaspace-project-home.png'
import novaspaceProjectFeatures from '../assets/novaspace-project-features.png'

const project = {
  index: 1,
  title: 'NovaSpace',
  tagline: 'One workspace. Every project.',
  features: [
    'Real-time editor',
    'Team chat',
    'File management',
    'Task tracking',
    'Version history',
    'Secure & private',
  ],
  stack: ['React', 'Node.js', 'MongoDB'], // edit to what NovaSpace really uses
  live: 'https://novaspace-seven.vercel.app/',
  repo: 'https://github.com/Aryannaik-max/Novaspace',
  cards: [
    { src: novaspaceProjectHome, label: 'Home' },
    { src: novaspaceProjectFeatures, label: 'Features' },
  ],
  accent: 'bg-mustard',
  cardBg: 'bg-cream',
  tilt: 'rotate-3',
  panel: 'bg-mustard',
  flowerFill: 'fill-cream',
}

const NovaSpacePage = () => <ProjectPage project={project} />

export default NovaSpacePage