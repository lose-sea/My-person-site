import React, { useEffect, useMemo, useState } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Camera, Sparkles } from 'lucide-react';
import { LIFE_PHOTOS, type LifePhoto } from '../data/life';

interface LifePhotoWallProps {
  baseUrl?: string;
}

// Organic staggered size / aspect / vertical offset / slight tilt presets (有大有小，自然错落不死板对齐)
const LAYOUT_PRESETS: Record<
  LifePhoto['size'],
  { span: string; aspect: string }
> = {
  large: { span: 'md:col-span-7', aspect: 'aspect-[16/10]' },
  tall: { span: 'md:col-span-5', aspect: 'aspect-[4/5]' },
  medium: { span: 'md:col-span-6', aspect: 'aspect-[4/3]' },
  compact: { span: 'md:col-span-4', aspect: 'aspect-square' },
  wide: { span: 'md:col-span-8', aspect: 'aspect-[16/9]' },
};

const ORGANIC_OFFSETS = [
  'md:mt-0 md:-rotate-[1.4deg]',
  'md:mt-10 md:rotate-[1.6deg]',
  'md:-mt-4 md:rotate-[1.1deg]',
  'md:mt-8 md:-rotate-[1.8deg]',
  'md:mt-2 md:rotate-[1.3deg]',
  'md:mt-12 md:-rotate-[1.2deg]',
  'md:-mt-2 md:rotate-[1.7deg]',
  'md:mt-6 md:-rotate-[1.5deg]',
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
            <span>LIFE PHOTO WALL · 错落影像墙</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mt-1.5">
            生活照片墙
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            大小错落、不必严丝合缝，留住校园、旅途与日常里那些值得回看的瞬间。点击任意照片可放大浏览。
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => {
            const active = activeTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setActiveTag(tag);
                  setLightboxIdx(null);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  active
                    ? 'bg-[var(--accent)] text-white shadow-md shadow-violet-500/25'
                    : 'liquid-glass text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Organic Unaligned Multi-Size Collage Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start py-2">
        {visiblePhotos.map((photo, idx) => {
          const preset = LAYOUT_PRESETS[photo.size] || LAYOUT_PRESETS.medium;
          const organic = ORGANIC_OFFSETS[idx % ORGANIC_OFFSETS.length];

          return (
            <button
              key={photo.id}
              type="button"
              onClick={() => setLightboxIdx(idx)}
              className={`group relative text-left ${preset.span} ${organic} transition-all duration-500 ease-out hover:rotate-0 hover:scale-[1.03] hover:z-30 cursor-pointer focus:outline-none`}
            >
              {/* Frosted Polaroid / Gallery Frame */}
              <div className="liquid-glass rounded-[26px] p-2.5 sm:p-3 border border-white/25 shadow-[0_22px_50px_-16px_rgba(0,0,0,0.65)] group-hover:border-[var(--accent)]/75 transition-all">
                {/* Subtle Decorative Glass Pin Dot */}
                <span
                  className="pointer-events-none absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white/75 shadow-md ring-2 ring-[var(--accent)]/45 z-20"
                  aria-hidden="true"
                />

                {/* Photo Viewport */}
                <div className={`relative w-full ${preset.aspect} rounded-[20px] overflow-hidden bg-black/30`}>
                  <img
                    src={resolveUrl(photo.src)}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                  {/* Top Left Tag */}
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-white/95 bg-black/45 backdrop-blur-md border border-white/15">
                    # {photo.tag}
                  </span>

                  {/* Top Right Date */}
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-white/85 bg-black/40 backdrop-blur-md">
                    {photo.date}
                  </span>

                  {/* Bottom Title & Caption */}
                  <div className="absolute bottom-3.5 inset-x-4 text-white">
                    <div className="font-serif text-base sm:text-lg font-bold leading-snug drop-shadow">
                      {photo.title}
                    </div>
                    <p className="text-xs text-white/80 mt-1 line-clamp-2 leading-relaxed">
                      {photo.caption}
                    </p>
                  </div>
                </div>

                {/* Polaroid Footnote Strip */}
                <div className="px-2 pt-2.5 pb-1 flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                  <span className="inline-flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 text-[var(--accent)] shrink-0" />
                    {photo.location}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[var(--accent)] opacity-80 group-hover:opacity-100 shrink-0">
                    <Sparkles className="w-3 h-3" />
                    放大查看
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
          className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4"
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
              <p className="text-xs sm:text-sm text-white/80 mt-1 leading-relaxed">
                {activePhoto.caption}
              </p>
              <div className="mt-2 flex items-center justify-center gap-4 text-[11px] font-mono text-white/60">
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
