import React, { useEffect, useMemo, useState } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Camera, Sparkles } from 'lucide-react';
import { LIFE_PHOTOS, type LifePhoto } from '../data/life';

interface LifePhotoWallProps {
  baseUrl?: string;
}

// Rich multi-size presets matching each photo's true orientation (有大有小、自然错落不死板对齐)
const LAYOUT_PRESETS: Record<
  LifePhoto['size'],
  { span: string; aspect: string; pad: string }
> = {
  hero: { span: 'md:col-span-7', aspect: 'aspect-[4/3]', pad: 'p-2.5 sm:p-3' },
  wide: { span: 'md:col-span-6', aspect: 'aspect-[4/3]', pad: 'p-2.5' },
  medium: { span: 'md:col-span-5', aspect: 'aspect-[4/3]', pad: 'p-2.5' },
  tall: { span: 'md:col-span-5', aspect: 'aspect-[3/4]', pad: 'p-2.5 sm:p-3' },
  'tall-sm': { span: 'md:col-span-4', aspect: 'aspect-[3/4]', pad: 'p-2' },
  square: { span: 'md:col-span-4', aspect: 'aspect-square', pad: 'p-2.5' },
  compact: { span: 'md:col-span-3', aspect: 'aspect-[4/3]', pad: 'p-2' },
};

// Staggered vertical offsets & gentle hand-pinned polaroid tilt angles
const ORGANIC_OFFSETS = [
  'md:mt-0 md:-rotate-[1.5deg]',
  'md:mt-10 md:rotate-[1.8deg]',
  'md:-mt-4 md:rotate-[1.2deg]',
  'md:mt-8 md:-rotate-[2deg]',
  'md:mt-3 md:rotate-[1.5deg]',
  'md:-mt-2 md:-rotate-[1.3deg]',
  'md:mt-6 md:rotate-[1.6deg]',
  'md:-mt-5 md:-rotate-[1.7deg]',
  'md:mt-12 md:rotate-[2.1deg]',
];

