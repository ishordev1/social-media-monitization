import React from 'react';
import { useNavigate } from 'react-router-dom';

const BrandCard = ({ brand }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/brands/${brand.id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl cursor-pointer"
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={brand.imageUrl || 'https://via.placeholder.com/400x300'}
                    alt={brand.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                    <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {brand.category || 'Fashion'}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center mb-3">
                    <img
                        src={brand.logoUrl || 'https://via.placeholder.com/50'}
                        alt={`${brand.name} logo`}
                        className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-white shadow-sm"
                    />
                    <h3 className="text-xl font-bold text-gray-800">{brand.name}</h3>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {brand.description || 'No description available'}
                </p>

                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-xs text-gray-500">Campaign Budget</span>
                        <p className="font-semibold text-indigo-700">
                            ${brand.budget?.toLocaleString() || '5,000'}
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="text-xs text-gray-500">Cashback Rate</span>
                        <p className="font-semibold text-green-600">
                            {brand.cashbackRate || '15'}%
                        </p>
                    </div>
                </div>
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                    <i className="fas fa-users mr-1"></i>
                    {brand.influencersCount || '120'} influencers
                </span>
                <button
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        // Handle quick apply logic here
                    }}
                >
                    Quick Apply <i className="fas fa-arrow-right ml-1"></i>
                </button>
            </div>
        </div>
    );
};

export default BrandCard;