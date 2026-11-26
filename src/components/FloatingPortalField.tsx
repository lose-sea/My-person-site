import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Wind, Sparkles, Layers, Compass } from 'lucide-react';
import { FRIEND_LINKS, LINK_CATEGORIES, type FriendLink } from '../data/links';

type ViewMode = 'bubbles' | 'ribbon';

interface OrbPhysics {
  id: string;
  baseX: number; // percentage 8..92
  baseY: number; // percentage 14..84
  vx: number;
  vy: number;
  offsetX: number;
  offsetY: number;
  phaseX: number;
  phaseY: number;
  freqX: number;
  freqY: number;
  ampX: number;
  ampY: number;
  size: number;
}

// Well-spaced golden-ratio-inspired initial anchor layout across the open sky
const ANCHOR_SLOTS: [number, number][] = [
  [14, 24], [34, 18], [56, 22], [78, 19], [89, 36],
  [22, 46], [44, 42], [66, 44], [83, 62],
  [12, 68], [32, 72], [53, 68], [72, 78], [41, 84], [61, 14],
];

export default function FloatingPortalField() {
  const [mode, setMode] = useState<ViewMode>('bubbles');
  const [activeCat, setActiveCat] = useState<string>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedLink, setSelectedLink] = useState<FriendLink>(FRIEND_LINKS[0]);
  const [breezePulse, setBreezePulse] = useState(0);

  const fieldRef = useRef<HTMLDivElement>(null);
  const orbElsRef = useRef<Record<string, HTMLButtonElement | null>>({});
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0.5,
    y: 0.5,
    active: false,
  });

  const physicsRef = useRef<OrbPhysics[]>(
    FRIEND_LINKS.map((link, i) => {
      const [bx, by] = ANCHOR_SLOTS[i % ANCHOR_SLOTS.length];
      return {
        id: link.id,
        baseX: bx,
        baseY: by,
        vx: 0,
        vy: 0,
        offsetX: 0,
        offsetY: 0,
        phaseX: i * 1.17,
        phaseY: i * 1.73 + 0.6,
        freqX: 0.00055 + (i % 4) * 0.00014,
        freqY: 0.00068 + (i % 3) * 0.00016,
        ampX: 16 + (i % 3) * 7,
        ampY: 14 + (i % 4) * 5,
        size: i % 3 === 0 ? 112 : i % 3 === 1 ? 100 : 94,
      };
    })
  );

  const catOf = (catId: string) =>
    LINK_CATEGORIES.find((c) => c.id === catId) || LINK_CATEGORIES[0];

  // Trigger a playful wind gust that swirls all floating glass bubbles across the open anime sky
  const triggerBreeze = () => {
    setBreezePulse((p) => p + 1);
    physicsRef.current.forEach((orb, idx) => {
      const angle = (idx * 2.399) + Math.random() * 0.8;
      const strength = 10 + Math.random() * 10;
      orb.vx += Math.cos(angle) * strength;
      orb.vy += Math.sin(angle) * strength;
    });
  };

  // Continuous 60fps floating buoyancy + magnetic pointer response (zero React re-renders per frame)
  useEffect(() => {
    if (mode !== 'bubbles') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let rafId = 0;
    const start = performance.now();

    const animate = (now: number) => {
      const t = now - start;
      const rect = fieldRef.current?.getBoundingClientRect();
      const w = rect?.width || 1100;
      const h = rect?.height || 540;

      for (const orb of physicsRef.current) {
        const el = orbElsRef.current[orb.id];
        if (!el) continue;

        // Smooth sinusoidal sky drift
        const floatX = Math.sin(t * orb.freqX + orb.phaseX) * orb.ampX;
        const floatY = Math.cos(t * orb.freqY + orb.phaseY) * orb.ampY;

        // Spring return & damping for breeze impulse
        orb.vx += -orb.offsetX * 0.018;
        orb.vy += -orb.offsetY * 0.018;
        orb.vx *= 0.91;
        orb.vy *= 0.91;
        orb.offsetX += orb.vx;
        orb.offsetY += orb.vy;

        // Soft cursor magnetic buoyancy
        let magX = 0;
        let magY = 0;
        if (pointerRef.current.active) {
          const px = pointerRef.current.x * w;
          const py = pointerRef.current.y * h;
          const ox = (orb.baseX / 100) * w;
          const oy = (orb.baseY / 100) * h;
          const dx = ox - px;
          const dy = oy - py;
          const dist = Math.hypot(dx, dy);
          if (dist > 1 && dist < 210) {
            const force = ((210 - dist) / 210) * 26;
            magX = (dx / dist) * force;
            magY = (dy / dist) * force;
          }
        }

        const totalX = floatX + orb.offsetX + magX;
        const totalY = floatY + orb.offsetY + magY;
        const tilt = Math.sin(t * orb.freqX * 1.4 + orb.phaseX) * 3.5;

        el.style.transform = `translate3d(calc(-50% + ${totalX.toFixed(1)}px), calc(-50% + ${totalY.toFixed(1)}px), 0) rotate(${tilt.toFixed(2)}deg)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [mode]);

  const filteredLinks = useMemo(
    () => (activeCat === 'all' ? FRIEND_LINKS : FRIEND_LINKS.filter((l) => l.category === activeCat)),
    [activeCat]
  );

  const rowA = useMemo(() => {
    const base = filteredLinks.filter((_, i) => i % 2 === 0);
    const list = base.length > 0 ? base : filteredLinks;
    return [...list, ...list, ...list];
  }, [filteredLinks]);

  const rowB = useMemo(() => {
    const base = filteredLinks.filter((_, i) => i % 2 === 1);
    const list = base.length > 0 ? base : filteredLinks;
    return [...list, ...list, ...list];
  }, [filteredLinks]);

  const selectedCat = catOf(selectedLink.category);

  return (
    <div className="space-y-12">
      {/* Floating Borderless Control Strip (no outer box!) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCat('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeCat === 'all'
                ? 'bg-[var(--accent)] text-white shadow-lg shadow-violet-500/30'
                : 'liquid-glass text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            全部漫游 ({FRIEND_LINKS.length})
          </button>
          {LINK_CATEGORIES.map((cat) => {
            const active = activeCat === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCat(active ? 'all' : cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                  active
                    ? 'text-white shadow-lg'
                    : 'liquid-glass text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
                style={
                  active
                    ? { backgroundColor: cat.color, boxShadow: `0 8px 24px -6px ${cat.glow}` }
                    : undefined
                }
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: active ? '#fff' : cat.color }}
                />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Mode Switch + Wind Gust Button */}
        <div className="flex items-center gap-2">
          <div className="inline-flex p-1 rounded-full liquid-glass">
            <button
              type="button"
              onClick={() => setMode('bubbles')}
              className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                mode === 'bubbles'
                  ? 'bg-[var(--accent)] text-white shadow'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              浮光气泡
            </button>
            <button
              type="button"
              onClick={() => setMode('ribbon')}
              className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                mode === 'ribbon'
                  ? 'bg-[var(--accent)] text-white shadow'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              棱镜流廊
            </button>
          </div>

          {mode === 'bubbles' && (
            <button
              type="button"
              onClick={triggerBreeze}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium liquid-glass text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] inline-flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
            >
              <Wind className="w-3.5 h-3.5" />
              拂风吹散
            </button>
          )}
        </div>
      </div>

      {/* MODE 1: COMPLETELY BORDERLESS FLOATING LUMINOUS GLASS ORBS DIRECTLY IN THE ANIME SKY */}
      {mode === 'bubbles' && (
        <div className="relative w-full">
          <div
            ref={fieldRef}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              pointerRef.current = {
                x: (e.clientX - r.left) / r.width,
                y: (e.clientY - r.top) / r.height,
                active: true,
              };
            }}
            onMouseLeave={() => {
              pointerRef.current.active = false;
            }}
            className="relative max-w-6xl mx-auto h-[520px] sm:h-[580px] overflow-visible select-none"
          >
            {/* Subtle breeze ripple indicator when triggered */}
            {breezePulse > 0 && (
              <div
                key={`breeze-${breezePulse}`}
                className="pointer-events-none absolute inset-0 rounded-full portal-breeze-wave"
                aria-hidden="true"
              />
            )}

            {FRIEND_LINKS.map((link, idx) => {
              const cat = catOf(link.category);
              const orb = physicsRef.current[idx];
              const isMatch = activeCat === 'all' || link.category === activeCat;
              const isSelected = selectedLink.id === link.id;
              const isHovered = hoveredId === link.id;

              return (
                <button
                  key={link.id}
                  ref={(el) => {
                    orbElsRef.current[link.id] = el;
                  }}
                  type="button"
                  onMouseEnter={() => {
                    setHoveredId(link.id);
                    setSelectedLink(link);
                  }}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedLink(link)}
                  onDoubleClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
                  style={{
                    left: `${orb.baseX}%`,
                    top: `${orb.baseY}%`,
                    width: `${orb.size}px`,
                    height: `${orb.size}px`,
                    transform: 'translate3d(-50%, -50%, 0)',
                    borderColor: isSelected || isHovered ? cat.color : 'rgba(255,255,255,0.28)',
                    boxShadow:
                      isSelected || isHovered
                        ? `0 0 38px ${cat.glow}, inset 0 1px 16px rgba(255,255,255,0.38)`
                        : `0 12px 32px rgba(0,0,0,0.32), inset 0 1px 12px rgba(255,255,255,0.22)`,
                    zIndex: isHovered ? 40 : isSelected ? 30 : 15,
                  }}
                  className={`absolute rounded-full flex flex-col items-center justify-center p-2.5 text-center border backdrop-blur-xl transition-[opacity,filter,box-shadow,border-color] duration-300 cursor-pointer portal-orb-bubble ${
                    isMatch ? 'opacity-100' : 'opacity-20 blur-[2px] pointer-events-none'
                  }`}
                >
                  {/* Specular highlight crescent inside the crystal bubble */}
                  <span
                    className="pointer-events-none absolute top-2 left-4 w-7 h-3 rounded-full bg-white/35 blur-[2px] -rotate-25"
                    aria-hidden="true"
                  />

                  {/* Soft inner colored glow */}
                  <span
                    className="pointer-events-none absolute inset-1 rounded-full opacity-25 transition-opacity"
                    style={{
                      background: `radial-gradient(circle at 30% 25%, ${cat.color}, transparent 72%)`,
                      opacity: isSelected || isHovered ? 0.5 : 0.22,
                    }}
                    aria-hidden="true"
                  />

                  <span
                    className="relative z-10 font-mono text-sm sm:text-base font-bold tracking-tight drop-shadow"
                    style={{ color: isSelected || isHovered ? '#ffffff' : cat.color }}
                  >
                    {link.badge}
                  </span>
                  <span className="relative z-10 text-[10.5px] sm:text-[11px] font-medium text-white/95 leading-tight mt-1 px-1 line-clamp-2 drop-shadow">
                    {link.name.split('·')[0].trim()}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Floating Glass Spotlight Capsule at Bottom (NO outer box around the field!) */}
          <div className="max-w-2xl mx-auto px-4 -mt-4 relative z-40">
            <div
              key={selectedLink.id}
              className="liquid-glass rounded-full sm:rounded-3xl px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/25 portal-pill-pop"
              style={{
                boxShadow: `0 20px 50px -15px rgba(0,0,0,0.6), 0 0 32px -12px ${selectedCat.glow}`,
              }}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center font-mono text-sm font-bold text-white shrink-0 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${selectedCat.color}, rgba(15,23,42,0.85))`,
                  }}
                >
                  {selectedLink.badge}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-serif text-base font-bold text-[var(--text-primary)] truncate">
                      {selectedLink.name}
                    </span>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${selectedCat.color}28`,
                        color: selectedCat.color,
                      }}
                    >
                      {selectedLink.tag}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-2">
                    {selectedLink.desc}
                  </p>
                </div>
              </div>

              <a
                href={selectedLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold text-white transition-all hover:brightness-110 shadow-lg"
                style={{
                  backgroundColor: selectedCat.color,
                  boxShadow: `0 8px 24px -6px ${selectedCat.glow}`,
                }}
              >
                <Compass className="w-3.5 h-3.5" />
                立即前往
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: DUAL COUNTER-SCROLLING KINETIC GLASS PRISM RIBBONS (NO OUTER BOX!) */}
      {mode === 'ribbon' && (
        <div className="w-full overflow-hidden py-6 space-y-5">
          {/* Top Ribbon: Leftward Glide */}
          <div className="portal-marquee-wrap">
            <div className="portal-marquee-track portal-marquee-left">
              {rowA.map((item, i) => {
                const cat = catOf(item.category);
                return (
                  <a
                    key={`ra-${item.id}-${i}`}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-[290px] shrink-0 liquid-glass rounded-3xl p-5 flex items-start gap-3.5 hover:-translate-y-2 transition-all duration-300 border border-white/20"
                    style={{ boxShadow: `0 16px 36px -16px rgba(0,0,0,0.55)` }}
                  >
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center font-mono text-sm font-bold text-white shrink-0 shadow-md group-hover:scale-110 transition-transform"
                      style={{
                        background: `linear-gradient(135deg, ${cat.color}, rgba(15,23,42,0.8))`,
                      }}
                    >
                      {item.badge}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-serif text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] truncate">
                          {item.name}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent)] shrink-0" />
                      </div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">{item.tag}</span>
                      <p className="text-xs text-[var(--text-secondary)] mt-1.5 line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Bottom Ribbon: Rightward Glide */}
          <div className="portal-marquee-wrap">
            <div className="portal-marquee-track portal-marquee-right">
              {rowB.map((item, i) => {
                const cat = catOf(item.category);
                return (
                  <a
                    key={`rb-${item.id}-${i}`}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-[290px] shrink-0 liquid-glass rounded-3xl p-5 flex items-start gap-3.5 hover:-translate-y-2 transition-all duration-300 border border-white/20"
                    style={{ boxShadow: `0 16px 36px -16px rgba(0,0,0,0.55)` }}
                  >
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center font-mono text-sm font-bold text-white shrink-0 shadow-md group-hover:scale-110 transition-transform"
                      style={{
                        background: `linear-gradient(135deg, ${cat.color}, rgba(15,23,42,0.8))`,
                      }}
                    >
                      {item.badge}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-serif text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] truncate">
                          {item.name}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent)] shrink-0" />
                      </div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">{item.tag}</span>
                      <p className="text-xs text-[var(--text-secondary)] mt-1.5 line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Clean Categorized Quick Directory Below (lightweight frosted cards over open anime sky) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10 pt-4">
        {LINK_CATEGORIES.filter((c) => activeCat === 'all' || c.id === activeCat).map((cat) => {
          const items = FRIEND_LINKS.filter((l) => l.category === cat.id);
          return (
            <div key={cat.id} className="space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: cat.color, boxShadow: `0 0 12px ${cat.color}` }}
                  />
                  <h2 className="font-serif text-xl font-bold text-[var(--text-primary)] drop-shadow">
                    {cat.name}
                  </h2>
                  <span className="text-[11px] font-mono text-[var(--text-muted)]">{cat.enName}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">{cat.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group liquid-glass rounded-2xl p-5 flex items-start gap-3.5 hover:-translate-y-1.5 transition-all duration-300 border border-white/15 hover:border-white/35"
                  >
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center font-mono text-sm font-bold text-white shrink-0 shadow-md group-hover:scale-105 transition-transform"
                      style={{
                        background: `linear-gradient(135deg, ${cat.color}, rgba(15,23,42,0.82))`,
                      }}
                    >
                      {item.badge}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                          {item.name}
                        </h3>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent)] shrink-0" />
                      </div>
                      <span className="inline-block text-[10px] font-mono text-[var(--text-muted)] mt-0.5">
                        {item.tag}
                      </span>
                      <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
