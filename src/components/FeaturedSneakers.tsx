import React from 'react';
import { Star } from 'lucide-react';
import { Sneaker } from '../types';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { slugify } from '../utils/slugify';

const featuredSneakers: Sneaker[] = [
  {
    id: '1',
    name: 'Air Max Pulse',
    brand: 'Nike',
    price: 159.99,
    sizes: [7, 8, 9, 10, 11],
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&q=75&w=600'],
    description: 'The latest in comfort and style',
    rating: 4.5,
    reviews: 128,
    colors: [{ name: 'Black', hex: '#000000' }],
    stockStatus: 'In Stock'
  },
  // ... other sneakers
];

export default function FeaturedSneakers() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (sneaker: Sneaker) => {
    const defaultSize = sneaker.sizes[0];
    addToCart(sneaker, defaultSize);
  };

  const handleProductClick = (sneaker: Sneaker) => {
    navigate(`/product/${slugify(sneaker.brand)}/${slugify(sneaker.name)}`);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Sneakers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredSneakers.map((sneaker) => (
            <div key={sneaker.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div 
                onClick={() => handleProductClick(sneaker)}
                className="aspect-w-16 aspect-h-9 bg-gray-200 cursor-pointer"
              >
                <img
                  src={sneaker.images[0]}
                  alt={`${sneaker.brand} ${sneaker.name} - ${sneaker.description}`}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">{sneaker.brand}</p>
                    <h3 
                      className="text-xl font-semibold text-gray-900 mt-1 cursor-pointer hover:text-purple-600"
                      onClick={() => handleProductClick(sneaker)}
                    >
                      {sneaker.name}
                    </h3>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{sneaker.rating}</span>
                  </div>
                </div>
                <p className="mt-2 text-gray-600">{sneaker.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">${sneaker.price}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(sneaker);
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}