export default function LifePhotoWall({ baseUrl = '/' }: LifePhotoWallProps) {
  const [activeTag, setActiveTag] = useState<string>('全部');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const resolveUrl = (path: string) => {
    if (/^https?:\/\//i.test(path)) return path;
    const normBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const normPath = path.startsWith('/') ? path.slice(1) : path;
    return `${normBase}${normPath}`;
  };

  const tags = useMemo(() => {
    const unique = Array.from(new Set(LIFE_PHOTOS.map((p) => p.tag)));
    return ['全部', ...unique];
  }, []);

  const visiblePhotos = useMemo(
    () => (activeTag === '全部' ? LIFE_PHOTOS : LIFE_PHOTOS.filter((p) => p.tag === activeTag)),
    [activeTag]
  );

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIdx(null);
      if (e.key === 'ArrowRight') {
        setLightboxIdx((i) => (i === null ? null : (i + 1) % visiblePhotos.length));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIdx((i) =>
          i === null ? null : (i - 1 + visiblePhotos.length) % visiblePhotos.length
        );
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIdx, visiblePhotos.length]);

  const activePhoto = lightboxIdx !== null ? visiblePhotos[lightboxIdx] : null;

  return (
    <div id="photo-wall" className="scroll-mt-24 space-y-8">
      {/* Section Header + Tag Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.22em] text-[var(--accent)]">
            <Camera className="w-3.5 h-3.5" />
            <span>LIFE PHOTO WALL · {LIFE_PHOTOS.length} 张真实影像</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mt-1.5">
            生活照片墙
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            大小错落、自由排布，收录实验室日常、金工实习、三下乡与校园夜色。悬停回正，点击可放大浏览原图。
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => {
            const active = activeTag === tag;
            const count =
              tag === '全部'
                ? LIFE_PHOTOS.length
                : LIFE_PHOTOS.filter((p) => p.tag === tag).length;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setActiveTag(tag);
                  setLightboxIdx(null);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                  active
                    ? 'bg-[var(--accent)] text-white shadow-md shadow-violet-500/25'
                    : 'liquid-glass text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]'
                }`}
              >
                <span>{tag}</span>
                <span className="font-mono text-[10px] opacity-80">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dense Organic Unaligned Multi-Size Collage Wall */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 md:grid-flow-dense gap-5 sm:gap-7 items-start py-4">
        {visiblePhotos.map((photo, idx) => {
          const preset = LAYOUT_PRESETS[photo.size] || LAYOUT_PRESETS.medium;
          const organic = ORGANIC_OFFSETS[idx % ORGANIC_OFFSETS.length];
          const isCompact = photo.size === 'compact';

          return (
            <button
              key={photo.id}
              type="button"
              onClick={() => setLightboxIdx(idx)}
              className={`group relative text-left ${preset.span} ${organic} transition-all duration-500 ease-out hover:rotate-0 hover:scale-[1.04] hover:z-30 cursor-pointer focus:outline-none`}
            >
              {/* Frosted Glass Polaroid Frame */}
              <div
                className={`liquid-glass rounded-[24px] ${preset.pad} border border-white/25 shadow-[0_22px_50px_-16px_rgba(0,0,0,0.68)] group-hover:border-[var(--accent)]/80 transition-all`}
              >
                {/* Decorative Pin Dot */}
                <span
                  className="pointer-events-none absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white/80 shadow-md ring-2 ring-[var(--accent)]/45 z-20"
                  aria-hidden="true"
                />

                {/* Photo Viewport */}
                <div
                  className={`relative w-full ${preset.aspect} rounded-[18px] overflow-hidden bg-black/35`}
                >
                  <img
                    src={resolveUrl(photo.src)}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-75 group-hover:opacity-95 transition-opacity" />

                  {/* Tag & Date */}
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-white/95 bg-black/45 backdrop-blur-md border border-white/15">
                    # {photo.tag}
                  </span>
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-mono text-white/85 bg-black/40 backdrop-blur-md">
                    {photo.date}
                  </span>

                  {/* Title & Caption Overlay */}
                  <div className="absolute bottom-3 inset-x-3.5 text-white">
                    <div
                      className={`font-serif font-bold leading-snug drop-shadow ${
                        isCompact ? 'text-sm' : 'text-base sm:text-lg'
                      }`}
                    >
                      {photo.title}
                    </div>
                    {!isCompact && (
                      <p className="text-xs text-white/80 mt-1 line-clamp-2 leading-relaxed">
                        {photo.caption}
                      </p>
                    )}
                  </div>
                </div>

                {/* Polaroid Footnote */}
                <div className="px-1.5 pt-2 pb-0.5 flex items-center justify-between gap-2 text-[10.5px] font-mono text-[var(--text-muted)]">
                  <span className="inline-flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 text-[var(--accent)] shrink-0" />
                    {photo.location}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[var(--accent)] opacity-75 group-hover:opacity-100 shrink-0">
                    <Sparkles className="w-3 h-3" />
                    大图
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[120] bg-black/88 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <div
            className="relative max-w-4xl w-full flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between text-white/85 text-xs font-mono">
              <span className="inline-flex items-center gap-2">
                <span>
                  {String(lightboxIdx + 1).padStart(2, '0')} /{' '}
                  {String(visiblePhotos.length).padStart(2, '0')}
                </span>
                <span className="opacity-40">·</span>
                <span># {activePhoto.tag}</span>
              </span>
              <button
                type="button"
                onClick={() => setLightboxIdx(null)}
                aria-label="关闭大图"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Image + Prev/Next Arrows */}
            <div className="relative w-full flex items-center justify-center">
              <button
                type="button"
                onClick={() =>
                  setLightboxIdx((i) =>
                    i === null ? null : (i - 1 + visiblePhotos.length) % visiblePhotos.length
                  )
                }
                aria-label="上一张照片"
                className="absolute left-2 sm:-left-12 z-20 p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="rounded-3xl p-2 bg-white/10 border border-white/20 shadow-2xl max-h-[72vh] overflow-hidden">
                <img
                  src={resolveUrl(activePhoto.src)}
                  alt={activePhoto.title}
                  className="max-h-[68vh] w-auto max-w-full rounded-2xl object-contain"
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  setLightboxIdx((i) => (i === null ? null : (i + 1) % visiblePhotos.length))
                }
                aria-label="下一张照片"
                className="absolute right-2 sm:-right-12 z-20 p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Caption Card */}
            <div className="w-full max-w-2xl liquid-glass rounded-2xl px-5 py-3.5 text-center border border-white/20">
              <h3 className="font-serif text-lg font-bold text-white">{activePhoto.title}</h3>
              <p className="text-xs sm:text-sm text-white/85 mt-1 leading-relaxed">
                {activePhoto.caption}
              </p>
              <div className="mt-2 flex items-center justify-center gap-4 text-[11px] font-mono text-white/65">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {activePhoto.date}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {activePhoto.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
