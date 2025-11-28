import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Counter from './components/Counter';
import './App.css';
import { useState } from 'react';

function App() {
  const [responseAlbum, setResponseAlbum] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePostAlbum = async () => {
    setLoading(true);
    setError(null);
    setResponseAlbum(null);

    try {
      const newAlbum = {
        userId: 1,
        title: 'My New Album'
      };

      const res = await fetch('https://jsonplaceholder.typicode.com/albums', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAlbum)
      });

      if (!res.ok) throw new Error('Failed to create album');

      const data = await res.json();
      setResponseAlbum(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Git push</h1>
      <Counter />

      <div style={{ marginTop: '20px' }}>
        <button onClick={handlePostAlbum} disabled={loading}>
          {loading ? 'Sending...' : 'Create New Album'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {responseAlbum && (
        <div style={{ marginTop: '20px' }}>
          <h2>Created Album:</h2>
          <table style={{
            borderCollapse: 'collapse',
            width: '100%',
            maxWidth: '500px',
            margin: '10px 0'
          }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>User ID</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Title</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{responseAlbum.id}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{responseAlbum.userId}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{responseAlbum.title}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
