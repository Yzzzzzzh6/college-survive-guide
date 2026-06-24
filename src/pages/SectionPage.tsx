import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Calendar, Hash, AlertTriangle, Bookmark, Zap } from 'lucide-react';
import Navigation from '../components/Navigation';
import DataCharts from '../components/DataCharts';
import { getSection, getSections } from '../data/loader';

const rightsCharts = [
  { type: 'bar' as const, title: '各地12315平台为消费者挽回经济损失（万元/年）', data: [{name:'西藏',value:1797},{name:'南昌',value:934},{name:'南川',value:312},{name:'三明Q1',value:28}], xKey: 'name', dataKey: 'value', color: '#22c55e' },
  { type: 'pie' as const, title: '消费投诉商品类别分布', data: [{name:'食品',value:38},{name:'服装鞋帽',value:16},{name:'家居用品',value:12},{name:'电子产品',value:11},{name:'其他',value:23}], nameKey: 'name', valueKey: 'value' },
];

export default function SectionPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const section = sectionId ? getSection(sectionId) : undefined;
  const allSections = getSections();
  const currentIdx = allSections.findIndex((s) => s.id === sectionId);
  const prev = currentIdx > 0 ? allSections[currentIdx - 1] : null;
  const nextSection = currentIdx < allSections.length - 1 ? allSections[currentIdx + 1] : null;

  if (!section) return <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center text-[#f6f6f6]">栏目未找到 <Link to="/" className="text-[#ff0022] ml-2">返回</Link></div>;

  if (section.id === 'campus') return <CampusPage section={section} prev={prev} next={nextSection} />;
  if (section.id === 'housing') return <HousingPage section={section} prev={prev} next={nextSection} />;
  if (section.id === 'gaming') return <GamingPage section={section} prev={prev} next={nextSection} />;
  if (section.id === 'rights') return <RightsPage section={section} prev={prev} next={nextSection} />;
  return <JobsPage section={section} prev={prev} next={nextSection} />;
}

/* ===== SHELL ===== */
function Shell({ section, prev, next, children, showCharts }: { section: any; prev: any; next: any; children: React.ReactNode; showCharts?: boolean }) {
  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      <Navigation />
      <header className="relative w-full h-[50vh] md:h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={section.coverImage} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/50 to-transparent" />
        </div>
        <div className="relative z-10 w-full px-6 lg:px-12 pb-10 pt-32 max-w-6xl mx-auto">
          <span className="inline-block text-[10px] tracking-widest uppercase px-2 py-1 mb-4 font-bold" style={{ backgroundColor: section.color, color: '#0c0c0c' }}>{section.tag}</span>
          <h1 className="text-4xl md:text-6xl font-black text-[#f6f6f6] mb-3">{section.title}</h1>
          <p className="text-base text-[#f6f6f6]/40 max-w-2xl">{section.description}</p>
        </div>
      </header>
      <section className="w-full px-6 lg:px-12 py-16 max-w-6xl mx-auto">
        {showCharts && <DataCharts charts={rightsCharts} />}
        {children}
      </section>
      <div className="w-full px-6 lg:px-12 py-8 border-t border-white/10 max-w-6xl mx-auto flex items-center justify-between">
        {prev ? <Link to={`/section/${prev.id}`} className="flex items-center gap-2 text-[#f6f6f6]/30 hover:text-[#ff0022] text-sm"><ArrowLeft className="w-4 h-4" />{prev.title}</Link> : <div />}
        <Link to="/" className="text-xs text-[#f6f6f6]/15 hover:text-[#f6f6f6]/40">首页</Link>
        {next ? <Link to={`/section/${next.id}`} className="flex items-center gap-2 text-[#f6f6f6]/30 hover:text-[#ff0022] text-sm">{next.title}<ArrowRight className="w-4 h-4" /></Link> : <div />}
      </div>
      <div className="w-full py-8 border-t border-white/5 text-center">
        <p className="text-xs text-[#f6f6f6]/15 tracking-wider">大学生避坑生存指南 | 2025年度深度调查专题</p>
      </div>
    </div>
  );
}

