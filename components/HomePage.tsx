import React from 'react';
import type { Product } from '../types';
import ProductCard from './ProductCard';

interface HomePageProps {
  products: Product[];
  onUpvote: (productId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ products, onUpvote }) => {
  const sortedProducts = [...products].sort((a, b) => b.upvotes - a.upvotes);

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-brand-blue">Trending Today</h1>
        <p className="mt-2 text-lg text-gray-600">Discover the best new software, upvoted by the community.</p>
      </section>

      <section>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} onUpvote={onUpvote} />
            ))}
          </div>
        </div>
      </section>
      
      <section>
          <div className="bg-brand-teal rounded-xl p-8 text-center flex flex-col items-center shadow-lg">
              <h2 className="text-3xl font-bold text-white">Want to launch your product?</h2>
              <p className="mt-2 text-lg text-gray-100 max-w-2xl">Get your software in front of thousands of creators, builders, and early adopters looking for the next great tool.</p>
              <a href="#/submit-product" className="mt-6 inline-block bg-brand-accent text-brand-blue font-bold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition-transform transform hover:scale-105">
                  Launch Here
              </a>
          </div>
      </section>
    </div>
  );
};

export default HomePage;