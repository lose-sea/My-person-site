import React, { useMemo, useState } from 'react';
import { ArrowUpRight, RotateCcw, Sparkles, Moon, Stars } from 'lucide-react';
import { FRIEND_LINKS, LINK_CATEGORIES, type FriendLink } from '../data/links';

type GraphMode = 'star-moon' | 'constellation';

interface Point {
  x: number;
  y: number;
}

const VIEW_W = 1000;
const VIEW_H = 580;
const CENTER: Point = { x: 500, y: 290 };

// Clean, non-overlapping geometric layout for Star-Moon mode
const STAR_MOON_HUBS: Record<string, Point> = {
  peers: { x: 285, y: 175 },
  'apple-ios': { x: 715, y: 175 },
  'my-spaces': { x: 285, y: 415 },
  'learning-tools': { x: 715, y: 415 },
};

// Constellation cluster centers & relative star offsets
const CLUSTER_CENTERS: Record<string, Point> = {
  peers: { x: 235, y: 190 },
  'apple-ios': { x: 750, y: 175 },
  'my-spaces': { x: 265, y: 425 },
  'learning-tools': { x: 745, y: 420 },
};

const CLUSTER_OFFSETS: Point[] = [
  { x: -78, y: -42 },
  { x: 14, y: -64 },
  { x: 86, y: -18 },
  { x: 32, y: 58 },
];

