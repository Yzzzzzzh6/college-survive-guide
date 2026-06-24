import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, TrendingUp, AlertTriangle } from 'lucide-react';
import Navigation from '../components/Navigation';
import { getSections, getHero, getCoverStory } from '../data/loader';

export default function HomePage() {
  const sections = getSections();
  const hero = getHero();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => { setTimeout(() => setRevealed(true), 300); }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('animate-in'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.home-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      <Navigation />

      {/* ===== HERO ===== */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <video src="/videos/hero-bg.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-[#0c0c0c]/60" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <div className={`inline-flex items-center gap-2 px-4 py-2 border border-[#ff0022]/30 mb-10 transition-all duration-1000 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Shield className="w-4 h-4 text-[#ff0022]" />
            <span className="text-xs tracking-[0.3em] uppercase text-[#ff0022] font-medium">{hero.subtitle}</span>
          </div>
          <h1 className={`text-5xl md:text-7xl lg:text-9xl font-black text-[#f6f6f6] mb-6 leading-none tracking-tight transition-all duration-1000 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '200ms' }}>
            <span className="block">{hero.title.slice(0, 3)}</span>
            <span className="block text-[#ff0022]">{hero.title.slice(3)}</span>
          </h1>
          <p className={`text-lg md:text-xl text-[#f6f6f6]/50 max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-1000 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
            {hero.description}
          </p>
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '600ms' }}>
            <Link to="/section/campus" className="group relative px-8 py-4 bg-[#ff0022] text-[#0c0c0c] text-sm font-bold tracking-wider uppercase overflow-hidden">
              <span className="relative z-10 flex items-center gap-3">开始探索 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
              <span className="absolute inset-0 bg-[#f6f6f6] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </div>
        </div>
        <div className={`absolute top-24 left-6 w-16 h-16 border-l border-t border-[#ff0022]/30 transition-all duration-1000 delay-500 ${revealed ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute top-24 right-6 w-16 h-16 border-r border-t border-[#ff0022]/30 transition-all duration-1000 delay-500 ${revealed ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute bottom-24 left-6 w-16 h-16 border-l border-b border-[#ff0022]/30 transition-all duration-1000 delay-500 ${revealed ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute bottom-24 right-6 w-16 h-16 border-r border-b border-[#ff0022]/30 transition-all duration-1000 delay-500 ${revealed ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 delay-1000 ${revealed ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col items-center gap-2 text-[#f6f6f6]/20">
            <span className="text-[10px] tracking-[0.4em]">SCROLL</span>
            <div className="w-px h-16 bg-gradient-to-b from-[#f6f6f6]/30 to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      {/* ===== COVER STORY 本期特稿 ===== */}
      <CoverStorySection />

      {/* ===== DATA IMPACT (desktop full / mobile compact) ===== */}
      <DataImpactSection />

      {/* ===== SECTIONS (desktop: full cards / mobile: compact list) ===== */}
      <section id="sections" className="w-full py-20 md:py-24 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="home-reveal opacity-0 translate-y-6 transition-all duration-700 mb-10 md:mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-[#ff0022] mb-4 block">五大栏目</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#f6f6f6]">深度调查栏目</h2>
            <p className="text-[#f6f6f6]/40 text-sm mt-4 max-w-md">点击进入栏目浏览全部稿件</p>
          </div>

          {/* DESKTOP: full editorial cards */}
          <div className="hidden md:flex flex-col gap-6">
            {sections.map((section, i) => (
              <div key={section.id} className="home-reveal opacity-0 translate-y-6 transition-all duration-700" style={{ transitionDelay: `${i * 100}ms` }}>
                <Link to={`/section/${section.id}`} className="group block border border-white/10 hover:border-white/20 transition-all overflow-hidden">
                  <div className="flex flex-row">
                    <div className="w-2/5 relative h-56 lg:h-64 overflow-hidden">
                      <img src={section.coverImage} alt={section.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 px-2 py-1 text-[10px] tracking-widest uppercase font-bold" style={{ backgroundColor: section.color, color: '#0c0c0c' }}>{section.tag}</div>
                    </div>
                    <div className="w-3/5 p-6 lg:p-8 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-[#f6f6f6] mb-2 group-hover:text-[#ff0022] transition-colors">{section.title}</h3>
                      <p className="text-sm text-[#f6f6f6]/40 mb-4">{section.description}</p>
                      <div className="space-y-1">
                        {section.articles.slice(0, 2).map((a) => (
                          <div key={a.id} className="flex items-start gap-2 text-xs"><span className="text-[#f6f6f6]/20 mt-0.5">&#9654;</span><span className="text-[#f6f6f6]/50">{a.title}</span></div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-xs text-[#ff0022]/60 group-hover:text-[#ff0022]">
                        <span>浏览全部 {section.articles.length} 篇</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* MOBILE: compact entry list */}
          <div className="md:hidden space-y-3">
            {sections.map((section) => (
              <Link key={section.id} to={`/section/${section.id}`} className="group flex items-center gap-4 p-4 border border-white/10 active:bg-white/[0.03] transition-colors">
                <div className="w-1 self-stretch" style={{ backgroundColor: section.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] tracking-widest uppercase font-bold" style={{ color: section.color }}>{section.tag}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#f6f6f6] group-hover:text-[#ff0022] transition-colors truncate">{section.title}</h3>
                  <p className="text-xs text-[#f6f6f6]/30 truncate">{section.subtitle}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#f6f6f6]/20 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOTLINES ===== */}
      <section className="w-full py-20 md:py-24 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="home-reveal opacity-0 translate-y-6 transition-all duration-700">
            <AlertTriangle className="w-8 h-8 text-[#ff0022] mx-auto mb-6" />
            <h2 className="text-3xl font-black text-[#f6f6f6] mb-4">遇到问题？立即行动</h2>
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 border border-[#ff0022]/20 bg-[#ff0022]/[0.02]">
              <div className="text-center sm:text-left"><div className="text-xs text-[#f6f6f6]/40 mb-1">消费者投诉</div><div className="text-2xl font-black text-[#ff0022]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>12315</div></div>
              <div className="w-px h-8 bg-white/10 hidden sm:block" />
              <div className="text-center sm:text-left"><div className="text-xs text-[#f6f6f6]/40 mb-1">价格举报</div><div className="text-lg font-bold text-[#f6f6f6]/60" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>12358</div></div>
              <div className="w-px h-8 bg-white/10 hidden sm:block" />
              <div className="text-center sm:text-left"><div className="text-xs text-[#f6f6f6]/40 mb-1">法律援助</div><div className="text-lg font-bold text-[#f6f6f6]/60" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>12348</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="w-full px-6 lg:px-12 py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <span className="text-[#f6f6f6] font-black text-sm tracking-[0.2em] uppercase">避坑指南</span>
              <p className="text-sm text-[#f6f6f6]/30 mt-4 leading-relaxed">大学生避坑生存指南——基于真实新闻报道与官方数据，为大学生群体提供消费安全与权益保护指南。</p>
            </div>
            <div>
              <h4 className="text-xs tracking-widest uppercase text-[#f6f6f6]/40 mb-4">专题栏目</h4>
              <div className="space-y-2">
                {sections.map((s) => <Link key={s.id} to={`/section/${s.id}`} className="block text-sm text-[#f6f6f6]/30 hover:text-[#ff0022] transition-colors">{s.title}</Link>)}
              </div>
            </div>
            <div>
              <h4 className="text-xs tracking-widest uppercase text-[#f6f6f6]/40 mb-4">维权渠道</h4>
              <div className="space-y-2 text-sm text-[#f6f6f6]/30">
                <p>消费者投诉：<span className="text-[#f6f6f6]/50" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>12315</span></p>
                <p>价格监督举报：<span className="text-[#f6f6f6]/50" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>12358</span></p>
                <p>法律援助热线：<span className="text-[#f6f6f6]/50" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>12348</span></p>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center">
            <p className="text-xs text-[#f6f6f6]/15 tracking-wider">大学生避坑生存指南 | 2025年度深度调查专题 | 内容基于公开新闻报道整理</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ===== DATA IMPACT SECTION ===== */
function DataImpactSection() {
  return (
    <section className="w-full py-20 md:py-32 px-6 lg:px-12 border-t border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="home-reveal opacity-0 translate-y-6 transition-all duration-700 mb-12 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-[#ff0022]" />
            <span className="text-xs tracking-[0.3em] uppercase text-[#ff0022]">数据聚焦</span>
          </div>
          <h2 className="text-3xl md:text-6xl font-black text-[#f6f6f6] mb-4">数字不会说谎</h2>
          <p className="hidden md:block text-[#f6f6f6]/40 max-w-xl text-sm">以下数据均来自官方公开发布的报告与通报。每一个数字背后，都是真实的消费者遭遇。</p>
        </div>

        {/* Hero stat - both desktop & mobile */}
        <div className="home-reveal opacity-0 translate-y-6 transition-all duration-700 mb-12 md:mb-20 border border-[#ff0022]/20 p-6 md:p-12 relative">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#ff0022] via-[#ff6b00] to-transparent" />
          <div className="text-xs tracking-[0.3em] uppercase text-[#ff0022]/60 mb-4">2025年全国外卖投诉举报总量</div>
          <BigStat target={505000} suffix=" 件" />
          <div className="mt-4 text-sm text-[#f6f6f6]/40">同比增长14.1% <span className="hidden md:inline">&middot; 相当于<span className="text-[#ff0022]">每天1384起</span>投诉</span> &middot; 国家市场监管总局</div>
        </div>

        {/* DESKTOP: 4-card grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {[
            { label: '南昌市12315挽回损失', display: '￥9,342,700', raw: 9342700, sub: '办结286018件，办结率99.83%', source: '南昌市市场监管局', color: '#ff6b00' },
            { label: '西藏12315挽回损失', display: '￥17,968,600', raw: 17968600, sub: '受理投诉举报2.17万件', source: '西藏自治区市场监管局', color: '#00d4ff' },
            { label: '大学生涉诈案件占比', display: '82%', raw: 82, sub: '受骗人数占高校受骗总人数', source: '公安部刑侦局', color: '#ff0022' },
            { label: '三类高发骗局占比', display: '71%', raw: 71, sub: '刷单返利+冒充熟人+虚假兼职', source: '全国高校电诈分析报告', color: '#ffb700' },
          ].map((stat, i) => (
            <div key={i} className="home-reveal opacity-0 translate-y-6 transition-all duration-700 bg-[#0c0c0c] p-8 md:p-10 group hover:bg-[#0c0c0c]/80" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: stat.color + '80' }}>{stat.label}</div>
              <StatNumber target={stat.raw} display={stat.display} color={stat.color} />
              <div className="text-sm text-[#f6f6f6]/40 mb-1">{stat.sub}</div>
              <div className="text-[10px] text-[#f6f6f6]/20">来源：{stat.source}</div>
              <div className="w-0 group-hover:w-full h-[2px] mt-6 transition-all duration-500" style={{ backgroundColor: stat.color }} />
            </div>
          ))}
        </div>

        {/* MOBILE: compact 2-column grid */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {[
            { label: '南昌挽回', value: '934万', sub: '12315', color: '#ff6b00' },
            { label: '西藏挽回', value: '1797万', sub: '12315', color: '#00d4ff' },
            { label: '大学生涉诈', value: '82%', sub: '公安部', color: '#ff0022' },
            { label: '三类高发骗局', value: '71%', sub: '电诈报告', color: '#ffb700' },
          ].map((stat, i) => (
            <div key={i} className="home-reveal opacity-0 translate-y-6 transition-all duration-700 border border-white/10 p-4" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="text-[10px] text-[#f6f6f6]/25 mb-2">{stat.label}</div>
              <div className="text-xl font-black mb-1" style={{ fontFamily: "'IBM Plex Mono', monospace", color: stat.color }}>{stat.value}</div>
              <div className="text-[10px] text-[#f6f6f6]/15">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Big stat with scroll-triggered animation */
function BigStat({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const trig = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !trig.current) {
        trig.current = true;
        const start = performance.now();
        const dur = 2500;
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-5xl md:text-8xl lg:text-9xl font-black text-[#f6f6f6] leading-none tracking-tighter" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      {val.toLocaleString()}{suffix}
    </div>
  );
}

/* Smaller stat number */
function StatNumber({ target, display, color }: { target: number; display: string; color: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const trig = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !trig.current) {
        trig.current = true;
        const start = performance.now();
        const dur = 2000;
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  const isPercent = display.includes('%');
  const isMoney = display.includes('￥');
  const formatted = isMoney ? `￥${val.toLocaleString()}` : `${val}${isPercent ? '%' : ''}`;

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-black mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace", color }}>
      {formatted}
    </div>
  );
}

/* ===== COVER STORY SECTION 本期特稿 ===== */
function CoverStorySection() {
  const story = getCoverStory();
  if (!story) return null;
  const { article, section } = story;

  return (
    <section className="w-full py-16 md:py-24 px-6 lg:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="home-reveal opacity-0 translate-y-6 transition-all duration-700 mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-[#E94560] animate-pulse" />
            <span className="text-xs tracking-[0.3em] uppercase text-[#E94560] font-bold">Cover Story / 本期特稿</span>
          </div>
        </div>

        {/* Main cover story card */}
        <div className="home-reveal opacity-0 translate-y-6 transition-all duration-700">
          <Link to={`/article/${article.id}`} className="group block border border-white/10 hover:border-[#E94560]/30 transition-all overflow-hidden bg-[#0c0c0c]">
            <div className="flex flex-col md:flex-row">
              {/* Left: image / video thumbnail */}
              <div className="w-full md:w-3/5 relative h-64 md:h-[420px] overflow-hidden">
                <img src={section.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0c]/80 via-transparent to-transparent" />
                {/* Play button overlay for video */}
                {article.video && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-[#f6f6f6]/60 rounded-full flex items-center justify-center group-hover:border-[#E94560] group-hover:scale-110 transition-all duration-500">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-[#f6f6f6]/80 border-b-[10px] border-b-transparent ml-1" />
                    </div>
                  </div>
                )}
                {/* Cover story badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#E94560] text-[#0c0c0c] text-[10px] tracking-widest uppercase font-black">
                  特稿
                </div>
                <div className="absolute top-4 right-4 px-2 py-1 text-[10px] tracking-widest uppercase font-bold" style={{ backgroundColor: section.color, color: '#0c0c0c' }}>
                  {section.tag}
                </div>
              </div>

              {/* Right: content */}
              <div className="w-full md:w-2/5 p-6 md:p-10 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#f6f6f6] mb-4 leading-tight group-hover:text-[#E94560] transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-[#f6f6f6]/40 mb-6 leading-relaxed line-clamp-4">
                  {article.summary}
                </p>
                <div className="space-y-3 mb-8">
                  {article.content.filter((b) => b.type === 'heading').slice(0, 3).map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#f6f6f6]/30">
                      <span className="text-[#E94560]/40">0{i + 1}</span>
                      <span className="truncate">{(h as {type: 'heading'; text: string}).text}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-[#f6f6f6]/20">
                    <span>{article.date}</span>
                    <span className="w-1 h-1 rounded-full bg-[#f6f6f6]/10" />
                    <span>{section.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#E94560]/60 group-hover:text-[#E94560]">
                    <span className="hidden md:inline">阅读全文</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Key stats bar */}
        <div className="home-reveal opacity-0 translate-y-6 transition-all duration-700 mt-6 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
          {[
            { label: '受害人', value: '2400+', color: '#E94560' },
            { label: '涉案金额', value: '1000万+', color: '#ff6b00' },
            { label: '视频报道', value: '3:45', color: '#00d4ff' },
            { label: '发布日期', value: '2025.12.22', color: '#ffb700' },
          ].map((stat, i) => (
            <div key={i} className="bg-[#0c0c0c] p-4 md:p-6 group hover:bg-[#0c0c0c]/80 transition-colors">
              <div className="text-[10px] text-[#f6f6f6]/20 mb-2 tracking-wider">{stat.label}</div>
              <div className="text-xl md:text-2xl font-black" style={{ fontFamily: "'IBM Plex Mono', monospace", color: stat.color }}>{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
