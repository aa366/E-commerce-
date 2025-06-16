import React from 'react';
import Link from 'next/link';

const page = () => {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '4rem', color: 'green', marginBottom: '1rem' }}>
        ✓
      </div>
      <h1>Purchase Successful!</h1>
      <p>Your order has been placed successfully. Thank you for shopping with us.</p>
      <Link href="/">
        <button style={{
          marginTop: '2rem',
          padding: '0.75em 2em',
          fontSize: '1rem',
          borderRadius: '0.5em',
          border: 'none',
          background: 'green',
          color: 'white',
          cursor: 'pointer'
        }}>
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default page;