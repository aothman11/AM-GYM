'use client';

import Link from 'next/link';

export default function TermsPage() {
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
          Terms of Service
        </h1>
        
        <p style={{ color: 'var(--gray2)', fontSize: '13px', marginBottom: '32px' }}>
          Last updated: May 2025
        </p>

        <div style={{ color: 'var(--gray1)', fontSize: '14px', lineHeight: 1.7 }}>
          <section style={{ marginBottom: '28px' }}>
            <h2 style={{ color: 'var(--white)', fontSize: '18px', marginBottom: '12px' }}>
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using AM-GYM, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h2 style={{ color: 'var(--white)', fontSize: '18px', marginBottom: '12px' }}>
              2. Description of Service
            </h2>
            <p>
              AM-GYM is a fitness application that provides:
            </p>
            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
              <li>Customized workout programs</li>
              <li>Exercise demonstrations and guides</li>
              <li>Progress tracking features</li>
              <li>Calorie and nutrition tracking</li>
            </ul>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h2 style={{ color: 'var(--white)', fontSize: '18px', marginBottom: '12px' }}>
              3. User Responsibilities
            </h2>
            <p>As a user, you agree to:</p>
            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
              <li>Provide accurate information when creating an account</li>
              <li>Use the service for personal, non-commercial purposes</li>
              <li>Not misuse or attempt to harm the service</li>
              <li>Consult a healthcare professional before starting any exercise program</li>
            </ul>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h2 style={{ color: 'var(--white)', fontSize: '18px', marginBottom: '12px' }}>
              4. Health Disclaimer
            </h2>
            <p style={{ 
              background: 'rgba(255,200,0,0.1)', 
              border: '1px solid rgba(255,200,0,0.3)',
              padding: '12px',
              borderRadius: '8px'
            }}>
              <strong style={{ color: '#ffc800' }}>⚠️ Important:</strong> AM-GYM provides fitness information 
              for educational purposes only. This is not medical advice. Always consult with a qualified 
              healthcare provider before beginning any exercise program, especially if you have any 
              medical conditions or concerns.
            </p>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h2 style={{ color: 'var(--white)', fontSize: '18px', marginBottom: '12px' }}>
              5. Intellectual Property
            </h2>
            <p>
              All content, features, and functionality of AM-GYM, including but not limited to 
              text, graphics, logos, and software, are the property of AM-GYM and are protected 
              by copyright and other intellectual property laws.
            </p>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h2 style={{ color: 'var(--white)', fontSize: '18px', marginBottom: '12px' }}>
              6. Limitation of Liability
            </h2>
            <p>
              AM-GYM shall not be liable for any injuries, damages, or losses resulting from 
              the use of our service or the exercises demonstrated. Users exercise at their own risk.
            </p>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h2 style={{ color: 'var(--white)', fontSize: '18px', marginBottom: '12px' }}>
              7. Modifications to Service
            </h2>
            <p>
              We reserve the right to modify or discontinue the service at any time without notice. 
              We may also update these Terms of Service from time to time.
            </p>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h2 style={{ color: 'var(--white)', fontSize: '18px', marginBottom: '12px' }}>
              8. Account Termination
            </h2>
            <p>
              We reserve the right to terminate or suspend your account at any time for violations 
              of these terms or for any other reason at our discretion.
            </p>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h2 style={{ color: 'var(--white)', fontSize: '18px', marginBottom: '12px' }}>
              9. Contact Information
            </h2>
            <p>
              For questions about these Terms of Service, please contact us at:
              <br />
              <span style={{ color: 'var(--green)' }}>support@amgym.app</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
