import App from '@/App';

export async function generateStaticParams() {
  const routes = ['events', 'guides', 'raids', 'rocket', 'ditto', 'eggs', 'rankings', 'filter', 'settings', 'download', 'app', 'admin'];

  return routes.map((route) => ({
    slug: [route],
  }));
}

export default function CatchAllRootPage() {
  return <App />;
}
