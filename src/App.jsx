import React, { useState } from 'react';
import { supabase } from './lib/supabase';

function App() {
  const [email, setEmail] = useState('');
  const [letterContent, setLetterContent] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSealVault = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase
      .from('vault_letters')
      .insert([
        {
          recipient_email: email,
          letter_body: letterContent,
          unlock_date: releaseDate,
        },
      ]);

    setLoading(false);

    if (error) {
      alert('Error saving letter: ' + error.message);
    } else {
      alert('Your letter has been securely stored in the cloud!');
      setEmail('');
      setLetterContent('');
      setReleaseDate('');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Future Me Vault</h1>
      <form onSubmit={handleSealVault}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Recipient Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Letter to Future Self:</label>
          <textarea
            required
            rows="6"
            value={letterContent}
            onChange={(e) => setLetterContent(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          ></textarea>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Unlock Date:</label>
          <input
            type="date"
            required
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>

        <button type="submit" disabled={loading} style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}>
          {loading ? 'Sealing...' : 'Seal in Vault'}
        </button>
      </form>
    </div>
  );
}

export default App;

