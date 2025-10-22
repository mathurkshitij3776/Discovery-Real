import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ProductDetailPage from './components/ProductDetailPage';
import ProductsPage from './components/ProductsPage';
import SubmitProductPage from './components/SubmitProductPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import { PRODUCTS } from './constants';
import type { Product, User } from './types';

const App: React.FC = () => {
  const [hash, setHash] = useState(window.location.hash || '#/');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

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

  const handleUpvote = (productId: string) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, upvotes: p.upvotes + 1 } : p
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
      content = <ProductDetailPage product={product} />;
    } else {
      content = <HomePage products={products} onUpvote={handleUpvote} />;
    }
  } else if (path === '/products') {
    // FIX: Pass the `handleUpvote` function to `ProductsPage` to enable upvoting.
    content = <ProductsPage products={products} onUpvote={handleUpvote} />;
  } else if (path === '/submit-product') {
    content = <SubmitProductPage />;
  } else if (path === '/login') {
    content = <LoginPage onLogin={handleLogin} />;
  } else if (path === '/signup') {
    content = <SignupPage onSignup={handleLogin} />;
  }
  else {
    content = <HomePage products={products} onUpvote={handleUpvote} />;
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