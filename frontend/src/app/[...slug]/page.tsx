import App from '@/App';

export async function generateStaticParams() {
  const routes = ['events', 'raids', 'rocket', 'ditto', 'eggs', 'rankings', 'filter', 'settings', 'admin'];

  return routes.map((route) => ({
    slug: [route],
  }));
}

export default function CatchAllRootPage() {
  return <App />;
}
