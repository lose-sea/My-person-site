import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { LIFE_SLIDES } from '../data/life';

interface LifeCarouselProps {
  baseUrl?: string;
}

export default function LifeCarousel({ baseUrl = '/' }: LifeCarouselProps) {
  const [centerIdx, setCenterIdx] = useState(0);
  const total = LIFE_SLIDES.length;

  const resolveUrl = (path: string) => {
    const normBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const normPath = path.startsWith('/') ? path.slice(1) : path;
    return `${normBase}${normPath}`;
  };

  const prev = () => setCenterIdx((i) => (i - 1 + total) % total);
  const next = () => setCenterIdx((i) => (i + 1) % total);

  const active = LIFE_SLIDES[centerIdx];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 reveal">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.22em] text-[var(--accent)]">
            03 · LIFE & ATMOSPHERE
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1.5 text-[var(--text-primary)]">
            生活光影与日常切片
          </h2>
        </div>
        <a
          href={resolveUrl('/life')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-[var(--bg-pill)] border border-[var(--border-subtle)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          进入生活志 & 随笔
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 3D Curved Perspective Carousel (zyx322.xyz signature section) */}
      <div className="relative h-[300px] sm:h-[360px] flex items-center justify-center overflow-hidden [perspective:1200px]">
        {LIFE_SLIDES.map((slide, idx) => {
          let diff = idx - centerIdx;
          if (diff > total / 2) diff -= total;
          if (diff < -total / 2) diff += total;

          const abs = Math.abs(diff);
          if (abs > 2) return null;

          const translateX = diff * 235;
          const translateZ = -abs * 115;
          const rotateY = diff * -20;
          const scale = 1 - abs * 0.12;
          const opacity = abs === 0 ? 1 : abs === 1 ? 0.68 : 0.32;
          const zIndex = 20 - abs;

          return (
            <div
              key={slide.id}
              onClick={() => setCenterIdx(idx)}
              style={{
                transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex,
              }}
              className="absolute w-[270px] sm:w-[400px] h-[240px] sm:h-[300px] rounded-3xl overflow-hidden border border-white/20 shadow-2xl cursor-pointer transition-all duration-500 ease-out"
            >
              <img
                src={resolveUrl(slide.image)}
                alt={slide.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <div className="absolute top-3.5 left-3.5">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono text-white/90 bg-black/40 backdrop-blur-md border border-white/15">
                  {slide.tag} · {slide.date}
                </span>
              </div>
              <div className="absolute bottom-4 inset-x-4 text-white">
                <h3 className="font-serif text-base sm:text-lg font-bold leading-snug">{slide.title}</h3>
                <p className="text-xs text-white/75 mt-1 line-clamp-2">{slide.subtitle}</p>
              </div>
            </div>
          );
        })}

        {/* Floating Prev / Next Pill Arrows */}
        <button
          type="button"
          onClick={prev}
          aria-label="上一张生活卡片"
          className="absolute left-2 sm:left-4 z-30 w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent)] transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="下一张生活卡片"
          className="absolute right-2 sm:right-4 z-30 w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent)] transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Centered Caption & Dot Indicators */}
      <div className="mt-4 flex flex-col items-center gap-3 text-center">
        <div className="text-xs font-mono text-[var(--text-muted)]">
          {active.title} · 氛围「{active.mood}」
        </div>
        <div className="flex items-center gap-2">
          {LIFE_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setCenterIdx(idx)}
              aria-label={`切换到 ${s.title}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === centerIdx ? 'w-7 bg-[var(--accent)]' : 'w-2 bg-[var(--border-strong)] hover:bg-[var(--text-muted)]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
