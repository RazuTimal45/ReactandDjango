import { create } from 'zustand';
import api from '../api/axios';

export const useBlogStore = create((set) => ({
  categories: [],
  blogDetail:[],
  blogs: [],
  selectedCategory: null,
  adminSection: 'blogs',
  loading:false,
  error:null,


  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setAdminSection: (section) => set({adminSection: section}),

  fetchCategories: async() =>{
    set({loading:true, error:null});
    try{
      const response = await api.get('/categories/');
      const categoriesData = response.data.results || response.data;
      set({ categories: categoriesData, loading: false });
      console.log('category response format',response.data.results)

    }catch(err){
      set({error:err.response?.data?.detail || err.message, loading:false});
    }
  },
  
  fetchBlogs: async()=>{
    set({loading:true, error:null});
    try{
      const response = await api.get('/blogs/');
       const blogsData = response.data.results || response.data;
      set({ blogs: blogsData, loading: false });
      console.log('blog response format',response)
    }catch(err){
      set({ error: err.response?.data?.detail || err.message, loading: false });
    }
  },

  filteredBlogs:async (category) =>{
     set({loading:true, error:null});
     try{
      const response = await api.get(`/blogs/category/${category}/`);
      const blogsFilterData = response.data.results || response.data;
      set({blogs:blogsFilterData, loading:false});
     }catch(err){
      set({error: err.response?.data?.detail || err.message, loading:false});
     }
  },

  addBlog: async (blogData) => {
    console.log('image blogdate',blogData);
    set({loading:true, error:null});
    try{
       const response = await api.post('/blogs/',blogData);
       set((state) => ({blogs: [...state.blogs, response.data], loading:false}))
       return response.data;
    }catch(err){
       const errorMsg = err.response?.data || err.message;
       set({error: errorMsg, loading: false})
       throw errorMsg;
    }
  },

  showBlogDetail: async (id) =>{
      set({loading:true, error:null});
      try{
        const response = await api.get(`/blogs/${id}/`)
        const blog = response.data.results || response.data
        set({blogDetail: blog, loading:false});
        return response.data;
      }catch(err){
        const errMsg = err.response?.data || err.message
        set({error: errMsg, loading:false})
        throw errMsg;
      }
  },

  updateBlog: async (id, updatedData) => {
    set({loading:true, error:null});
    try{
      const response = await api.put(`/blogs/${id}`, updatedData);
      set((state) => ({
        blogs: state.blogs.map((b) => (b.id === id ? response.data : b)),
        loading: false,
      }))
      return response.data;
    }catch(err){
      const errorMsg = err.response?.data || err.message;
      set({error: errorMsg, loading:false})
      throw errorMsg;
    }
  },

  deleteBlog: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/blogs/${id}/`);
      set((state) => ({
        blogs: state.blogs.filter((b) => b.id !== id),
        loading: false,
      }));
    } catch (err) {
      const errorMsg = err.response?.data || err.message;
      set({ error: errorMsg, loading: false });
      throw errorMsg;
    }
  },

  addCategory: async (name) => {
    set({loading:true, error: null});
     try{
        const response = await api.post('/categories/', {name});
        set((state) => ({
            categories: [...state.categories, response.data],
            loading:false,
        }));
      }catch(err){
        set({error: err.response?.data?.name?.[0] || 'Failed to add category', loading:false});
        throw err;
      }
  },
  deleteCategory:async (id) => {
    set({loading:true, error:null});
    try{
      await api.delete(`/categories/${id}/`)
      set((state)=>({
        categories:state.categories.filter((c) => c.id !== id),
        loading:false
      }))
    }catch(err){
     const errMsg = err.response?.data || err.message;
     set({error:errMsg,loading:false})
     throw errMsg;
    }
  },

  // === INITIAL LOAD ===
  init: async () => {
    await get().fetchCategories();
    await get().fetchBlogs();
  },

  // Utility
  getFilteredBlogs: () => {
    const { blogs, selectedCategory } = get();
    if (!selectedCategory) return blogs;
    return blogs.filter((blog) => blog.category?.name === selectedCategory);
  },

}));