import React, { useState } from 'react';
import { ArrowUpRight, Code2, Sparkles, X, ChevronLeft, ChevronRight, Smartphone } from 'lucide-react';
import { PROJECTS, type ProjectCategory, type ProjectScreenshot } from '../data/projects';

interface ProjectGalleryProps {
  baseUrl?: string;
}

const CATEGORIES: { key: 'all' | ProjectCategory; label: string }[] = [
  { key: 'all', label: '全部作品' },
  { key: 'flagship', label: '旗舰音乐 App' },
  { key: 'ios-demo', label: 'iOS 经典仿写' },
  { key: 'learning', label: '系统学习库' },
];

export default function ProjectGallery({ baseUrl = '/' }: ProjectGalleryProps) {
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all');
  const [lightbox, setLightbox] = useState<{
    shots: ProjectScreenshot[];
    index: number;
    projectName: string;
  } | null>(null);

  const resolveUrl = (path: string) => {
    if (/^https?:\/\//i.test(path)) return path;
    const normBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const normPath = path.startsWith('/') ? path.slice(1) : path;
    return `${normBase}${normPath}`;
  };

  const visibleProjects =
    filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div>
      {/* Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {CATEGORIES.map((cat) => {
          const active = filter === cat.key;
          const count =
            cat.key === 'all'
              ? PROJECTS.length
              : PROJECTS.filter((p) => p.category === cat.key).length;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setFilter(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                active
                  ? 'bg-[var(--accent)] text-white shadow-md shadow-violet-500/20'
                  : 'bg-[var(--bg-pill)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]'
              }`}
            >
              <span>{cat.label}</span>
              <span className="font-mono text-[10px] opacity-80">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {visibleProjects.map((project) => (
          <article
            key={project.id}
            id={project.id}
            className="bento-card p-6 sm:p-8 scroll-mt-24 specular-edge"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              {/* Left Info */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${project.iconGradient} flex items-center justify-center text-white text-xl font-bold shadow-lg shrink-0`}
                  >
                    {project.iconSymbol}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                        {project.name}
                      </h2>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                      {project.period} · {project.tagline}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {project.description}
                </p>

                {/* Engineering Highlights */}
                <div className="p-4 rounded-2xl bg-[var(--bg-pill)] border border-[var(--border-subtle)] space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)]">
                    <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>工程亮点与难点突破</span>
                  </div>
                  <ul className="space-y-1.5">
                    {project.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="text-xs sm:text-[13px] text-[var(--text-secondary)] flex items-start gap-2"
                      >
                        <span className="text-[var(--accent)] mt-0.5">▹</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack & Action Links */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-[var(--bg-pill)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2.5">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-[var(--accent)] text-white hover:brightness-110 transition-all"
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        GitHub 源码
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.noteUrl && (
                      <a
                        href={resolveUrl(project.noteUrl)}
                        target={/^https?:\/\//i.test(project.noteUrl) ? '_blank' : undefined}
                        rel={/^https?:\/\//i.test(project.noteUrl) ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-xs font-medium bg-[var(--bg-pill)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent)] transition-all"
                      >
                        开发总结 {/^https?:\/\//i.test(project.noteUrl) ? '↗' : '→'}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Real iOS Simulator Screenshots Gallery (MyMusic) */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="mt-6 pt-6 border-t border-[var(--border-subtle)]">
                <div className="flex items-center justify-between mb-3">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    <span>iOS 真机 / 模拟器实拍界面（点击可放大查看）</span>
                  </div>
                  <span className="text-[11px] font-mono text-[var(--text-muted)]">
                    {project.screenshots.length} 张精选画面
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {project.screenshots.map((shot, sIdx) => (
                    <button
                      key={shot.src}
                      type="button"
                      onClick={() =>
                        setLightbox({
                          shots: project.screenshots!,
                          index: sIdx,
                          projectName: project.shortName,
                        })
                      }
                      className="group text-left rounded-2xl overflow-hidden bg-black/30 border border-[var(--border-subtle)] hover:border-[var(--accent)] transition-all cursor-pointer"
                    >
                      <div className="aspect-[9/19] overflow-hidden">
                        <img
                          src={resolveUrl(shot.src)}
                          alt={shot.caption}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="px-2.5 py-2 text-[10.5px] text-[var(--text-secondary)] truncate">
                        {shot.caption}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Screenshot Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-lg flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-md w-full flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between text-white text-xs font-mono">
              <span>
                {lightbox.projectName} · {lightbox.index + 1} / {lightbox.shots.length}
              </span>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer"
                aria-label="关闭预览"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative flex items-center justify-center w-full">
              <button
                type="button"
                onClick={() =>
                  setLightbox((lb) =>
                    lb ? { ...lb, index: (lb.index - 1 + lb.shots.length) % lb.shots.length } : null
                  )
                }
                className="absolute -left-2 sm:-left-12 p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white cursor-pointer"
                aria-label="上一张"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="rounded-[28px] p-2 bg-zinc-900 border border-white/20 shadow-2xl max-h-[75vh] overflow-hidden">
                <img
                  src={resolveUrl(lightbox.shots[lightbox.index].src)}
                  alt={lightbox.shots[lightbox.index].caption}
                  className="max-h-[70vh] w-auto rounded-[22px] object-contain"
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  setLightbox((lb) =>
                    lb ? { ...lb, index: (lb.index + 1) % lb.shots.length } : null
                  )
                }
                className="absolute -right-2 sm:-right-12 p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white cursor-pointer"
                aria-label="下一张"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-white/90 text-center font-medium">
              {lightbox.shots[lightbox.index].caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
