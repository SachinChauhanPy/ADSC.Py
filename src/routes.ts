import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('./pages/Index.tsx', { id: 'home' }),
  route('journey', './pages/Journey.tsx', { id: 'journey' }),
  route('journey/:id', './pages/JourneyDetail.tsx', { id: 'journey-detail' }),
  route('paths', './pages/Paths.tsx', { id: 'paths' }),
  route('paths/:id', './pages/PathDetail.tsx', { id: 'path-detail' }),
  route('sessions', './pages/Sessions.tsx', { id: 'sessions' }),
  route('sessions/:id', './pages/SessionDetail.tsx', { id: 'session-detail' }),
  route('opportunities', './pages/Opportunities.tsx', { id: 'opportunities' }),
  route('opportunities/:id', './pages/OpportunityDetail.tsx', { id: 'opportunity-detail' }),
  route('community', './pages/Community.tsx', { id: 'community' }),
  route('about', './pages/About.tsx', { id: 'about' }),
  route('privacy', './pages/Privacy.tsx', { id: 'privacy' }),
  route('terms', './pages/Terms.tsx', { id: 'terms' }),
  route('admin/seo', './pages/SeoDashboard.tsx', { id: 'seo-dashboard' }),
  route('*', './pages/NotFound.tsx', { id: 'not-found' }),
] satisfies RouteConfig;

