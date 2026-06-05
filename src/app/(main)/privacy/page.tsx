'use client';

import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      padding: '20px',
      paddingBottom: '100px'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--green)',
          fontSize: '14px',
          marginBottom: '24px',
          textDecoration: 'none'
        }}>
          ← Back to App
        </Link>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          color: 'var(--white)',
          marginBottom: '8px'
        }}>
          Privacy Policy
        </h1>
        
        <p style={{ color: 'var(--gray2)', fontSize: '13px', marginBottom: '32px' }}>
          Last updated: May 2025
        </p>

        <div style={{ color: 'var(--gray1)', fontSize: '14px', lineHeight: 1.7 }}>
          <section style={{ marginBottom: '28px' }}>
            <h2 style={{ color: 'var(--white)', fontSize: '18px', marginBottom: '12px' }}>
              1. Information We Collect
            </h2>
            <p>
              When you sign in with Google, we collect your basic profile information including:
            </p>
            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
              <li>Name</li>
              <li>Email address</li>
              <li>Profile picture</li>
            </ul>
            <p style={{ marginTop: '12px' }}>
              We also store your workout data, preferences, and progress locally on your device.
            </p>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h2 style={{ color: 'var(--white)', fontSize: '18px', marginBottom: '12px' }}>
              2. How We Use Your Information
            </h2>
            <p>We use the information to:</p>
            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
              <li>Personalize your fitness experience</li>
              <li>Track your workout progress</li>
              <li>Provide customized workout recommendations</li>
              <li>Improve our app and services</li>
            </ul>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h2 style={{ color: 'var(--white)', fontSize: '18px', marginBottom: '12px' }}>
              3. Data Storage
            </h2>
            <p>
              Your workout data is stored locally on your device using browser storage. 
              We do not store your workout data on external servers. Your Google authentication 
              information is handled securely through Google's OAuth service.
            </p>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h2 style={{ color: 'var(--white)', fontSize: '18px', marginBottom: '12px' }}>
              4. Data Sharing
            </h2>
            <p>
              We do not sell, trade, or share your personal information with third parties. 
              Your data remains private and is only used to provide you with our fitness services.
            </p>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h2 style={{ color: 'var(--white)', fontSize: '18px', marginBottom: '12px' }}>
              5. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
              <li>Access your personal data</li>
              <li>Delete your account and data</li>
              <li>Export your workout data</li>
              <li>Opt out of any communications</li>
            </ul>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h2 style={{ color: 'var(--white)', fontSize: '18px', marginBottom: '12px' }}>
              6. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <span style={{ color: 'var(--green)' }}>support@amgym.app</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