export default function ConstellationLinks() {
  const [mode, setMode] = useState<GraphMode>('star-moon');
  const [focusedCat, setFocusedCat] = useState<string | null>(null);
  const [selectedLink, setSelectedLink] = useState<FriendLink>(FRIEND_LINKS[0]);

  // Compute deterministic coordinates for every link node in each mode
  const nodePositions = useMemo(() => {
    const map: Record<string, Point> = {};

    LINK_CATEGORIES.forEach((cat) => {
      const catLinks = FRIEND_LINKS.filter((l) => l.category === cat.id);
      if (mode === 'star-moon') {
        const hub = STAR_MOON_HUBS[cat.id];
        const baseAngle = Math.atan2(hub.y - CENTER.y, hub.x - CENTER.x);
        const spread = Math.PI * 0.72;
        catLinks.forEach((link, idx) => {
          const step = catLinks.length > 1 ? idx / (catLinks.length - 1) - 0.5 : 0;
          const angle = baseAngle + step * spread;
          const radius = idx % 2 === 0 ? 118 : 138;
          map[link.id] = {
            x: Math.max(75, Math.min(VIEW_W - 75, hub.x + Math.cos(angle) * radius)),
            y: Math.max(60, Math.min(VIEW_H - 60, hub.y + Math.sin(angle) * radius)),
          };
        });
      } else {
        const c = CLUSTER_CENTERS[cat.id];
        catLinks.forEach((link, idx) => {
          const off = CLUSTER_OFFSETS[idx % CLUSTER_OFFSETS.length];
          map[link.id] = {
            x: c.x + off.x,
            y: c.y + off.y,
          };
        });
      }
    });

    return map;
  }, [mode]);

  const catColor = (catId: string) =>
    LINK_CATEGORIES.find((c) => c.id === catId)?.color || '#8b7bff';

  const resetGraph = () => {
    setFocusedCat(null);
    setSelectedLink(FRIEND_LINKS[0]);
  };

  return (
    <div className="space-y-10">
      {/* Interactive Sky Relationship Graph Container (zyx322.xyz/links/ homage) */}
      <div className="bento-card overflow-hidden relative specular-edge">
        {/* Top Floating Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 border-b border-[var(--border-subtle)] bg-black/15">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
            <Sparkles className="w-4 h-4 text-[var(--accent)]" />
            <span>
              {mode === 'star-moon'
                ? '星月图谱 · 点击星辰或分类节点探索连接'
                : '深空星座星群 · 点击星座徽章聚焦星群'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Dual-mode Pill Switcher */}
            <div className="inline-flex p-1 rounded-full bg-[var(--bg-pill)] border border-[var(--border-subtle)]">
              <button
                type="button"
                onClick={() => {
                  setMode('star-moon');
                  setFocusedCat(null);
                }}
                className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                  mode === 'star-moon'
                    ? 'bg-[var(--accent)] text-white shadow'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                ☽ 星月图谱
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('constellation');
                  setFocusedCat(null);
                }}
                className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                  mode === 'constellation'
                    ? 'bg-[var(--accent)] text-white shadow'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Stars className="w-3.5 h-3.5" />
                ✦ 星座星群
              </button>
            </div>

            <button
              type="button"
              onClick={resetGraph}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--bg-pill)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] inline-flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {focusedCat ? '✦ 展开全部' : '重置图谱'}
            </button>
          </div>
        </div>

        {/* SVG Deep-Sky Graph Canvas */}
        <div className="relative bg-gradient-to-b from-[#0b1024] via-[#101835] to-[#0a0e1a] min-h-[420px] sm:min-h-[540px] flex items-center justify-center overflow-hidden">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="w-full h-auto max-h-[580px] select-none"
            role="img"
            aria-label="友链星月关系图谱"
          >
            <defs>
              <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.55" />
                <stop offset="60%" stopColor="#8b7bff" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#8b7bff" stopOpacity="0" />
              </radialGradient>
              <filter id="starBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Ambient faint background dust stars */}
            {[
              [82, 92], [190, 62], [356, 84], [610, 68], [860, 96], [925, 220],
              [110, 310], [430, 145], [570, 445], [888, 495], [140, 510], [490, 535],
              [660, 290], [340, 315], [790, 295], [220, 265],
            ].map(([sx, sy], i) => (
              <circle
                key={i}
                cx={sx}
                cy={sy}
                r={i % 3 === 0 ? 1.5 : 1}
                fill="#e2e8f0"
                opacity={0.28 + (i % 4) * 0.12}
              />
            ))}

            {/* MODE 1: STAR-MOON RADIAL GRAPH */}
            {mode === 'star-moon' && (
              <>
                {/* Subtle orbital rings */}
                <circle cx={CENTER.x} cy={CENTER.y} r="145" fill="none" stroke="rgba(167,139,250,0.12)" strokeDasharray="4 6" />
                <circle cx={CENTER.x} cy={CENTER.y} r="275" fill="none" stroke="rgba(125,211,252,0.08)" strokeDasharray="3 8" />

                {/* Lines from Center Moon -> Category Hubs */}
                {LINK_CATEGORIES.map((cat) => {
                  const hub = STAR_MOON_HUBS[cat.id];
                  const dimmed = focusedCat && focusedCat !== cat.id;
                  return (
                    <line
                      key={`moon-${cat.id}`}
                      x1={CENTER.x}
                      y1={CENTER.y}
                      x2={hub.x}
                      y2={hub.y}
                      stroke={cat.color}
                      strokeOpacity={dimmed ? 0.12 : 0.45}
                      strokeWidth={dimmed ? 1 : 1.6}
                    />
                  );
                })}

                {/* Lines from Category Hubs -> Friend Star Nodes */}
                {FRIEND_LINKS.map((link) => {
                  const hub = STAR_MOON_HUBS[link.category];
                  const pos = nodePositions[link.id];
                  const color = catColor(link.category);
                  const dimmed = focusedCat && focusedCat !== link.category;
                  const isSel = selectedLink.id === link.id;
                  return (
                    <line
                      key={`edge-${link.id}`}
                      x1={hub.x}
                      y1={hub.y}
                      x2={pos.x}
                      y2={pos.y}
                      stroke={color}
                      strokeOpacity={isSel ? 0.9 : dimmed ? 0.08 : 0.35}
                      strokeWidth={isSel ? 2 : 1.1}
                    />
                  );
                })}

                {/* Central Crescent Moon Node (lose_sea) */}
                <g
                  className="cursor-pointer"
                  onClick={() => setFocusedCat(null)}
                >
                  <circle cx={CENTER.x} cy={CENTER.y} r="72" fill="url(#moonGlow)" />
                  <circle
                    cx={CENTER.x}
                    cy={CENTER.y}
                    r="34"
                    fill="#141b33"
                    stroke="#c4b5fd"
                    strokeOpacity="0.65"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M503 272C492 272 483 281 483 292C483 303 492 312 503 312C509 312 514 309 518 305C509 306 501 299 501 290C501 282 508 275 516 275C512 273 508 272 503 272Z"
                    fill="#e9d5ff"
                    filter="url(#starBlur)"
                  />
                  <text
                    x={CENTER.x}
                    y={CENTER.y + 52}
                    textAnchor="middle"
                    fill="#f8fafc"
                    fontSize="13"
                    fontWeight="600"
                    fontFamily="serif"
                  >
                    lose_sea
                  </text>
                </g>

                {/* Category Hub Nodes */}
                {LINK_CATEGORIES.map((cat) => {
                  const hub = STAR_MOON_HUBS[cat.id];
                  const active = focusedCat === cat.id;
                  const dimmed = focusedCat && !active;
                  return (
                    <g
                      key={`hub-${cat.id}`}
                      className="cursor-pointer transition-opacity"
                      opacity={dimmed ? 0.3 : 1}
                      onClick={() => setFocusedCat(active ? null : cat.id)}
                    >
                      <circle
                        cx={hub.x}
                        cy={hub.y}
                        r={active ? 22 : 17}
                        fill="#10172c"
                        stroke={cat.color}
                        strokeWidth={active ? 2.5 : 1.5}
                      />
                      <circle cx={hub.x} cy={hub.y} r="5" fill={cat.color} filter="url(#starBlur)" />
                      <text
                        x={hub.x}
                        y={hub.y + 34}
                        textAnchor="middle"
                        fill={cat.color}
                        fontSize="11.5"
                        fontWeight="600"
                      >
                        # {cat.name}
                      </text>
                    </g>
                  );
                })}
              </>
            )}

            {/* MODE 2: CONSTELLATION CLUSTERS */}
            {mode === 'constellation' &&
              LINK_CATEGORIES.map((cat) => {
                const catLinks = FRIEND_LINKS.filter((l) => l.category === cat.id);
                const center = CLUSTER_CENTERS[cat.id];
                const active = focusedCat === cat.id;
                const dimmed = focusedCat && !active;

                return (
                  <g key={`cluster-${cat.id}`} opacity={dimmed ? 0.22 : 1}>
                    {/* Soft nebula halo */}
                    <circle cx={center.x} cy={center.y} r="105" fill={cat.color} fillOpacity={active ? 0.14 : 0.06} />
                    {/* Connect stars sequentially to draw a constellation polygon */}
                    {catLinks.map((link, idx) => {
                      if (idx === catLinks.length - 1) return null;
                      const p1 = nodePositions[link.id];
                      const p2 = nodePositions[catLinks[idx + 1].id];
                      return (
                        <line
                          key={`cline-${link.id}`}
                          x1={p1.x}
                          y1={p1.y}
                          x2={p2.x}
                          y2={p2.y}
                          stroke={cat.color}
                          strokeOpacity="0.6"
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                        />
                      );
                    })}

                    {/* Constellation Label Pill */}
                    <g
                      className="cursor-pointer"
                      onClick={() => setFocusedCat(active ? null : cat.id)}
                    >
                      <rect
                        x={center.x - 86}
                        y={center.y + 78}
                        width="172"
                        height="26"
                        rx="13"
                        fill="rgba(15, 23, 42, 0.8)"
                        stroke={cat.color}
                        strokeOpacity={active ? 0.9 : 0.45}
                      />
                      <text
                        x={center.x}
                        y={center.y + 95}
                        textAnchor="middle"
                        fill="#f1f5f9"
                        fontSize="11"
                        fontWeight="500"
                      >
                        {cat.constellation.split('·')[0].trim()} · {catLinks.length} 颗星 · {active ? '展开' : '聚焦'}
                      </text>
                    </g>
                  </g>
                );
              })}

            {/* FRIEND 4-POINTED STAR NODES (Shared across both modes) */}
            {FRIEND_LINKS.map((link) => {
              const pos = nodePositions[link.id];
              const color = catColor(link.category);
              const isSelected = selectedLink.id === link.id;
              const dimmed = focusedCat && focusedCat !== link.category;
              const size = isSelected ? 12 : 8.5;

              // 4-pointed star path centered at (pos.x, pos.y)
              const starPath = `
                M ${pos.x} ${pos.y - size}
                Q ${pos.x} ${pos.y} ${pos.x + size} ${pos.y}
                Q ${pos.x} ${pos.y} ${pos.x} ${pos.y + size}
                Q ${pos.x} ${pos.y} ${pos.x - size} ${pos.y}
                Q ${pos.x} ${pos.y} ${pos.x} ${pos.y - size} Z
              `;

              return (
                <g
                  key={`star-${link.id}`}
                  className="cursor-pointer transition-opacity duration-300"
                  opacity={dimmed ? 0.18 : 1}
                  onMouseEnter={() => setSelectedLink(link)}
                  onClick={() => setSelectedLink(link)}
                >
                  {isSelected && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="18"
                      fill={color}
                      fillOpacity="0.22"
                      stroke={color}
                      strokeOpacity="0.7"
                      strokeWidth="1"
                    />
                  )}
                  <path
                    d={starPath}
                    fill={isSelected ? '#ffffff' : color}
                    filter="url(#starBlur)"
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 23}
                    textAnchor="middle"
                    fill={isSelected ? '#ffffff' : '#cbd5e1'}
                    fontSize={isSelected ? '12' : '10.5'}
                    fontWeight={isSelected ? '700' : '400'}
                  >
                    {link.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Floating Selected Star Inspector Card (Bottom-Left) */}
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:w-80 p-4 rounded-2xl liquid-glass border border-white/20 text-left shadow-2xl">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-mono font-bold text-white shrink-0"
                  style={{ backgroundColor: `${catColor(selectedLink.category)}44`, border: `1px solid ${catColor(selectedLink.category)}` }}
                >
                  {selectedLink.badge}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white truncate">{selectedLink.name}</div>
                  <div className="text-[10px] font-mono text-slate-300">{selectedLink.tag}</div>
                </div>
              </div>
              <a
                href={selectedLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium bg-[var(--accent)] text-white hover:brightness-110 inline-flex items-center gap-1"
              >
                访问 <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
            <p className="text-xs text-slate-200/85 mt-2.5 leading-relaxed">{selectedLink.desc}</p>
          </div>
        </div>
      </div>

      {/* Structured Category Cards Below Graph */}
      <div className="space-y-8">
        {LINK_CATEGORIES.map((cat) => {
          const items = FRIEND_LINKS.filter((l) => l.category === cat.id);
          return (
            <div key={cat.id} className="space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: cat.color, boxShadow: `0 0 10px ${cat.color}` }}
                  />
                  <h2 className="font-serif text-xl font-bold text-[var(--text-primary)]">{cat.name}</h2>
                  <span className="text-xs font-mono text-[var(--text-muted)]">{cat.constellation}</span>
                </div>
                <p className="text-xs text-[var(--text-muted)]">{cat.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bento-card bento-card-lift p-5 flex items-start gap-3.5 specular-edge"
                  >
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center font-mono text-sm font-bold text-white shrink-0 shadow-md"
                      style={{
                        background: `linear-gradient(135deg, ${cat.color}, rgba(15,23,42,0.85))`,
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
