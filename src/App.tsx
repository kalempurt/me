import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Hero } from './components/Hero'
import { Skills } from './components/Skills'
import { Roadmap } from './components/Roadmap'
import { Layout } from './components/Layout'

function App() {
  const { i18n } = useTranslation()
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark'
    const stored = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  const toggleTheme = useCallback(() => {
    setGlitching(true)
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    setTimeout(() => setGlitching(false), 300)
  }, [])

  return (
    <Layout theme={theme} onToggleTheme={toggleTheme} glitching={glitching}>
      <Hero />
      <Skills />
      <Roadmap />
    </Layout>
  )
}

export default App
