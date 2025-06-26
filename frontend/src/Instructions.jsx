import React from 'react';

const styles = {
  container: {
    marginTop: '20px',
    padding: '15px',
    border: '1px solid #eee',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  step: {
    padding: '8px 0',
    borderBottom: '1px solid #eee',
    fontSize: '14px',
  },
};

export default function Instructions({ steps }) {
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Instructions de navigation</h3>
      <ul style={styles.list}>
        {steps.map((step, index) => (
          <li key={index} style={styles.step}>
            {`${index + 1}. ${step.instruction}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
