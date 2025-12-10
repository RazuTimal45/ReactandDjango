import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, logout, isAuthenticated, user, loading, error } = useAuthStore();


  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      width: '100vw',
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.97)',
        backdropFilter: 'blur(12px)',
        borderRadius: '28px',
        boxShadow: '0 30px 60px rgba(0,0,0,0.25)',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '550px',
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
          padding: '48px 32px',
          textAlign: 'center',
          color: 'white',
        }}>
          <h1 style={{ fontSize: '36px', fontWeight: '800', margin: '0 0 12px 0', letterSpacing: '-0.5px' }}>
            {isLogin ? 'Welcome Back' : 'Join Us'}
          </h1>
          <p style={{ margin: 0, opacity: 0.95, fontSize: '17px' }}>
            {isLogin ? 'Log in to continue to your dashboard' : 'Create an account to get started'}
          </p>
        </div>

        {/* Form */}
        <div style={{ padding: '48px 48px 56px' }}>
          <AuthForm isLogin={isLogin} />

          {/* Toggle */}
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <p style={{ color: '#64748b', margin: '0 0 12px 0', fontSize: '15px' }}>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </p>
            <button
              onClick={() => setIsLogin(!isLogin)}
              style={{
                background: 'none',
                border: 'none',
                color: '#3b82f6',
                fontWeight: '700',
                fontSize: '16px',
                cursor: 'pointer',
                textDecoration: 'underline',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.color = '#2563eb'}
              onMouseLeave={(e) => e.target.style.color = '#3b82f6'}
            >
              {isLogin ? 'Sign up here' : 'Log in here'}
            </button>
          </div>

          {/* Demo Credentials */}
          {isLogin && (
            <div style={{
              marginTop: '40px',
              padding: '20px',
              backgroundColor: '#f0f9ff',
              borderRadius: '14px',
              border: '2px dashed #0ea5e9',
              fontSize: '15px',
              color: '#0369a1',
              textAlign: 'center',
            }}>
              <strong style={{ display: 'block', marginBottom: '8px', fontSize: '16px' }}>
                Demo Credentials
              </strong>
              Username: admin<br />
              Password: your_superuser_password
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Separate Auth Form
const AuthForm = ({ isLogin }) => {
  const { login, loading, error } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    try {
      await login(username, password);
      navigate('/');
    } catch (err)  {
      console.log(err)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '28px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#374151', fontSize: '15px' }}>
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '36px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#374151', fontSize: '15px' }}>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          style={inputStyle}
        />
      </div>

      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          color: '#991b1b',
          padding: '18px',
          borderRadius: '12px',
          border: '1px solid #fecaca',
          marginBottom: '28px',
          fontWeight: '500',
          fontSize: '15px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <span style={{ fontSize: '20px' }}>⚠️</span>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !username.trim() || !password.trim()}
        style={{
          width: '100%',
          padding: '18px',
          background: loading || !username.trim() || !password.trim()
            ? '#750e94ff'
            : 'linear-gradient(to right, #3b82f6, #8b5cf6)',
          color: 'white',
          border: 'none',
          borderRadius: '14px',
          fontSize: '18px',
          fontWeight: '700',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
        }}
      >
        {loading ? 'Signing In...' : (isLogin ? 'Sign In' : 'Create Account')}
      </button>
    </form>
  );
};

const inputStyle = {
  width: '90%',
  padding: '16px 20px',
  fontSize: '17px',
  border: '2px solid #e2e8f0',
  borderRadius: '12px',
  outline: 'none',
  transition: 'all 0.3s ease',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
};

export default Login;