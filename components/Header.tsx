import React, { useState, useEffect } from 'react';
import type { User } from '../types';

interface HeaderProps {
    categories: string[];
    user: User | null;
    onLogout: () => void;
}

const Logo: React.FC = () => (
  <div className="flex items-center space-x-2">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-accent">
      <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 7L12 12L22 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <span className="font-bold text-2xl text-brand-blue">Realpick</span>
  </div>
);

const Header: React.FC<HeaderProps> = ({ categories, user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsSubmenuOpen, setIsProductsSubmenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);


  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setIsProductsSubmenuOpen(false);
  }

  const handleNavClick = (hash: string) => {
    window.location.hash = hash;
    closeMenu();
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <a href="#/" aria-label="Back to homepage" className="flex-shrink-0" onClick={() => closeMenu()}>
              <Logo />
            </a>
            <nav className="hidden md:flex items-center space-x-6">
              <div className="relative group">
                <a href="#/products" className="text-gray-600 hover:text-brand-blue font-semibold transition-colors flex items-center">
                  Products
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
                <div className="absolute top-full left-0 pt-2 w-56 opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible z-30">
                  <div className="bg-white rounded-md shadow-lg">
                    <div className="py-2">
                      <a href="#/products" className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-brand-blue">
                        All Products
                      </a>
                      <div className="border-t my-1 mx-2 border-gray-100"></div>
                      {categories.map(category => (
                        <a key={category} href={`#/products#${category.toLowerCase().replace(/\s+/g, '-')}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brand-blue">
                          {category}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:flex md:items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm text-gray-600">Welcome, {user.name}!</span>
                  <button onClick={onLogout} className="text-sm text-gray-500 hover:text-brand-blue font-semibold">Logout</button>
                  <a href="#/submit-product" className="bg-brand-accent text-brand-blue font-bold py-2 px-5 rounded-lg hover:opacity-90 transition-all text-sm">
                    Submit Product
                  </a>
                </>
              ) : (
                <>
                  <a href="#/login" className="text-gray-600 hover:text-brand-blue font-semibold transition-colors text-sm">Log In</a>
                  <a href="#/signup" className="bg-brand-accent text-brand-blue font-bold py-2 px-5 rounded-lg hover:opacity-90 transition-all text-sm">
                    Sign Up
                  </a>
                </>
              )}
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-brand-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-accent" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeMenu}></div>
          
          {/* Menu Panel */}
          <div className={`fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                  <a href="#/" onClick={() => handleNavClick('/')}><Logo /></a>
                  <button onClick={closeMenu} className="p-2">
                      <svg className="h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                  </button>
              </div>

              <div className="p-4 space-y-4">
                 {user ? (
                    <>
                      <div className="text-center mb-2">
                          <span className="font-medium text-brand-blue">Welcome, {user.name}!</span>
                      </div>
                      <a href="#/submit-product" onClick={() => handleNavClick('/submit-product')} className="w-full text-center block bg-brand-accent text-brand-blue font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-all">
                          Submit Product
                      </a>
                       <button onClick={() => { onLogout(); closeMenu(); }} className="w-full text-center block bg-gray-100 text-gray-600 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition-all">
                          Logout
                      </button>
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <a href="#/login" onClick={() => handleNavClick('/login')} className="w-full text-center block bg-gray-100 text-gray-600 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition-all">
                          Log In
                      </a>
                      <a href="#/signup" onClick={() => handleNavClick('/signup')} className="w-full text-center block bg-brand-accent text-brand-blue font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-all">
                          Sign Up
                      </a>
                    </div>
                  )}
              </div>

              <div className="p-4 border-t">
                  <div className="relative">
                      <input type="search" placeholder="Search..." className="w-full pl-10 pr-4 py-2 border rounded-lg" />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                      </div>
                  </div>
              </div>

              <nav className="flex-grow p-4 overflow-y-auto">
                  <ul>
                      <li>
                          <button onClick={() => setIsProductsSubmenuOpen(!isProductsSubmenuOpen)} className="w-full flex items-center justify-between text-left py-2 px-2 rounded-lg hover:bg-gray-100 font-semibold text-lg text-brand-blue">
                              Products
                              <svg className={`h-5 w-5 transition-transform ${isProductsSubmenuOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                          </button>
                          {isProductsSubmenuOpen && (
                              <ul className="pl-4 mt-2 space-y-2">
                                  <li><a href="#/products" onClick={() => handleNavClick('/products')} className="block py-1 text-gray-600 hover:text-brand-blue">All Products</a></li>
                                  {categories.map(category => (
                                    <li key={category}><a href={`#/products#${category.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => handleNavClick(`/products#${category.toLowerCase().replace(/\s+/g, '-')}`)} className="block py-1 text-gray-600 hover:text-brand-blue">{category}</a></li>
                                  ))}
                              </ul>
                          )}
                      </li>
                      <li>
                          <a href="#" className="w-full flex items-center justify-between text-left py-2 px-2 rounded-lg hover:bg-gray-100 font-semibold text-lg text-brand-blue">
                            News
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                          </a>
                      </li>
                       <li>
                          <a href="#" className="w-full flex items-center justify-between text-left py-2 px-2 rounded-lg hover:bg-gray-100 font-semibold text-lg text-brand-blue">
                            Forums
                             <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                          </a>
                      </li>
                  </ul>
              </nav>
            </div>
          </div>
      </div>
    </header>
  );
};

export default Header;
