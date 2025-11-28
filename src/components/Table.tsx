// src/components/Table.tsx
import { useState, useEffect } from 'react';

const Table = () => {
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAlbums = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/albums');
      if (!res.ok) throw new Error('Failed to fetch albums');
      const data: any[] = await res.json();
      setAlbums(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchAlbums} disabled={loading}>
        {loading ? 'Loading...' : 'Load Albums'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>Error: {error}</p>}

      {albums.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Albums List:</h2>
          <table style={{
            borderCollapse: 'collapse',
            width: '100%',
            maxWidth: '800px',
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
              {albums.map(album => (
                <tr key={album.id}>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{album.id}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{album.userId}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{album.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;
