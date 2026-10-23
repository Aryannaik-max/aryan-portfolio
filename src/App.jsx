import Hero from './components/Hero'
import NovaSpacePage from './components/NovaSpacePage'
import CodeClashPage from './components/CodeClashPage'
import TechStackPage from './components/TechStackPage'
import ZoomIntoCard from './components/ZoomIntoCard'
import OpenSourcePage from './components/OpenSourcePage'
import ContactPage from './components/ContactPage'

// scroll fractions of the whole 700vh section: [start, end]
const card = {
  id: 'novaspace',
  zoom: [0.03, 0.15], // zoom from the hero into the NovaSpace card
  page: <NovaSpacePage />,
}

const next = [
  { enter: [0.25, 0.35], span: 0.12, page: <CodeClashPage /> }, // slides up, then throws its cards
  { enter: [0.43, 0.53], span: 0.12, page: <TechStackPage /> }, // slides up, then pills pop in
  { enter: [0.61, 0.71], span: 0.12, page: <OpenSourcePage /> },
  { enter: [0.79, 0.89], span: 0.12, page: <ContactPage /> },
]

const App = () => {
  return <ZoomIntoCard hero={<Hero />} card={card} next={next} />
}

export default App