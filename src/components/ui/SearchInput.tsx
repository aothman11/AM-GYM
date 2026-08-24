'use client';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

/** Reusable search input with a leading magnifier icon. */
export function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <div style={{ position: 'relative', marginBottom: '12px' }}>
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '14px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '17px',
          color: 'var(--gray3)',
          pointerEvents: 'none',
        }}
      >
        🔍
      </span>
      <input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          background: 'var(--bg2)',
          border: '1.5px solid var(--bg4)',
          borderRadius: 'var(--r-lg)',
          padding: '12px 16px 12px 44px',
          color: 'var(--white)',
          fontSize: '14px',
          outline: 'none',
        }}
      />
    </div>
  );
}
