import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { IconCalendarEvent, IconExternalLink, IconUsers } from '@tabler/icons-react'
import { projects } from '../data/content'

type FilterType = 'all' | 'active' | 'archive'

function StudyMarker({ project }: { project: typeof projects[number] }) {
  const { t } = useTranslation()
  return (
    <div className="relative pl-10 pb-8">
      <div className="absolute left-[5px] top-1.5 w-[13px] h-[13px] border-2 border-neon-yellow bg-light-bg dark:bg-dark-bg z-10" />
      <div className="absolute left-[9px] top-5 bottom-0 w-px bg-neon-yellow/30" />
      <div className="pl-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] text-neon-yellow font-medium">{project.startDate}</span>
          {project.links.length > 0 && project.links.map(link => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-neon-yellow hover:underline"
            >
              <IconExternalLink size={11} />
              {link.label}
            </a>
          ))}
        </div>
        <div className="text-xs text-gray-500 mt-0.5">{project.title}</div>
        <div className="text-[11px] text-gray-400 mt-0.5">{t(project.descKey)}</div>
      </div>
    </div>
  )
}

export function Roadmap() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<FilterType>('all')

  const filters: FilterType[] = ['all', 'active', 'archive']
  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => p.tags.includes(filter))

  return (
    <section id="roadmap" className="px-4 py-4">
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-xl bg-white/80 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 p-6 md:p-8 transition-colors">
          <h2 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-2">
            <IconCalendarEvent size={22} className="text-neon-yellow" />
            <span className="text-gray-400">{'>'}{' '}</span>
            {t('roadmap.title')}
          </h2>

          <div className="flex gap-2 mb-8">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 text-xs md:text-sm border transition-colors ${
                  filter === f
                    ? 'bg-neon-yellow/20 border-neon-yellow text-neon-yellow'
                    : 'border-black/10 dark:border-white/10 text-gray-500 hover:border-black/30 dark:hover:border-white/30'
                }`}
              >
                {t(`roadmap.${f}`)}
              </button>
            ))}
          </div>

          <div className="relative">
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-neon-yellow via-neon-plum to-transparent" />

            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => {
                if (item.type === 'study') {
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      <StudyMarker project={item} />
                    </motion.div>
                  )
                }

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="relative pl-10 pb-8 last:pb-0"
                  >
                    <div className="absolute left-[5px] top-1.5 w-[13px] h-[13px] border-2 border-neon-plum bg-light-bg dark:bg-dark-bg z-10" />

                    <div className="backdrop-blur-lg bg-white/50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 p-4 md:p-5 hover:border-neon-yellow/30 transition-all">
                      <div className="flex flex-wrap items-center gap-2 text-[10px] md:text-xs text-gray-500 mb-2">
                        <span>{item.startDate}</span>
                        {item.endDate && (
                          <>
                            <span>&mdash;</span>
                            <span>{item.endDate}</span>
                          </>
                        )}
                        <span className="text-gray-600">&#183;</span>
                        <span className="text-neon-yellow">{item.type}</span>
                      </div>

                      <h3 className="font-bold text-sm md:text-base mb-1">{item.title}</h3>

                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
                        {t(item.descKey)}
                      </p>

                      {item.stack && item.stack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {item.stack.map(s => (
                            <span key={s} className="px-2 py-0.5 text-[10px] border border-neon-plum/40 text-neon-plum">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}

                      {item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {item.tags.map(tag => (
                            <span
                              key={tag}
                              className={`px-2 py-0.5 text-[10px] border ${
                                tag === 'active'
                                  ? 'border-neon-yellow/50 text-neon-yellow'
                                  : tag === 'archive'
                                  ? 'border-gray-500/50 text-gray-400'
                                  : 'border-neon-plum/50 text-neon-plum'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {item.contributors && item.contributors.length > 0 && (
                        <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                          <IconUsers size={13} className="text-gray-500 shrink-0" />
                          {item.contributors.map((c, ci) => (
                            <span key={c.name} className="flex items-center gap-1 text-[11px] text-gray-400">
                              {ci > 0 && <span className="text-gray-600">&amp;</span>}
                              <img src={c.avatar} alt={c.name} className="w-4 h-4" />
                              <span>{c.name}</span>
                            </span>
                          ))}
                        </div>
                      )}

                      {item.links.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.links.map(link => (
                            <a
                              key={link.url}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] text-neon-yellow hover:underline"
                            >
                              <IconExternalLink size={11} />
                              {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
