import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Newspaper, FileText } from 'lucide-react';
import Navigation from '../components/Navigation';
import DataCharts from '../components/DataCharts';
import { getArticleById, getSections } from '../data/loader';
import type { ContentBlock } from '../data/loader';

/* ===== Content renderer with mixed text-image layout ===== */
function ContentRenderer({ blocks, accentColor }: { blocks: ContentBlock[]; accentColor: string }) {
  const elements: React.ReactNode[] = [];
  let textBuffer: ContentBlock[] = [];

  const flushText = () => {
    if (textBuffer.length === 0) return;
    elements.push(
      <div key={`text-${elements.length}`} className="space-y-5">
        {textBuffer.map((block, i) => {
          if (block.type === 'text') return <p key={i} className="text-[15px] text-[#f6f6f6]/80 leading-[2] tracking-wide">{block.body}</p>;
          if (block.type === 'heading') return <h3 key={i} className="text-xl font-bold mt-10 mb-3" style={{ color: accentColor }}>{block.text}</h3>;
          if (block.type === 'list') return <ul key={i} className="space-y-3 my-5">{block.items?.map((item, j) => (<li key={j} className="flex items-start gap-3 text-sm text-[#f6f6f6]/70 leading-relaxed"><span className="mt-1 text-xs" style={{ color: accentColor }}>&#9654;</span>{item}</li>))}</ul>;
          return null;
        })}
      </div>
    );
    textBuffer = [];
  };

  blocks.forEach((block, idx) => {
    if (block.type === 'image') {
      flushText();
      const isWide = elements.length % 3 === 0;
      elements.push(
        <figure key={`img-${idx}`} className={`my-8 ${isWide ? '' : 'md:ml-8 md:mr-8'}`}>
          <div className="overflow-hidden border border-white/10">
            <img src={block.src} alt={block.caption || ''} className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700" />
          </div>
          <figcaption className="text-[11px] text-[#f6f6f6]/25 mt-2 italic" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{block.caption}</figcaption>
        </figure>
      );
    } else if (block.type === 'video') {
      flushText();
      elements.push(
        <figure key={`vid-${idx}`} className="my-8">
          <div className="overflow-hidden border border-white/10">
            <video src={block.src} controls className="w-full h-auto" poster={block.src?.replace('.mp4', '.jpg')} />
          </div>
          <figcaption className="text-[11px] text-[#f6f6f6]/25 mt-2 italic" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{block.caption}</figcaption>
        </figure>
      );
    } else {
      textBuffer.push(block);
    }
  });
  flushText();

  return <>{elements}</>;
}

export default function ArticlePage() {
  const { articleId } = useParams<{ articleId: string }>();
  const result = articleId ? getArticleById(articleId) : undefined;
  const sections = getSections();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [articleId]);

  if (!result) {
    return (
      <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#f6f6f6] mb-4">文章未找到</h1>
          <Link to="/" className="text-[#ff0022] hover:underline text-sm">返回首页</Link>
        </div>
      </div>
    );
  }

  const { article, section } = result;
  const allArticles = sections.flatMap((s) => s.articles);
  const currentIndex = allArticles.findIndex((a) => a.id === articleId);
  const prev = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const next = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  // Charts data for data journalism articles
  let charts = null;
  if (article.id === 'rights-data' && article.hasCharts) {
    charts = [
      { type: 'bar' as const, title: '各地12315平台为消费者挽回经济损失（万元/年）', data: [{name:'西藏',value:1797},{name:'南昌',value:934},{name:'南川',value:312},{name:'三明Q1',value:28}], xKey: 'name', dataKey: 'value', color: '#22c55e' },
      { type: 'pie' as const, title: '消费投诉商品类别分布', data: [{name:'食品',value:38},{name:'服装鞋帽',value:16},{name:'家居用品',value:12},{name:'电子产品',value:11},{name:'其他',value:23}], nameKey: 'name', valueKey: 'value' },
    ];
  } else if (article.id === 'campus-takeout' && article.hasCharts) {
    charts = [
      { type: 'pie' as const, title: '外卖投诉举报问题类型分布（2025年）', data: [{name:'食品安全',value:51.9},{name:'售后服务',value:12.5},{name:'其他',value:22.5},{name:'合同',value:4.8},{name:'不正当竞争',value:4.5},{name:'质量',value:3.8}], nameKey: 'name', valueKey: 'value' },
      { type: 'bar' as const, title: '2025年各季度外卖投诉举报量（万件）', data: [{name:'Q1',value:10.8},{name:'Q2',value:11.5},{name:'Q3',value:14.7},{name:'Q4',value:13.5}], xKey: 'name', dataKey: 'value', color: '#ff0022' },
      { type: 'bar' as const, title: '外卖投诉增速与整体消费投诉增速对比（%）', data: [{name:'外卖投诉',value:14.1},{name:'整体消费投诉',value:9.6}], xKey: 'name', dataKey: 'value', color: '#ff6b00' },
    ];
  }

  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      <Navigation />
      {/* Reading progress */}
      <div className="fixed top-16 left-0 w-full h-[2px] bg-white/5 z-40">
        <div className="h-full bg-[#ff0022] transition-all duration-100" style={{ width: `${progress}%` }} />
      </div>

      {/* Hero */}
      <header className="relative w-full overflow-hidden">
        <div className="h-[45vh] md:h-[55vh] relative">
          <img src={section.coverImage} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/60 to-transparent" />
        </div>
        <div className="relative z-10 w-full px-6 lg:px-12 pb-8 -mt-32 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] tracking-widest uppercase px-2 py-1 font-bold" style={{ backgroundColor: section.color, color: '#0c0c0c' }}>{section.tag}</span>
            <Link to={`/section/${section.id}`} className="text-xs text-[#f6f6f6]/30 hover:text-[#ff0022] transition-colors">{section.title}</Link>
          </div>
          {/* Cover story badge for featured article */}
          {article.id === 'gaming-fraud' && (
            <div className="mb-4 inline-flex items-center gap-2">
              <span className="px-3 py-1 bg-[#E94560] text-[#0c0c0c] text-[10px] tracking-widest uppercase font-black">本期特稿</span>
              <span className="text-[10px] text-[#E94560]/60 tracking-wider">DEPTH INVESTIGATION</span>
            </div>
          )}
          <h1 className="text-3xl md:text-5xl font-black text-[#f6f6f6] leading-tight mb-5">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#f6f6f6]/30">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{article.date}</span>
            <span className="flex items-center gap-1"><Newspaper className="w-3 h-3" />{article.source}</span>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <article className="w-full px-6 lg:px-12 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Summary */}
          <div className="text-base text-[#f6f6f6]/50 leading-relaxed mb-12 border-l-2 pl-6 italic" style={{ borderLeftColor: section.color + '40' }}>
            {article.summary}
          </div>

          {/* Data charts (only for data journalism article) */}
          {charts && <DataCharts charts={charts} />}

          {/* Main content */}
          <ContentRenderer blocks={article.content} accentColor={section.color} />

          {/* Source citation */}
          <div className="mt-16 pt-8 border-t border-white/5">
            <div className="flex items-start gap-3">
              <FileText className="w-4 h-4 text-[#f6f6f6]/20 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs text-[#f6f6f6]/20 mb-1">文章来源</div>
                <div className="text-sm text-[#f6f6f6]/40">{article.source}</div>
                <div className="text-xs text-[#f6f6f6]/15 mt-2">本文内容基于公开新闻报道整理，仅供参考。如涉及法律问题，请咨询专业律师。</div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Navigation Footer */}
      <footer className="w-full px-6 lg:px-12 py-12 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            {prev ? (
              <Link to={`/article/${prev.id}`} className="group flex items-center gap-3 text-[#f6f6f6]/30 hover:text-[#ff0022] max-w-[45%]">
                <ArrowLeft className="w-4 h-4 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
                <div className="text-left min-w-0"><div className="text-[10px] uppercase opacity-30">上一篇</div><div className="text-sm font-bold truncate">{prev.title}</div></div>
              </Link>
            ) : <div />}
            {next ? (
              <Link to={`/article/${next.id}`} className="group flex items-center gap-3 text-[#f6f6f6]/30 hover:text-[#ff0022] max-w-[45%]">
                <div className="text-right min-w-0"><div className="text-[10px] uppercase opacity-30">下一篇</div><div className="text-sm font-bold truncate">{next.title}</div></div>
                <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div />}
          </div>
          <div className="text-center">
            <Link to={`/section/${section.id}`} className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-sm text-[#f6f6f6]/40 hover:bg-[#f6f6f6] hover:text-[#0c0c0c] transition-all">
              <ArrowLeft className="w-4 h-4" />返回{section.title}
            </Link>
          </div>
        </div>
      </footer>

      <div className="w-full px-6 py-8 border-t border-white/5 text-center">
        <p className="text-xs text-[#f6f6f6]/15 tracking-wider">大学生避坑生存指南 | 2025年度深度调查专题 | 内容基于公开新闻报道整理</p>
      </div>
    </div>
  );
}
