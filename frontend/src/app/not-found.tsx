import Link from 'next/link';
import { NotFoundView } from '@/components/NotFoundView';

export default function GlobalNotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-dark, #0f1015)',
      color: 'var(--text-primary, #f8fafc)',
      padding: '24px'
    }}>
      <NotFoundView lang="cs" />
    </div>
  );
}
