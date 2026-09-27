import { useEffect, useState } from 'react';
import { AssetChecklist, Storyboard } from './engine/Pages';
import { StoryPlayer } from './engine/StoryPlayer';
import { acts, story } from './story';

type Route = 'player' | 'board' | 'assets';
const routeOf = (h: string): Route => (h.startsWith('#/board') ? 'board' : h.startsWith('#/assets') ? 'assets' : 'player');

export default function App() {
  const [route, setRoute] = useState<Route>(() => routeOf(window.location.hash));
  useEffect(() => {
    const on = () => setRoute(routeOf(window.location.hash));
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  if (route === 'board') return <Storyboard panels={story} acts={acts} />;
  if (route === 'assets') return <AssetChecklist panels={story} />;
  return <StoryPlayer panels={story} acts={acts} />;
}
