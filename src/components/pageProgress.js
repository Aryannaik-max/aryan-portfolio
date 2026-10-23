import { createContext, useContext } from 'react'

// 0 = page just landed, 1 = end of its own scroll stretch
export const PageProgressContext = createContext(null)
export const usePageProgress = () => useContext(PageProgressContext)