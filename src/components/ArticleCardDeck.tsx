import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, BookOpen, Mouse } from 'lucide-react';
import { ARTICLES, ARTICLE_CATEGORY_META, type ArticleItem } from '../data/articles';

interface ArticleCardDeckProps {
  baseUrl?: string;
}

// Identical physical dimensions for EVERY card (prev / current / next)
const CARD_WIDTH = 258;
const CARD_HEIGHT = 296;

export default function ArticleCardDeck({ baseUrl = '/' }: ArticleCardDeckProps) {
  const featured = ARTICLES.filter((a) => a.featured);
  const deck = featured.length >= 5 ? featured : ARTICLES.slice(0, 9);
  const total = deck.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [animTick, setAnimTick] = useState(0);

  const stageRef = useRef<HTMLDivElement>(null);
  const lastWheelAt = useRef(0);
  const wheelAccum = useRef(0);

  const current = deck[activeIndex];
  const meta = ARTICLE_CATEGORY_META[current.category];

  const resolveUrl = (path: string) => {
    const normBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const normPath = path.startsWith('/') ? path.slice(1) : path;
    return `${normBase}${normPath}`;
  };

  const articleHref = (id: string) => resolveUrl(`/notes/${id}`);

  const stepTo = useCallback(
    (targetIdx: number, dir: 'next' | 'prev') => {
      const normalized = ((targetIdx % total) + total) % total;
      if (normalized === activeIndex) return;
      setDirection(dir);
      setActiveIndex(normalized);
      setAnimTick((t) => t + 1);
    },
    [activeIndex, total]
  );

  const next = useCallback(() => {
    stepTo(activeIndex + 1, 'next');
  }, [activeIndex, stepTo]);

  const prev = useCallback(() => {
    stepTo(activeIndex - 1, 'prev');
  }, [activeIndex, stepTo]);

  // Mouse wheel & trackpad circular switching over the 3-card fan deck
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const primaryDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(primaryDelta) < 4) return;

      e.preventDefault();

      const now = Date.now();
      if (now - lastWheelAt.current < 270) return;

      wheelAccum.current += primaryDelta;
      if (Math.abs(wheelAccum.current) >= 22) {
        if (wheelAccum.current > 0) {
          next();
        } else {
          prev();
        }
        wheelAccum.current = 0;
        lastWheelAt.current = now;
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [next, prev]);

  const prevIdx = (activeIndex - 1 + total) % total;
  const nextIdx = (activeIndex + 1) % total;

  const slots: {
    role: 'prev' | 'current' | 'next';
    idx: number;
    item: ArticleItem;
  }[] = [
    { role: 'prev', idx: prevIdx, item: deck[prevIdx] },
    { role: 'next', idx: nextIdx, item: deck[nextIdx] },
    { role: 'current', idx: activeIndex, item: deck[activeIndex] },
  ];

  const renderCardInner = (
    item: ArticleItem,
    deckNo: number,
    role: 'prev' | 'current' | 'next',
    showSheen: boolean
  ) => {
    const itemMeta = ARTICLE_CATEGORY_META[item.category];
    const isCurrent = role === 'current';

    return (
      <>
        {showSheen && (
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent via-white/25 to-transparent article-card-sheen"
            aria-hidden="true"
          />
        )}

        {/* Top Accent Strip */}
        <div
          className="absolute inset-x-0 top-0 h-[3px] opacity-95"
          style={{
            background: `linear-gradient(90deg, ${itemMeta.color}, transparent 88%)`,
          }}
          aria-hidden="true"
        />

        {/* Top Row: Tag + Deck Index */}
        <div className="flex items-center justify-between gap-2 relative z-10">
          <span
            className="text-[10.5px] font-mono px-2.5 py-0.5 rounded-full truncate max-w-[140px]"
            style={{
              backgroundColor: `${itemMeta.color}24`,
              color: itemMeta.color,
              border: `1px solid ${itemMeta.color}42`,
            }}
          >
            #{item.categoryLabel}
          </span>
          <span className="text-[11px] font-mono text-[var(--text-muted)] shrink-0">
            {String(deckNo).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        {/* Main Content */}
        <div className="space-y-2 my-2 relative z-10">
          <div className="text-[11px] font-mono text-[var(--text-muted)]">
            {item.date} · {item.readTime}
          </div>
          <h4 className="font-serif text-[16.5px] font-bold text-[var(--text-primary)] line-clamp-2 leading-snug">
            {item.title}
          </h4>
          <p className="text-xs text-[var(--text-secondary)] line-clamp-4 leading-relaxed">
            {item.summary}
          </p>
        </div>

        {/* Footer Action Cue */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] text-[11px] font-mono relative z-10">
          <span className="text-[var(--text-muted)] truncate max-w-[100px]">{item.subTag}</span>
          {isCurrent ? (
            <a
              href={articleHref(item.id)}
              onClick={(e) => e.stopPropagation()}
              className="text-[var(--accent)] font-semibold hover:underline inline-flex items-center gap-0.5 shrink-0"
            >
              阅读全文 →
            </a>
          ) : (
            <span className="text-[var(--text-secondary)] shrink-0">
              {role === 'prev' ? '← 上一篇' : '下一篇 →'}
            </span>
          )}
        </div>
      </>
    );
  };

  return (
    <section className="max-w-[1220px] mx-auto px-4 sm:px-6 py-14 relative">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 reveal">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.22em] text-[var(--accent)]">
            02 · FEATURED WRITING
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1.5 text-[var(--text-primary)]">
            精选技术文章 · C / Objective-C / Python
          </h2>
        </div>
        <a
          href={resolveUrl('/notes')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium liquid-glass hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all self-start sm:self-auto"
        >
          <BookOpen className="w-3.5 h-3.5" />
          浏览全部 {ARTICLES.length} 篇站内笔记
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 2-Column Split: Left Spotlight Card + Right Wide 3-Card Spread (Prev · Current · Next) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
        {/* Left Spotlight Card */}
        <div className="lg:col-span-5 relative z-30 min-w-0">
          <div className="bento-card article-card-solid p-6 sm:p-7 space-y-5 specular-edge">
            <div key={`spot-${current.id}-${animTick}`} className="space-y-4 article-spotlight-snap">
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                <span
                  className="px-3 py-1 rounded-full font-medium"
                  style={{
                    backgroundColor: `${meta.color}24`,
                    color: meta.color,
                    border: `1px solid ${meta.color}48`,
                  }}
                >
                  # {current.subTag}
                </span>
                <span className="text-[var(--text-muted)]">{current.date}</span>
                <span className="opacity-40">·</span>
                <span className="text-[var(--text-muted)]">约 {current.readTime}</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold leading-snug text-[var(--text-primary)] min-h-[68px]">
                {current.title}
              </h3>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed min-h-[76px]">
                {current.summary}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--border-subtle)]">
              <a
                href={articleHref(current.id)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-[var(--accent)] text-white hover:brightness-110 transition-all shadow-lg shadow-violet-500/25"
              >
                站内阅读全文
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <div className="inline-flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="上一篇"
                  className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent)] active:scale-90 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-mono text-xs text-[var(--text-muted)] min-w-[52px] text-center">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  onClick={next}
                  aria-label="下一篇"
                  className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent)] active:scale-90 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-muted)]">
              <Mouse className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>滚轮或点左右卡片切换，点击中央主卡直接进入站内阅读</span>
            </div>
          </div>
        </div>

        {/* Right Wide 3-Card Symmetric Fan Stage (Large Spread: ±192px so prev & next content show clearly) */}
        <div
          ref={stageRef}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
          }}
          aria-label="精选文章三卡错位翻牌区，支持滚轮与点击切换"
          className="article-deck-stage lg:col-span-7 relative h-[380px] select-none outline-none flex items-center justify-center overflow-hidden rounded-3xl"
        >
          {slots.map(({ role, idx, item }) => {
            const isCurrent = role === 'current';
            const isPrev = role === 'prev';
            const isNext = role === 'next';

            const restTransform = isCurrent
              ? 'perspective(1100px) translate3d(0, 0, 0) rotateY(0deg) rotateZ(0deg)'
              : isPrev
                ? 'perspective(1100px) translate3d(calc(var(--deck-spread) * -1), 16px, -30px) rotateY(12deg) rotateZ(-4.5deg)'
                : 'perspective(1100px) translate3d(var(--deck-spread), 16px, -30px) rotateY(-12deg) rotateZ(4.5deg)';

            let animClass = '';
            if (animTick > 0) {
              if (isCurrent) {
                animClass =
                  direction === 'next' ? 'article-center-from-right' : 'article-center-from-left';
              } else if (isPrev) {
                animClass =
                  direction === 'next' ? 'article-side-left-from-center' : 'article-side-left-pop-in';
              } else if (isNext) {
                animClass =
                  direction === 'next' ? 'article-side-right-pop-in' : 'article-side-right-from-center';
              }
            }

            return (
              <div
                key={`${role}-${item.id}-${animTick}`}
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (isPrev) prev();
                  else if (isNext) next();
                  else window.location.href = articleHref(item.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (isPrev) prev();
                    else if (isNext) next();
                    else window.location.href = articleHref(item.id);
                  }
                }}
                style={{
                  width: `${CARD_WIDTH}px`,
                  height: `${CARD_HEIGHT}px`,
                  transform: restTransform,
                  opacity: isCurrent ? 1 : 0.9,
                  zIndex: isCurrent ? 35 : 18,
                }}
                className={`absolute bento-card p-5 flex flex-col justify-between overflow-hidden cursor-pointer specular-edge ${animClass} ${
                  isCurrent
                    ? 'article-card-solid border-[var(--accent)]/85 shadow-[0_26px_60px_-14px_rgba(0,0,0,0.8)] ring-1 ring-white/20'
                    : 'article-card-side border-white/20 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.65)] hover:border-[var(--accent)]/70 hover:-translate-y-2 transition-[translate,border-color] duration-200'
                }`}
              >
                {renderCardInner(item, idx + 1, role, isCurrent && animTick > 0)}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
