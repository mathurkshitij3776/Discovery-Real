import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ProductDetailPage from './components/ProductDetailPage';
import ProductsPage from './components/ProductsPage';
import SubmitProductPage from './components/SubmitProductPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import AdminPage from './components/AdminPage';
import ProfilePage from './components/ProfilePage';
import BuyerDashboardPage from './components/BuyerDashboardPage';
import { PRODUCTS, SUBSCRIPTIONS } from './constants';
import type { Product, User, Review, Subscription } from './types';

// Helper to generate a URL-friendly slug
const slugify = (text: string) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');


const App: React.FC = () => {
  const [hash, setHash] = useState(window.location.hash || '#/');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(SUBSCRIPTIONS);

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    window.location.hash = '#/';
  };

  const handleLogout = () => {
    setCurrentUser(null);
    window.location.hash = '#/';
  };
  
  const handleProfileUpdate = (updatedData: User) => {
    setCurrentUser(updatedData);
  };

  const handleUpvote = (productId: string) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, upvotes: p.upvotes + 1 } : p
      )
    );
  };

  const handleReviewSubmit = (productId: string, reviewData: { rating: number; title: string; comment: string; }) => {
    if (!currentUser) return;

    setProducts(prevProducts => 
      prevProducts.map(p => {
        if (p.id === productId) {
          const newReview: Review = {
            id: Date.now(),
            author: currentUser.name,
            avatarUrl: `https://i.pravatar.cc/48?u=${currentUser.email}`, // Use a consistent avatar for the user
            rating: reviewData.rating,
            title: reviewData.title,
            comment: reviewData.comment,
            date: 'Just now',
            isVerified: false, 
          };

          const updatedReviews = [newReview, ...p.reviews];
          const newReviewCount = updatedReviews.length;
          const totalRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
          const newAverageRating = totalRating / newReviewCount;

          return {
            ...p,
            reviews: updatedReviews,
            reviewCount: newReviewCount,
            rating: newAverageRating,
          };
        }
        return p;
      })
    );
  };

  const handleProductSubmit = (productData: Omit<Product, 'id' | 'reviews' | 'rating' | 'reviewCount' | 'upvotes' | 'status' | 'vendorId'>) => {
    if (!currentUser) return;
    
    const newProduct: Product = {
      ...productData,
      id: slugify(productData.name),
      reviews: [],
      rating: 0,
      reviewCount: 0,
      upvotes: 0,
      status: 'pending',
      vendorId: currentUser.email,
      gallery: productData.gallery || [],
    };

    setProducts(prevProducts => [newProduct, ...prevProducts]);
    alert('Thank you for your submission! Our team will review your product shortly.');
    window.location.hash = '#/';
  };

  const handleApproveProduct = (productId: string) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, status: 'approved' } : p
      )
    );
  };

  const handleRejectProduct = (productId: string) => {
     setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, status: 'rejected' } : p
      )
    );
  };


  const path = hash.substring(1); // remove leading #

  const allCategories = [...new Set(products.flatMap(p => p.categories))].sort();

  let content;

  if (path.startsWith('/product/')) {
    const productId = path.split('/')[2];
    const product = products.find(p => p.id === productId);
    if (product) {
      content = <ProductDetailPage product={product} currentUser={currentUser} onReviewSubmit={handleReviewSubmit} />;
    } else {
      content = <HomePage products={products} onUpvote={handleUpvote} />;
    }
  } else if (path === '/products') {
    content = <ProductsPage products={products.filter(p => p.status === 'approved')} onUpvote={handleUpvote} />;
  } else if (path === '/submit-product') {
    if (currentUser) {
      content = <SubmitProductPage onSubmit={handleProductSubmit} />;
    } else {
      window.location.hash = '#/login';
      content = <LoginPage onLogin={handleLogin} />;
    }
  } else if (path === '/my-submissions') {
    if (currentUser) {
      content = <ProfilePage user={currentUser} products={products} onUpdateProfile={handleProfileUpdate} />;
    } else {
      window.location.hash = '#/login';
      content = <LoginPage onLogin={handleLogin} />;
    }
  } else if (path === '/dashboard') {
      if (currentUser && !currentUser.isAdmin) {
        content = <BuyerDashboardPage user={currentUser} products={products} subscriptions={subscriptions} />;
      } else if (currentUser?.isAdmin) {
        // Admins don't have a buyer dashboard, send them home.
        window.location.hash = '#/';
        content = <HomePage products={products} onUpvote={handleUpvote} />;
      }
      else {
        window.location.hash = '#/login';
        content = <LoginPage onLogin={handleLogin} />;
      }
  } else if (path === '/admin') {
      if (currentUser?.isAdmin) {
          const pendingProducts = products.filter(p => p.status === 'pending');
          content = <AdminPage 
            pendingProducts={pendingProducts} 
            onApprove={handleApproveProduct}
            onReject={handleRejectProduct}
          />;
      } else {
          window.location.hash = '#/';
          content = <HomePage products={products} onUpvote={handleUpvote} />;
      }
  } else if (path === '/login') {
    content = <LoginPage onLogin={handleLogin} />;
  } else if (path === '/signup') {
    content = <SignupPage onSignup={handleLogin} />;
  }
  else {
    content = <HomePage products={products.filter(p => p.status === 'approved')} onUpvote={handleUpvote} />;
  }


  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header 
        categories={allCategories} 
        user={currentUser}
        onLogout={handleLogout}
      />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {content}
      </main>
      <Footer />
    </div>
  );
};

export default App;