// src/components/Table.tsx
import { useState, useMemo } from 'react';

interface Album {
  userId: number;
  id: number;
  title: string;
}

const Table = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  const sortedAlbums = useMemo(() => {
    if (!sortOrder) return albums;
    return [...albums].sort((a, b) => {
      return sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });
  }, [albums, sortOrder]);

  const fetchAlbums = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/albums');
      if (!res.ok) throw new Error('Failed to fetch albums');
      const data: Album[] = await res.json();
      setAlbums(data);
      setSortOrder(null); // сброс сортировки при новой загрузке
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSort = () => {
    if (sortOrder === null) {
      setSortOrder('asc');
    } else if (sortOrder === 'asc') {
      setSortOrder('desc');
    } else {
      setSortOrder(null);
    }
  };

  return (
    <div>
      <button onClick={fetchAlbums} disabled={loading}>
        {loading ? 'Loading...' : 'Load Albums'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>Error: {error}</p>}

      {sortedAlbums.length > 0 && (
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
                <th
                  style={{
                    border: '1px solid #ccc',
                    padding: '8px',
                    cursor: 'pointer',
                    backgroundColor: sortOrder ? '#f0f0f0' : 'inherit'
                  }}
                  onClick={toggleSort}
                >
                  Title
                  {sortOrder === 'asc' ? ' ▲' : sortOrder === 'desc' ? ' ▼' : ''}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedAlbums.map(album => (
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
