import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { getNavItems } from '../data/loader';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navItems = getNavItems();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled || !isHome ? 'bg-[#0c0c0c]/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="w-full px-6 lg:px-12 flex items-center justify-between h-16">
        <Link to="/" className="text-[#f6f6f6] font-black text-sm tracking-[0.2em] hover:text-[#ff0022] transition-colors uppercase">
          避坑指南
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={`/section/${item.id}`}
              className={`text-xs tracking-[0.15em] uppercase transition-colors hover:text-[#ff0022] ${
                location.pathname.includes(item.id) ? 'text-[#ff0022]' : 'text-[#f6f6f6]/50'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#f6f6f6] p-2">
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0c0c0c]/95 backdrop-blur-md border-t border-white/10">
          <div className="px-6 py-4 flex flex-col gap-4">
            <Link to="/" className="text-sm text-[#f6f6f6]/50 hover:text-[#ff0022] tracking-wider">首页</Link>
            {navItems.map((item) => (
              <Link key={item.id} to={`/section/${item.id}`} className="text-sm tracking-wider hover:text-[#ff0022] text-[#f6f6f6]/50">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
