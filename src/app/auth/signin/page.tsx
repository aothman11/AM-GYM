'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    
    try {
      const result = await signIn('resend', { 
        email,
        redirect: false,
        callbackUrl: '/'
      });
      
      if (result?.error) {
        setError('Failed to send email. Please try again.');
      } else {
        setSent(true);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'var(--bg)'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          padding: '40px 32px',
          background: 'var(--bg)',
          border: '1px solid var(--bg4)',
          borderRadius: '24px'
        }}>
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
          
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            fontWeight: 900,
            color: 'var(--white)',
            textAlign: 'center',
            marginBottom: '8px'
          }}>Check Your Email</h1>
          <p style={{
            fontSize: '15px',
            color: 'var(--gray2)',
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            We sent a sign-in link to<br />
            <strong style={{ color: 'var(--white)' }}>{email}</strong>
          </p>

          <div style={{
            background: 'var(--bg2)',
            border: '1px solid var(--bg4)',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '24px',
            fontSize: '14px',
            color: 'var(--gray2)',
            lineHeight: 1.6
          }}>
            <p style={{ marginBottom: '12px' }}>📬 Click the link in the email to sign in</p>
            <p style={{ marginBottom: '12px' }}>⏱️ The link expires in 24 hours</p>
            <p>📁 Check spam folder if you don't see it</p>
          </div>

          <button
            onClick={() => { setSent(false); setEmail(''); }}
            style={{
              width: '100%',
              padding: '14px 20px',
              background: 'var(--bg2)',
              color: 'var(--gray1)',
              border: '1px solid var(--bg4)',
              borderRadius: '16px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: '12px'
            }}
          >
            ← Use Different Email
          </button>

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

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'var(--bg)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '40px 32px',
        background: 'var(--bg)',
        border: '1px solid var(--bg4)',
        borderRadius: '24px'
      }}>
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '16px',
          background: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontSize: '22px',
          fontWeight: 900,
          color: 'var(--bg)',
          margin: '0 auto 24px'
        }}>
          AM
        </div>
        
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          fontWeight: 900,
          color: 'var(--white)',
          textAlign: 'center',
          marginBottom: '8px'
        }}>Welcome to AM-GYM</h1>
        <p style={{
          fontSize: '15px',
          color: 'var(--gray2)',
          textAlign: 'center',
          marginBottom: '32px'
        }}>Enter your email to sign in or create an account</p>

        {error && (
          <div style={{
            background: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            color: '#dc2626',
            padding: '12px 16px',
            borderRadius: '16px',
            fontSize: '14px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--gray2)',
              marginBottom: '8px'
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              style={{
                width: '100%',
                padding: '16px',
                background: 'var(--bg2)',
                border: '2px solid var(--bg4)',
                borderRadius: '16px',
                fontSize: '16px',
                color: 'var(--white)',
                outline: 'none'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            style={{
              width: '100%',
              padding: '16px 20px',
              background: email ? 'var(--accent)' : 'var(--bg4)',
              color: email ? 'var(--bg)' : 'var(--gray3)',
              border: 'none',
              borderRadius: '16px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: email && !loading ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '16px'
            }}
          >
            {loading ? 'Sending...' : 'Continue with Email →'}
          </button>
        </form>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: '20px 0',
          color: 'var(--gray3)'
        }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--bg4)' }} />
          <span style={{ fontSize: '12px' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--bg4)' }} />
        </div>

        <Link href="/" style={{
          display: 'block',
          width: '100%',
          padding: '14px 20px',
          background: 'var(--bg2)',
          color: 'var(--gray1)',
          border: '1px solid var(--bg4)',
          borderRadius: '16px',
          fontSize: '14px',
          fontWeight: 600,
          textAlign: 'center',
          textDecoration: 'none'
        }}>
          Continue as Guest
        </Link>

        <p style={{
          marginTop: '24px',
          fontSize: '11px',
          color: 'var(--gray3)',
          textAlign: 'center',
          lineHeight: 1.6
        }}>
          By continuing, you agree to our{' '}
          <Link href="/terms" style={{ color: 'var(--gray2)' }}>Terms</Link>
          {' '}and{' '}
          <Link href="/privacy" style={{ color: 'var(--gray2)' }}>Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
