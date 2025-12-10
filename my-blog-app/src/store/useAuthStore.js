import { create } from 'zustand';
import api from '../api/axios';


const TOKEN_KEY = 'authToken';

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,


  init: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      api.defaults.headers.common['Authorization'] = `Token ${token}`;
      get().fetchUser();
    }
  },

  // Fetch authenticated user data
  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/current-user/'); 
      set({ user: response.data,isAuthenticated:true,loading: false });
    } catch (err) {
      get().logout(); 
      set({ loading: false });
    }
  },

  // Login: Get token from Django
  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/api-token-auth/', { username, password });
      const token = response.data.token;
      localStorage.setItem(TOKEN_KEY, token);
      api.defaults.headers.common['Authorization'] = `Token ${token}`;
       
      await get().fetchUser(); 
         if(token){
             set({ isAuthenticated: true });
      }else{
           set({ isAuthenticated: false });
           window.location.href = '/login';
      }

    } catch (err) {
      const msg = err.response?.data?.non_field_errors?.[0] || 'Invalid username or password';
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

 
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    delete api.defaults.headers.common['Authorization'];
    set({ user: null, isAuthenticated: false, error: null });
  },
}));

