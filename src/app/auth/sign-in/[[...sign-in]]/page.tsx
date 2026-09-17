import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 24,
      padding: '20px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 900, letterSpacing: 2, marginBottom: 4 }}>
          AM<span style={{ color: 'var(--violet)' }}>GYM</span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--gray2)' }}>Train. Track. Transform.</div>
      </div>
      <SignIn />
    </div>
  );
}
