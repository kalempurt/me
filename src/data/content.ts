interface Skill {
  name: string
  level: number
  max: number
}

interface Contributor {
  name: string
  avatar: string
}

interface Project {
  id: string
  type: 'study' | 'project'
  startDate: string
  endDate?: string
  title: string
  descKey: string
  tags: Array<'active' | 'archive' | 'learning'>
  links: Array<{ url: string; label: string }>
  contributors?: Contributor[]
  stack?: string[]
}

export const personalInfo = {
  name: 'Andrey',
  nicknames: ['kalempurt', 'v0k1nt'],
  avatar: 'https://avatars.githubusercontent.com/u/105550112?v=4',
  birthday: '2008-10-27',
  location: 'Moscow, Russia',
  defaultTimezone: 'Europe/Moscow',
  discordNick: 'v0k1nt',
}

export const skills: Skill[] = [
  { name: 'Python', level: 4, max: 4 },
  { name: 'FastAPI', level: 3.5, max: 4 },
  { name: 'JavaScript / TypeScript', level: 2.5, max: 4 },
  { name: 'React', level: 3, max: 4 },
  { name: 'SQL / PostgreSQL', level: 2, max: 4 },
  { name: 'Docker', level: 3, max: 4 },
  { name: 'Git', level: 4, max: 4 },
]

export const projects: Project[] = [
  {
    id: 'lyceum-start',
    type: 'study',
    startDate: '2022-09',
    title: 'Yandex Lyceum',
    descKey: 'project.lyceumStart',
    tags: ['learning'],
    links: [
      { url: 'https://lyceum.yandex.ru/', label: 'Yandex Lyceum' },
      { url: 'https://lyceum.yandex.ru/industrial', label: 'Industrial Python' },
    ],
  },
  {
    id: 'yandex-project-2',
    type: 'project',
    startDate: '2024-01',
    title: 'YandexProject2',
    descKey: 'project.yandex2',
    tags: ['archive'],
    stack: ['Python', 'Pygame'],
    links: [{ url: 'https://github.com/kalempurt/YandexProject2', label: 'GitHub' }],
    contributors: [{ name: 'Nikiton-prog', avatar: 'https://avatars.githubusercontent.com/Nikiton-prog?v=4' }],
  },
  {
    id: 'yandex-project-3',
    type: 'project',
    startDate: '2024-04',
    title: 'YandexProject3',
    descKey: 'project.yandex3',
    tags: ['archive'],
    stack: ['Python', 'Flask'],
    links: [{ url: 'https://github.com/kalempurt/YandexProject3', label: 'GitHub' }],
    contributors: [
      { name: 'Nikiton-prog', avatar: 'https://avatars.githubusercontent.com/Nikiton-prog?v=4' },
      { name: 'hot220', avatar: 'https://avatars.githubusercontent.com/hot220?v=4' },
    ],
  },
  {
    id: 'lyceum-end',
    type: 'study',
    startDate: '2024-06',
    title: 'Yandex Lyceum',
    descKey: 'project.lyceumEnd',
    tags: ['learning'],
    links: [],
  },
  {
    id: 'aniparser',
    type: 'project',
    startDate: '2025-06',
    title: 'AniParser',
    descKey: 'project.aniparser',
    tags: ['active'],
    stack: ['Flask', 'JavaScript', 'HTML'],
    links: [{ url: 'https://github.com/kalempurt/AniParser', label: 'GitHub' }],
  },
  {
    id: 'hoshi',
    type: 'project',
    startDate: '2026',
    title: 'hoshi',
    descKey: 'project.hoshi',
    tags: ['active'],
    stack: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Docker', 'GitHub Actions', 'Bash'],
    links: [
      { url: 'https://github.com/hoshi-app', label: 'GitHub' },
      { url: 'https://hoshi.tv', label: 'hoshi.tv' },
    ],
  },
]
