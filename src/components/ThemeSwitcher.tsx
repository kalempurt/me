import { IconSun, IconMoon } from '@tabler/icons-react'

interface Props {
  theme: 'dark' | 'light'
  onToggle: () => void
}

export function ThemeSwitcher({ theme, onToggle }: Props) {
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-1.5 px-2.5 py-1.5 border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 hover:border-neon-yellow/30 transition-all text-xs"
    >
      {theme === 'dark' ? <IconSun size={16} className="text-neon-yellow" /> : <IconMoon size={16} className="text-neon-yellow" />}
      <span className="capitalize">{next}</span>
    </button>
  )
}