/* ===== CAMPUS: Magazine editorial layout ===== */
function CampusPage({ section, prev, next }: { section: any; prev: any; next: any }) {
  const featured = section.articles.find((a: any) => a.featured);
  const others = section.articles.filter((a: any) => !a.featured);
  return (
    <Shell section={section} prev={prev} next={next}>
      {/* Featured: magazine spread */}
      {featured && (
        <Link to={`/article/${featured.id}`} className="group block mb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 overflow-hidden border border-white/10">
              <img src={featured.image} alt={featured.title} className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="md:col-span-5 flex flex-col justify-center">
              <span className="text-[10px] tracking-widest uppercase text-[#ff0022] mb-3">重点报道</span>
              <h2 className="text-2xl md:text-3xl font-black text-[#f6f6f6] mb-3 group-hover:text-[#ff0022] transition-colors leading-tight">{featured.title}</h2>
              <p className="text-sm text-[#f6f6f6]/40 leading-relaxed mb-4">{featured.summary}</p>
              <span className="text-xs text-[#f6f6f6]/20 flex items-center gap-1"><Calendar className="w-3 h-3" />{featured.date}</span>
            </div>
          </div>
        </Link>
      )}
      {/* Others: editorial cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {others.map((article: any) => (
          <Link key={article.id} to={`/article/${article.id}`} className="group block border-t border-white/10 pt-6">
            <div className="overflow-hidden mb-4 border border-white/5">
              <img src={article.image} alt={article.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="text-lg font-bold text-[#f6f6f6] mb-2 group-hover:text-[#ff0022] transition-colors">{article.title}</h3>
            <p className="text-sm text-[#f6f6f6]/40 mb-2 line-clamp-2">{article.summary}</p>
            <span className="text-[10px] text-[#f6f6f6]/20">{article.source} · {article.date}</span>
          </Link>
        ))}
      </div>
    </Shell>
  );
}

/* ===== HOUSING: Accordion cards layout ===== */
function HousingPage({ section, prev, next }: { section: any; prev: any; next: any }) {
  const featured = section.articles.find((a: any) => a.featured);
  const others = section.articles.filter((a: any) => !a.featured);
  return (
    <Shell section={section} prev={prev} next={next}>
      {featured && (
        <Link to={`/article/${featured.id}`} className="group block mb-12 relative border border-[#ff6b00]/20 overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#ff6b00]" />
          <div className="flex flex-col md:flex-row">
            <div className="md:w-3/5 h-56 md:h-64 overflow-hidden">
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="md:w-2/5 p-6 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2"><AlertTriangle className="w-3 h-3 text-[#ff6b00]" /><span className="text-[10px] tracking-widest uppercase text-[#ff6b00]">深度调查</span></div>
              <h2 className="text-xl font-black text-[#f6f6f6] mb-2 group-hover:text-[#ff6b00] transition-colors">{featured.title}</h2>
              <p className="text-xs text-[#f6f6f6]/40 leading-relaxed">{featured.summary}</p>
            </div>
          </div>
        </Link>
      )}
      <div className="space-y-0">
        {others.map((article: any) => (
          <Link key={article.id} to={`/article/${article.id}`} className="group flex gap-5 py-6 border-t border-white/5 hover:bg-white/[0.01] transition-colors px-4 -mx-4">
            <div className="flex-shrink-0 w-20 h-20 overflow-hidden border border-white/5">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-[#f6f6f6] mb-1 group-hover:text-[#ff6b00] transition-colors">{article.title}</h3>
              <p className="text-xs text-[#f6f6f6]/40 line-clamp-2 mb-1">{article.summary}</p>
              <span className="text-[10px] text-[#f6f6f6]/15">{article.source} · {article.date}</span>
            </div>
            <div className="flex-shrink-0 self-center"><Hash className="w-4 h-4 text-[#f6f6f6]/10 group-hover:text-[#ff6b00]/40 transition-colors" /></div>
          </Link>
        ))}
      </div>
    </Shell>
  );
}

/* ===== GAMING: Dark immersive layout ===== */
function GamingPage({ section, prev, next }: { section: any; prev: any; next: any }) {
  const featured = section.articles.find((a: any) => a.featured);
  const others = section.articles.filter((a: any) => !a.featured);
  return (
    <Shell section={section} prev={prev} next={next}>
      {featured && (
        <Link to={`/article/${featured.id}`} className="group block mb-10 relative">
          <div className="relative h-72 md:h-96 overflow-hidden border border-[#00d4ff]/10">
            <img src={featured.image} alt={featured.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-2"><Zap className="w-3 h-3 text-[#00d4ff]" /><span className="text-[10px] tracking-widest uppercase text-[#00d4ff]/60">警方通报</span></div>
              <h2 className="text-2xl md:text-4xl font-black text-[#f6f6f6] group-hover:text-[#00d4ff] transition-colors mb-2">{featured.title}</h2>
              <p className="text-sm text-[#f6f6f6]/40 max-w-xl">{featured.summary}</p>
            </div>
          </div>
        </Link>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {others.map((article: any) => (
          <Link key={article.id} to={`/article/${article.id}`} className="group border border-white/5 p-5 hover:border-[#00d4ff]/20 transition-all bg-[#0a0a0a]">
            <h3 className="text-base font-bold text-[#f6f6f6] mb-2 group-hover:text-[#00d4ff] transition-colors">{article.title}</h3>
            <p className="text-xs text-[#f6f6f6]/35 mb-3 leading-relaxed">{article.summary}</p>
            <span className="text-[10px] text-[#00d4ff]/30">{article.date} · {article.source}</span>
          </Link>
        ))}
      </div>
    </Shell>
  );
}

/* ===== RIGHTS: Data journalism + guide layout ===== */
function RightsPage({ section, prev, next }: { section: any; prev: any; next: any }) {
  const featured = section.articles.find((a: any) => a.featured);
  const others = section.articles.filter((a: any) => !a.featured);
  return (
    <Shell section={section} prev={prev} next={next} showCharts>
      {/* Featured: data journalism badge */}
      {featured && (
        <Link to={`/article/${featured.id}`} className="group block mb-14 border border-[#22c55e]/15 hover:border-[#22c55e]/30 transition-all p-6 md:p-8 relative">
          <div className="absolute top-0 right-0 px-3 py-1 text-[10px] tracking-widest uppercase bg-[#22c55e] text-[#0c0c0c] font-bold">数据新闻</div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-black text-[#f6f6f6] mb-3 group-hover:text-[#22c55e] transition-colors">{featured.title}</h2>
              <p className="text-sm text-[#f6f6f6]/45 leading-relaxed mb-4">{featured.summary}</p>
              <span className="text-xs text-[#22c55e]/40">{featured.source} · {featured.date}</span>
            </div>
            <div className="md:w-1/3">
              <img src={featured.image} alt={featured.title} className="w-full h-40 object-cover border border-white/5" />
            </div>
          </div>
        </Link>
      )}
      {/* Others: step cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
        {others.map((article: any) => (
          <Link key={article.id} to={`/article/${article.id}`} className="group bg-[#0c0c0c] p-6 hover:bg-[#0c0c0c]/80 transition-colors flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 border border-[#22c55e]/20 flex items-center justify-center">
              <Bookmark className="w-4 h-4 text-[#22c55e]/40 group-hover:text-[#22c55e] transition-colors" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#f6f6f6] mb-1 group-hover:text-[#22c55e] transition-colors">{article.title}</h3>
              <p className="text-xs text-[#f6f6f6]/35 leading-relaxed">{article.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </Shell>
  );
}

/* ===== JOBS: Alert ticker layout ===== */
function JobsPage({ section, prev, next }: { section: any; prev: any; next: any }) {
  const featured = section.articles.find((a: any) => a.featured);
  const others = section.articles.filter((a: any) => !a.featured);
  return (
    <Shell section={section} prev={prev} next={next}>
      {featured && (
        <Link to={`/article/${featured.id}`} className="group block mb-12 border-l-4 pl-6" style={{ borderLeftColor: '#ffb700' }}>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-white/5">
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="flex-1">
              <span className="text-[10px] tracking-widest uppercase text-[#ffb700]/50 mb-1 block">澎湃新闻调查报道</span>
              <h2 className="text-xl md:text-2xl font-black text-[#f6f6f6] mb-2 group-hover:text-[#ffb700] transition-colors">{featured.title}</h2>
              <p className="text-sm text-[#f6f6f6]/40 leading-relaxed">{featured.summary}</p>
            </div>
          </div>
        </Link>
      )}
      <div className="space-y-4">
        {others.map((article: any, i: number) => (
          <Link key={article.id} to={`/article/${article.id}`} className="group flex items-center gap-4 py-4 border-b border-white/5 hover:bg-white/[0.01] px-3 -mx-3 transition-colors">
            <span className="text-2xl font-black text-white/5 group-hover:text-[#ffb700]/15 transition-colors" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{String(i + 1).padStart(2, '0')}</span>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-[#f6f6f6] group-hover:text-[#ffb700] transition-colors truncate">{article.title}</h3>
              <span className="text-[10px] text-[#f6f6f6]/20">{article.source}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#f6f6f6]/10 group-hover:text-[#ffb700] group-hover:translate-x-1 transition-all flex-shrink-0" />
          </Link>
        ))}
      </div>
    </Shell>
  );
}
