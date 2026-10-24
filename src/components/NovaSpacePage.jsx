import React from 'react'
import ProjectPage from './ProjectPage'
import novaspaceProjectHome from '../assets/novaspace-project-home.png'
import novaspaceProjectFeatures from '../assets/novaspace-project-features.png'

const project = {
  index: 1,
  title: 'NovaSpace',
  tagline: 'One workspace. Every project.',
  description:
    'A collaborative workspace for teams. Write documents together in a real-time editor with live discussion threads, and run projects on a Kanban board that moves tasks from To-Do to In-Progress to Completed. Workspaces are isolated with JWT authentication, uploads go through Cloudinary, and the interface is fully responsive.',
  features: [
    'Real-time editor',
    'Team chat',
    'File management',
    'Task tracking',
    'Version history',
    'Secure & private',
  ],
  stack: ['React', 'Node.js', 'MySQL', 'Liveblocks', 'Cloudinary'],
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