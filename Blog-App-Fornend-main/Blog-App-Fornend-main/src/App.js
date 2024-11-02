import './App.css';
import ArticleDetailPage from './pages/articleDetail/ArticleDetailPage';
import HomePage from './pages/Home/HomePage';
import {Route , Routes} from "react-router"
import RegisterPage from './pages/register/RegisterPage';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/login/LoginPage';
import ProfilePage from './pages/profile/ProfilePage';
import AdminLayout from './pages/admin/AdminLayout';
import Admin from './pages/admin/screens/Admin';
import ManagePost from './pages/admin/screens/posts/ManagePost';
import EditPost from './pages/admin/screens/posts/EditPost';
import Comments from './pages/admin/screens/comments/Comments';
import Categories from './pages/admin/screens/categories/Categories';
import EditCategories from './pages/admin/screens/categories/EditCategories';
import Users from './pages/admin/screens/users/Users';
import BlogPage from './pages/blog/BlogPage';
import EditNews from './pages/admin/screens/news/EditNews';
import ManageNews from './pages/admin/screens/news/ManageNews';
import NewsDetailPage from './pages/newsDetail/NewsDetailPage';
import ManageUserArticle from './pages/admin/screens/userArticel/ManageUserArticle';
import EditUserArticle from './pages/admin/screens/userArticel/EditUserArticle';
function App() {
  return ( 
    <div className="App font-opensans" >
      <Routes>
        <Route  index path="/" element={<HomePage />} />
        <Route   path="/blog/:slug" element={<ArticleDetailPage />} />
        <Route   path="/blog" element={<BlogPage />} />

        <Route   path="/register" element={<RegisterPage />} />
        <Route   path="/login" element={<LoginPage />} />
        <Route   path="/profile" element={<ProfilePage />} />

        <Route   path="/admin" element={<AdminLayout />} >

          <Route  index  element={<Admin />} />
          <Route  path = "comments"  element={<Comments />} />
          <Route  path = "posts/manage"  element={<ManagePost />} />
          <Route  path = "posts/manage/edit/:slug"  element={<EditPost />} />
          <Route  path = "/admin/categories/manage"  element={<Categories />} />
          <Route  path = "categories/manage/edit/:slug"  element={<EditCategories />} />

          <Route  path = "users/manage"  element={<Users />} />

          <Route  path = "news/manage"  element={<ManageNews />} />
          <Route  path = "news/manage/edit/:slug"  element={<EditNews />} />

    
          <Route  path = "userArticle/manage"  element={<ManageUserArticle />} />
          <Route  path = "userArticle/manage/edit/:slug"  element={<EditUserArticle />} />

    
          
        </Route>
        <Route   path="/news/:slug" element={<NewsDetailPage />} />
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;