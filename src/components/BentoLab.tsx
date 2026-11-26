import React, { useState } from 'react';
import {
  MapPin,
  ArrowUpRight,
  Sparkles,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Compass,
  Heart,
} from 'lucide-react';
import { SITE_PROFILE, KNOWLEDGE_CAPSULES } from '../data/profile';
import { PROJECTS } from '../data/projects';
import { LIFE_SLIDES, LIFE_ESSAYS } from '../data/life';

interface BentoLabProps {
  baseUrl?: string;
}

export default function BentoLab({ baseUrl = '/' }: BentoLabProps) {
  const resolveUrl = (path: string) => {
    if (/^https?:\/\//i.test(path)) return path;
    const normBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const normPath = path.startsWith('/') ? path.slice(1) : path;
    return `${normBase}${normPath}`;
  };

  // Interactive App Showcase Cabinet (tommywutong.cn inspiration)
  const showcaseApps = PROJECTS.slice(0, 6);
  const [activeAppIdx, setActiveAppIdx] = useState(0);
  const activeApp = showcaseApps[activeAppIdx];

  // Interactive Persona Flip Card
  const [personaFlipped, setPersonaFlipped] = useState(false);

  // Interactive Photo Slice Mini-Deck
  const [photoIdx, setPhotoIdx] = useState(0);
  const currentPhoto = LIFE_SLIDES[photoIdx];

  // Interactive iOS & C Knowledge Lab (right tall column)
  const [activeCapIdx, setActiveCapIdx] = useState(0);
  const [capSearch, setCapSearch] = useState('');
  const filteredCaps = KNOWLEDGE_CAPSULES.filter(
    (c) =>
      !capSearch.trim() ||
      c.topic.toLowerCase().includes(capSearch.toLowerCase()) ||
      c.question.toLowerCase().includes(capSearch.toLowerCase()) ||
      c.summary.toLowerCase().includes(capSearch.toLowerCase()) ||
      c.tag.toLowerCase().includes(capSearch.toLowerCase())
  );
  const activeCap = filteredCaps[activeCapIdx] || filteredCaps[0] || KNOWLEDGE_CAPSULES[0];

  // Real Geolocation distance to Xi'an (34.1536° N, 108.9016° E)
  const [geoState, setGeoState] = useState<'idle' | 'locating' | 'ready' | 'denied'>('idle');
  const [distanceKm, setDistanceKm] = useState<number | null>(null);

  const handleLocate = () => {
    if (geoState === 'locating') return;
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setGeoState('denied');
      return;
    }
    setGeoState('locating');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const toRad = (deg: number) => (deg * Math.PI) / 180;
        const lat1 = 34.1536;
        const lon1 = 108.9016;
        const lat2 = pos.coords.latitude;
        const lon2 = pos.coords.longitude;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
        const km = Math.round(6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
        setDistanceKm(km);
        setGeoState('ready');
      },
      () => {
        setGeoState('denied');
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 }
    );
  };

  return (
    <section id="home-lab" className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 reveal">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.22em] text-[var(--accent)]">
            01 · PERSONAL LAB BENTO
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1.5 text-[var(--text-primary)]">
            个人技术实验室概览
          </h2>
        </div>
        <p className="text-sm text-[var(--text-secondary)] max-w-md">
          把学习足迹、iOS 作品柜、底层知识胶囊与日常切片浓缩在一张星轨面板里。
        </p>
      </div>

      {/* 12-Column Responsive Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* LEFT + MIDDLE 8 COLUMNS */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-8 gap-4 sm:gap-5">
          {/* Card 1: Location Map Card (Xi'an · 3G Lab) */}
          <div className="md:col-span-5 bento-card p-5 overflow-hidden flex flex-col justify-between min-h-[225px] group specular-edge">
            {/* Stylized Dark Street Map SVG Background */}
            <svg
              className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
              viewBox="0 0 420 240"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <path d="M0 52 H420 M0 118 H420 M0 186 H420" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
              <path d="M72 0 V240 M176 0 V240 M288 0 V240 M368 0 V240" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
              <path
                d="M-20 198 C95 162, 175 112, 265 92 C325 78, 378 46, 440 24"
                stroke="#56c7ff"
                strokeOpacity="0.45"
                strokeWidth="2.5"
              />
              <path
                d="M112 0 L198 118 L242 240"
                stroke="#8b7bff"
                strokeOpacity="0.35"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <text x="18" y="138" fill="currentColor" fillOpacity="0.3" fontSize="9" fontFamily="monospace">
                CHANG&apos;AN · XI&apos;AN
              </text>
              <text x="275" y="176" fill="currentColor" fillOpacity="0.3" fontSize="9" fontFamily="monospace">
                3G MOBILE LAB
              </text>
            </svg>

            <div className="relative z-10 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-[var(--bg-pill)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                <MapPin className="w-3 h-3 text-sky-400" />
                {SITE_PROFILE.location.coords}
              </span>
              <button
                type="button"
                onClick={handleLocate}
                disabled={geoState === 'locating'}
                title="调用浏览器定位，测算你与西安的直线距离"
                className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-[var(--bg-pill)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] disabled:opacity-60 transition-colors cursor-pointer"
              >
                {geoState === 'locating'
                  ? '定位中...'
                  : geoState === 'ready'
                    ? '重新测距'
                    : geoState === 'denied'
                      ? '重试定位'
                      : '测算距离'}
              </button>
            </div>

            {/* Center Pulsing Avatar Beacon */}
            <div className="relative z-10 my-4 flex items-center justify-center">
              <div className="relative">
                <span className="absolute -inset-3 rounded-full bg-sky-400/25 animate-pulse-ring"></span>
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-sky-400/70 shadow-lg">
                  <img
                    src={SITE_PROFILE.avatarUrl}
                    alt={SITE_PROFILE.displayName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-end justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  坐标 <span className="text-sky-400 font-semibold">{SITE_PROFILE.location.cityCn}</span>
                  {geoState === 'ready' && distanceKm !== null && (
                    <span className="ml-2 text-xs font-mono text-emerald-400">
                      {distanceKm <= 2 ? '· 与你同城 (<2 km)' : `· 距你约 ${distanceKm.toLocaleString()} km`}
                    </span>
                  )}
                  {geoState === 'denied' && (
                    <span className="ml-2 text-[11px] font-mono text-[var(--text-muted)]">
                      · 未授权位置权限
                    </span>
                  )}
                </p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  {SITE_PROFILE.identity.grade} · {SITE_PROFILE.identity.lab}
                </p>
              </div>
              <a
                href={resolveUrl('/roadmap')}
                className="shrink-0 text-xs font-mono text-[var(--accent)] hover:underline inline-flex items-center gap-0.5"
              >
                路线 <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Persona / Developer Identity Card (Flip interaction) */}
          <div className="md:col-span-3 bento-card p-5 flex flex-col justify-between min-h-[225px] bg-gradient-to-br from-violet-500/15 via-indigo-500/10 to-sky-500/10 specular-edge">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-violet-300">
                {personaFlipped ? 'DEV STATS' : 'IDENTITY'}
              </span>
              <button
                type="button"
                onClick={() => setPersonaFlipped((f) => !f)}
                title="翻转名片"
                className="p-1.5 rounded-full bg-[var(--bg-pill)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-transform active:rotate-180 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {!personaFlipped ? (
              <div className="my-3 space-y-2.5">
                <div className="font-serif text-xl font-bold text-[var(--text-primary)] leading-snug">
                  iOS 探索者
                  <span className="block text-xs font-mono font-normal text-sky-400 mt-1">
                    C → OC → UIKit → Swift
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  “{SITE_PROFILE.tagline}”
                </p>
              </div>
            ) : (
              <div className="my-3 grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)]">
                  <div className="font-mono text-lg font-bold text-violet-400">7+</div>
                  <div className="text-[11px] text-[var(--text-muted)]">iOS 项目</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)]">
                  <div className="font-mono text-lg font-bold text-sky-400">40+</div>
                  <div className="text-[11px] text-[var(--text-muted)]">实验室周报</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)] col-span-2">
                  <div className="font-mono text-xs font-semibold text-emerald-400">2025.09 起步编程</div>
                  <div className="text-[10px] text-[var(--text-muted)] mt-0.5">持续输出 C / OC / Python 笔记</div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5">
              {SITE_PROFILE.identity.focus.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--bg-pill)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: iOS App Cabinet (tommywutong.cn signature squircle icon selector) */}
          <div className="md:col-span-8 bento-card p-5 sm:p-6 specular-edge">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[var(--text-primary)]">完成的 iOS APP</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                  {showcaseApps.length} 个
                </span>
              </div>
              <a
                href={resolveUrl('/projects')}
                className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] inline-flex items-center gap-1 transition-colors"
              >
                全部项目 <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Squircle App Icons Row */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-5">
              {showcaseApps.map((app, idx) => {
                const isSelected = idx === activeAppIdx;
                return (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => setActiveAppIdx(idx)}
                    className={`group flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[var(--accent-soft)] ring-1 ring-[var(--accent)]/50 scale-[1.03]'
                        : 'hover:bg-[var(--bg-pill)]'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-[14px] bg-gradient-to-br ${app.iconGradient} flex items-center justify-center text-white text-xl font-bold shadow-lg transition-transform duration-300 group-hover:scale-105`}
                    >
                      {app.iconSymbol}
                    </div>
                    <span className="text-[11px] font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] truncate w-full text-center">
                      {app.shortName}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Live Selected App Preview Strip */}
            <div className="p-4 rounded-2xl bg-[var(--bg-pill)] border border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">{activeApp.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">
                    {activeApp.period}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-2">{activeApp.tagline} — {activeApp.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeApp.techStack.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/20 dark:bg-white/5 text-[var(--text-muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={resolveUrl(`/projects#${activeApp.id}`)}
                  className="px-3.5 py-2 rounded-xl text-xs font-medium bg-[var(--accent)] text-white hover:brightness-110 transition-all inline-flex items-center gap-1"
                >
                  查看详情 <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Card 4: Stacked Photo Slices Mini-Card (tommywutong.cn) */}
          <div className="md:col-span-5 bento-card p-5 flex flex-col justify-between overflow-hidden specular-edge">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[var(--text-primary)]">相册切片</span>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  0{photoIdx + 1} / 0{LIFE_SLIDES.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setPhotoIdx((i) => (i - 1 + LIFE_SLIDES.length) % LIFE_SLIDES.length)}
                  className="w-7 h-7 rounded-full bg-[var(--bg-pill)] border border-[var(--border-subtle)] flex items-center justify-center hover:border-[var(--accent)] cursor-pointer"
                  aria-label="上一张"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoIdx((i) => (i + 1) % LIFE_SLIDES.length)}
                  className="w-7 h-7 rounded-full bg-[var(--bg-pill)] border border-[var(--border-subtle)] flex items-center justify-center hover:border-[var(--accent)] cursor-pointer"
                  aria-label="下一张"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="relative h-40 rounded-2xl overflow-hidden group border border-[var(--border-subtle)]">
              <img
                src={resolveUrl(currentPhoto.image)}
                alt={currentPhoto.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 inset-x-3 flex items-end justify-between gap-2 text-white">
                <div className="min-w-0">
                  <div className="text-xs font-semibold truncate">{currentPhoto.title}</div>
                  <div className="text-[11px] text-white/75 truncate">{currentPhoto.subtitle}</div>
                </div>
                <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-md">
                  {currentPhoto.date}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 text-xs">
              <span className="text-[var(--text-muted)]">心情：{currentPhoto.mood}</span>
              <a
                href={resolveUrl('/life')}
                className="text-[var(--accent)] hover:underline inline-flex items-center gap-0.5"
              >
                浏览生活志 <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 5: Essay & Mood Snippet Card */}
          <div className="md:col-span-3 bento-card p-5 flex flex-col justify-between bg-gradient-to-b from-slate-900/60 to-violet-950/30 specular-edge">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-primary)]">
                <Heart className="w-3.5 h-3.5 text-pink-400" />
                随笔一隅
              </span>
              <span className="text-[10px] font-mono text-[var(--text-muted)]">{LIFE_ESSAYS[0].date}</span>
            </div>

            <blockquote className="my-4 font-serif text-[15px] leading-relaxed text-[var(--text-primary)]">
              “{LIFE_ESSAYS[0].highlight}”
              <span className="block text-xs font-sans text-[var(--text-secondary)] mt-2 line-clamp-3">
                {LIFE_ESSAYS[0].content}
              </span>
            </blockquote>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-[var(--border-subtle)]">
              <a
                href={resolveUrl('/life#photo-wall')}
                className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
              >
                生活照片墙 →
              </a>
              <a
                href={resolveUrl('/life#essays')}
                className="text-[var(--accent)] hover:underline inline-flex items-center gap-0.5"
              >
                全部随笔 <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT 4 COLUMNS: Full-Height Interactive iOS & C Knowledge Base (tommywutong.cn signature card) */}
        <div className="lg:col-span-4 bento-card p-5 sm:p-6 flex flex-col justify-between specular-edge">
          <div>
            {/* Status Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                </span>
                <span className="text-xs font-mono text-emerald-400">iOS & C 知识胶囊在线</span>
              </div>
              <Terminal className="w-4 h-4 text-[var(--text-muted)]" />
            </div>

            <h3 className="font-serif text-xl font-bold text-[var(--text-primary)] leading-snug">
              拆解 iOS 与底层的每个为什么。
              <span className="block text-sm font-sans font-normal text-[var(--text-secondary)] mt-1">
                沉淀自我的真实源码笔记与踩坑记录。
              </span>
            </h3>

            {/* Quick filter input */}
            <div className="mt-4">
              <input
                type="text"
                value={capSearch}
                onChange={(e) => {
                  setCapSearch(e.target.value);
                  setActiveCapIdx(0);
                }}
                placeholder="筛选知识点：Runtime / 抽屉 / WCDB / 大小端..."
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-[var(--bg-pill)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            {/* Topic Chips */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {filteredCaps.map((cap, idx) => {
                const selected = cap.id === activeCap.id;
                return (
                  <button
                    key={cap.id}
                    type="button"
                    onClick={() => setActiveCapIdx(idx)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                      selected
                        ? 'bg-[var(--accent)] text-white shadow-sm'
                        : 'bg-[var(--bg-pill)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                    }`}
                  >
                    {cap.topic}
                  </button>
                );
              })}
            </div>

            {/* Active Knowledge Card Body */}
            <div className="mt-4 p-4 rounded-2xl bg-[var(--bg-pill)] border border-[var(--border-subtle)] space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[var(--text-primary)]">{activeCap.question}</span>
                <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--accent-soft)] text-[var(--accent)]">
                  {activeCap.tag}
                </span>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{activeCap.summary}</p>

              <ul className="space-y-1.5">
                {activeCap.keyPoints.map((pt, i) => (
                  <li key={i} className="text-[11.5px] text-[var(--text-secondary)] flex items-start gap-2">
                    <span className="text-[var(--accent)] mt-0.5">▹</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <pre className="p-3 rounded-xl bg-black/50 text-[11px] font-mono text-sky-200 overflow-x-auto leading-relaxed border border-white/10">
                <code>{activeCap.codeSnippet}</code>
              </pre>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
            <a
              href={resolveUrl(activeCap.noteUrl)}
              className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline"
            >
              <Sparkles className="w-3.5 h-3.5" />
              阅读站内详解 →
            </a>
            <a
              href={resolveUrl('/notes')}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] inline-flex items-center gap-0.5"
            >
              <Compass className="w-3.5 h-3.5" />
              全部笔记
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
