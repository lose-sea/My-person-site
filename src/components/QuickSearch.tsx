import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X, ArrowUpRight, Compass, FolderGit2, BookOpen, Sparkles } from 'lucide-react';
import { ROADMAP_STAGES } from '../data/roadmap';
import { PROJECTS } from '../data/projects';
import { ARTICLES } from '../data/articles';
import { FRIEND_LINKS } from '../data/links';

interface QuickSearchProps {
  baseUrl?: string;
}

interface SearchHit {
  id: string;
  type: 'roadmap' | 'project' | 'article' | 'link';
  typeLabel: string;
  title: string;
  subtitle: string;
  url: string;
  external?: boolean;
}

export default function QuickSearch({ baseUrl = '/' }: QuickSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const resolveUrl = (path: string) => {
    if (/^https?:\/\//i.test(path)) return path;
    const normBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const normPath = path.startsWith('/') ? path.slice(1) : path;
    return `${normBase}${normPath}`;
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    const onCustomOpen = () => setOpen(true);

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('lose-sea:open-search', onCustomOpen);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('lose-sea:open-search', onCustomOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      setQuery('');
    }
  }, [open]);

  const allItems = useMemo<SearchHit[]>(() => {
    const roadmapHits: SearchHit[] = ROADMAP_STAGES.map((s) => ({
      id: `rm-${s.id}`,
      type: 'roadmap',
      typeLabel: '学习路线',
      title: `${s.semester} · ${s.title}`,
      subtitle: s.skills.slice(0, 4).join(' / '),
      url: resolveUrl(`/roadmap#${s.id}`),
    }));

    const projectHits: SearchHit[] = PROJECTS.map((p) => ({
      id: `pr-${p.id}`,
      type: 'project',
      typeLabel: '项目',
      title: p.name,
      subtitle: `${p.tagline} · ${p.techStack.slice(0, 3).join(', ')}`,
      url: resolveUrl(`/projects#${p.id}`),
    }));

    const articleHits: SearchHit[] = ARTICLES.map((a) => ({
      id: `ar-${a.id}`,
      type: 'article',
      typeLabel: a.categoryLabel,
      title: a.title,
      subtitle: `${a.date} · ${a.summary}`,
      url: resolveUrl(`/notes/${a.id}`),
    }));

    const linkHits: SearchHit[] = FRIEND_LINKS.map((l) => ({
      id: `lk-${l.id}`,
      type: 'link',
      typeLabel: '友链',
      title: l.name,
      subtitle: l.desc,
      url: l.url,
      external: true,
    }));

    return [...projectHits, ...roadmapHits, ...articleHits, ...linkHits];
  }, [baseUrl]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems.slice(0, 8);
    return allItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.typeLabel.toLowerCase().includes(q)
      )
      .slice(0, 14);
  }, [query, allItems]);

  if (!open) return null;

  const iconFor = (type: SearchHit['type']) => {
    switch (type) {
      case 'roadmap':
        return <Compass className="w-4 h-4 text-sky-400" />;
      case 'project':
        return <FolderGit2 className="w-4 h-4 text-emerald-400" />;
      case 'article':
        return <BookOpen className="w-4 h-4 text-violet-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-pink-400" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4 bg-black/60 backdrop-blur-md"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-2xl rounded-2xl liquid-glass border border-[var(--border-strong)] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border-subtle)]">
          <Search className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索学习路线、iOS 项目、C / OC / Python 笔记或友链..."
            className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-pill)] cursor-pointer"
            aria-label="关闭搜索"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-2 space-y-1">
          {results.length === 0 ? (
            <div className="py-10 text-center text-sm text-[var(--text-muted)]">
              没有找到与 “{query}” 匹配的内容，试试搜索 <span className="text-[var(--accent)]">MyMusic</span>、<span className="text-[var(--accent)]">抽屉视图</span> 或 <span className="text-[var(--accent)]">链表</span>
            </div>
          ) : (
            results.map((hit) => (
              <a
                key={hit.id}
                href={hit.url}
                target={hit.external ? '_blank' : undefined}
                rel={hit.external ? 'noopener noreferrer' : undefined}
                onClick={() => setOpen(false)}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--bg-pill)] transition-colors group"
              >
                <div className="mt-0.5 p-1.5 rounded-lg bg-[var(--bg-pill)] border border-[var(--border-subtle)]">
                  {iconFor(hit.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                      {hit.title}
                    </span>
                    <span className="shrink-0 text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-pill)] text-[var(--text-muted)]">
                      {hit.typeLabel}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] truncate mt-0.5">{hit.subtitle}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
              </a>
            ))
          )}
        </div>

        <div className="px-4 py-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
          <span>支持搜索 C 语言 / OC / iOS / Python / 项目</span>
          <span>ESC 关闭</span>
        </div>
      </div>
    </div>
  );
}
