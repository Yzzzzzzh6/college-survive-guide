import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SectionPage from './pages/SectionPage';
import ArticlePage from './pages/ArticlePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/section/:sectionId" element={<SectionPage />} />
      <Route path="/article/:articleId" element={<ArticlePage />} />
    </Routes>
  );
}
