import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Privacy } from './pages/legal/Privacy';
import { Terms } from './pages/legal/Terms';

// Admin is split out so the public homepage doesn't ship the auth + admin code.
const Admin = lazy(() => import('./pages/Admin').then((m) => ({ default: m.Admin })));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<div className="min-h-screen bg-navy-900" />}>
              <Admin />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
