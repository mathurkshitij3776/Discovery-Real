
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-blue text-white">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Realpick</h3>
            <p className="text-sm text-gray-300 mt-2">Authentic software discovery for builders, by builders.</p>
          </div>
          <div className="w-full md:w-auto flex space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Realpick. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
