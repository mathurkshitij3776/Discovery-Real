import React from 'react';
import type { Product } from '../types';
import ProductCard from './ProductCard';
import { TODAY_LAUNCH_ID } from '../constants';
import StarRating from './StarRating';
import Badge from './Badge';

interface HomePageProps {
  products: Product[];
  onUpvote: (productId: string) => void;
}

const DailyLaunchCard: React.FC<{ product: Product, onUpvote: (productId: string) => void }> = ({ product, onUpvote }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-2">
                    <img src={product.gallery[0] || product.logoUrl} alt={`${product.name} gallery`} className="w-full h-64 md:h-full object-cover" />
                </div>
                <div className="md:col-span-3 p-6 md:p-8 flex flex-col">
                    <div className="flex-grow">
                        <div className="flex items-start space-x-4">
                            <img src={product.logoUrl} alt={`${product.name} logo`} className="w-16 h-16 rounded-lg flex-shrink-0" />
                            <div>
                                <a href={`#/product/${product.id}`} className="block">
                                    <h2 className="text-3xl font-bold text-brand-blue hover:text-brand-teal transition-colors flex items-center">
                                        {product.name}
                                        {product.madeIn === 'India' && <span className="ml-2" aria-label="Made in India">🇮🇳</span>}
                                    </h2>
                                </a>
                                <p className="mt-1 text-lg text-gray-600">{product.tagline}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {product.categories.map(category => <Badge key={category}>{category}</Badge>)}
                        </div>
                        <p className="mt-4 text-gray-700 leading-relaxed line-clamp-3">{product.description}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                         <div className="flex items-center">
                            <StarRating rating={product.rating} />
                            <span className="ml-2 text-md text-gray-600 font-medium">{product.rating.toFixed(1)}</span>
                            <span className="ml-2 text-md text-gray-500">({product.reviewCount} reviews)</span>
                        </div>
                        <a href={`#/product/${product.id}`} className="bg-brand-accent text-brand-blue font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-all text-center">
                            View Details
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

const HomePage: React.FC<HomePageProps> = ({ products, onUpvote }) => {
  const approvedProducts = products.filter(p => p.status === 'approved');
  
  const dailyLaunchProduct = approvedProducts.find(p => p.id === TODAY_LAUNCH_ID);
  const otherProducts = approvedProducts
    .filter(p => p.id !== TODAY_LAUNCH_ID)
    .sort((a, b) => b.upvotes - a.upvotes);

  return (
    <div className="space-y-16">
      <section className="text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-brand-blue">Today's Launch</h1>
        <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">Discover the best new software, hand-picked and launched daily.</p>
      </section>

      {dailyLaunchProduct && (
          <section>
              <DailyLaunchCard product={dailyLaunchProduct} onUpvote={onUpvote} />
          </section>
      )}

      <section>
        <h2 className="text-3xl font-bold text-brand-blue mb-6">More Discoveries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProducts.map(product => (
              <ProductCard key={product.id} product={product} onUpvote={onUpvote} />
            ))}
        </div>
      </section>
      
      <section>
          <div className="bg-brand-teal rounded-xl p-8 text-center flex flex-col items-center shadow-lg">
              <h2 className="text-3xl font-bold text-white">Want to launch your product?</h2>
              <p className="mt-2 text-lg text-gray-100 max-w-2xl">Get your software in front of thousands of creators, builders, and early adopters looking for the next great tool.</p>
              <a href="#/submit-product" className="mt-6 inline-block bg-brand-accent text-brand-blue font-bold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition-transform transform hover:scale-105">
                  Submit for Launch
              </a>
          </div>
      </section>
    </div>
  );
};

export default HomePage;