'use client';

import Link from 'next/link';

export default function VerifyPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'var(--accent-dim)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: '36px'
        }}>
          ✉️
        </div>
        
        <h1 className="auth-title">Check Your Email</h1>
        <p className="auth-subtitle">
          A sign-in link has been sent to your email address
        </p>

        <div style={{
          background: 'var(--bg2)',
          border: '1px solid var(--bg4)',
          borderRadius: 'var(--r-lg)',
          padding: '20px',
          marginBottom: '24px',
          fontSize: '14px',
          color: 'var(--gray2)',
          lineHeight: 1.6
        }}>
          <p style={{ marginBottom: '12px' }}>📬 Click the link in the email to sign in</p>
          <p style={{ marginBottom: '12px' }}>⏱️ The link expires in 24 hours</p>
          <p>📁 Check your spam folder if you don't see it</p>
        </div>

        <Link href="/auth/signin" style={{
          display: 'block',
          width: '100%',
          padding: '14px 20px',
          background: 'var(--bg2)',
          color: 'var(--gray1)',
          border: '1px solid var(--bg4)',
          borderRadius: 'var(--r-lg)',
          fontSize: '14px',
          fontWeight: 600,
          textAlign: 'center',
          textDecoration: 'none',
          marginBottom: '12px'
        }}>
          ← Back to Sign In
        </Link>

        <Link href="/" style={{
          display: 'block',
          textAlign: 'center',
          color: 'var(--gray2)',
          fontSize: '14px',
          textDecoration: 'none'
        }}>
          Continue as Guest →
        </Link>
      </div>
    </div>
  );
}
