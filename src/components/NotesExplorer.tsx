import React, { useMemo, useState } from 'react';
import { Search, ArrowUpRight, BookOpen, Calendar, Clock } from 'lucide-react';
import {
  ARTICLES,
  ARTICLE_CATEGORY_META,
  type ArticleCategory,
} from '../data/articles';

const TABS: { key: 'all' | ArticleCategory; label: string; color?: string }[] = [
  { key: 'all', label: '全部精选' },
  { key: 'oc-ios', label: 'Objective-C & iOS', color: ARTICLE_CATEGORY_META['oc-ios'].color },
  { key: 'c-lang', label: 'C 语言 & 数据结构', color: ARTICLE_CATEGORY_META['c-lang'].color },
  { key: 'python', label: 'Python 学习', color: ARTICLE_CATEGORY_META.python.color },
];

interface NotesExplorerProps {
  baseUrl?: string;
}

export default function NotesExplorer({ baseUrl = '/' }: NotesExplorerProps) {
  const [activeTab, setActiveTab] = useState<'all' | ArticleCategory>('all');
  const [query, setQuery] = useState('');

  const resolveUrl = (path: string) => {
    const normBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const normPath = path.startsWith('/') ? path.slice(1) : path;
    return `${normBase}${normPath}`;
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter((a) => {
      if (activeTab !== 'all' && a.category !== activeTab) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.subTag.toLowerCase().includes(q) ||
        a.categoryLabel.toLowerCase().includes(q)
      );
    });
  }, [activeTab, query]);

  return (
    <div className="space-y-8">
      {/* Category Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['c-lang', 'oc-ios', 'python'] as ArticleCategory[]).map((catKey) => {
          const meta = ARTICLE_CATEGORY_META[catKey];
          const count = ARTICLES.filter((a) => a.category === catKey).length;
          const isSelected = activeTab === catKey;
          return (
            <button
              key={catKey}
              type="button"
              onClick={() => setActiveTab(isSelected ? 'all' : catKey)}
              className={`bento-card p-5 text-left transition-all cursor-pointer specular-edge ${
                isSelected ? 'ring-1 ring-[var(--accent)]' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: `${meta.color}22`, color: meta.color }}
                >
                  {meta.label}
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)]">{count} 篇</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-2">
                {meta.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Filter Bar + Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {TABS.map((tab) => {
            const active = activeTab === tab.key;
            const count =
              tab.key === 'all'
                ? ARTICLES.length
                : ARTICLES.filter((a) => a.category === tab.key).length;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                  active
                    ? 'bg-[var(--accent)] text-white shadow-sm'
                    : 'bg-[var(--bg-pill)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {tab.color && (
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: active ? '#fff' : tab.color }}
                  />
                )}
                <span>{tab.label}</span>
                <span className="font-mono text-[10px] opacity-80">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索标题、关键词（如 抽屉 / 链表 / Pyecharts）"
            className="w-full pl-9 pr-4 py-2 rounded-full text-xs bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {filtered.length === 0 ? (
        <div className="bento-card p-12 text-center text-sm text-[var(--text-muted)]">
          未找到包含 “{query}” 的笔记，换个关键词试试吧。
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {filtered.map((article) => {
            const meta = ARTICLE_CATEGORY_META[article.category];
            return (
              <a
                key={article.id}
                href={resolveUrl(`/notes/${article.id}`)}
                className="group bento-card bento-card-lift p-5 sm:p-6 flex flex-col justify-between gap-4 specular-edge"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                    <span
                      className="px-2.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${meta.color}20`,
                        color: meta.color,
                      }}
                    >
                      # {article.subTag}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[var(--text-muted)]">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 text-[var(--text-muted)] font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-[var(--accent)] group-hover:translate-x-0.5 transition-transform">
                    <BookOpen className="w-3.5 h-3.5" />
                    阅读全文
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
