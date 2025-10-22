import React from 'react';
import type { Product } from '../types';
import Badge from './Badge';

interface ProductCardProps {
  product: Product;
  onUpvote: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onUpvote }) => {
  const handleUpvoteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onUpvote(product.id);
  };

  return (
    <div className="flex items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-brand-teal transition-all duration-300">
      <a href={`#/product/${product.id}`} className="flex items-center flex-grow space-x-4">
        <img className="w-20 h-20 rounded-lg object-cover flex-shrink-0" src={product.logoUrl} alt={`${product.name} logo`} />
        <div className="flex-grow">
          <h3 className="text-lg text-brand-blue font-bold">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-600">{product.tagline}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.categories.map(category => <Badge key={category}>{category}</Badge>)}
            <div className="flex items-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                <path d="M15 7v2a2 2 0 012 2v5a2 2 0 01-2 2h-1v-2a5 5 0 00-5-5H7V7a3 3 0 013-3h4a1 1 0 011 1z"/>
              </svg>
              {product.reviewCount}
            </div>
          </div>
        </div>
      </a>
      <button 
        onClick={handleUpvoteClick}
        className="ml-4 flex-shrink-0 w-16 h-20 flex flex-col items-center justify-center border-2 border-gray-200 rounded-lg hover:border-brand-accent hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-opacity-50 transition-all text-center"
        aria-label={`Upvote ${product.name}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-blue" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M10 9a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        <span className="font-bold text-lg text-brand-blue mt-1">{product.upvotes}</span>
      </button>
    </div>
  );
};

export default ProductCard;