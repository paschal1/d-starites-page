'use client';

import { useState } from 'react';
import axiosClient, { setAccessToken, getAccessToken } from '../utils/axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [responseData, setResponseData] = useState('');

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axiosClient.post('/auth/login', { email, password });
      const token = res.data.accessToken;
      setAccessToken(token);
      alert('✅ Login successful!');
    } catch (err: any) {
      setError(`❌ ${err.response?.data?.message || err.message}`);
    }
  };

  const callProtected = async () => {
    setError('');
    setResponseData('');
    try {
      const res = await axiosClient.get('/users/all');
      setResponseData(JSON.stringify(res.data, null, 2));
    } catch (err: any) {
      setError('❌ Failed to access protected route.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', fontFamily: 'Arial' }}>
      <h2>🔐 Login</h2>
      <form onSubmit={login}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px', width: '100%' }}>
          Login
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <hr />

      <p><strong>Current Access Token:</strong></p>
      <textarea rows={4} value={getAccessToken()} readOnly style={{ width: '100%' }} />

      <div style={{ marginTop: '10px' }}>
        <button onClick={callProtected} style={{ marginRight: '10px', padding: '8px' }}>
          🔐 Call Protected
        </button>
      </div>

      {responseData && (
        <>
          <h4>Protected Route Result:</h4>
          <pre>{responseData}</pre>
        </>
      )}
    </div>
  );
}
