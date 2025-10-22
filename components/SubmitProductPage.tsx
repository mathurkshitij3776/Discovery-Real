import React, { useState } from 'react';
import type { Product } from '../types';

interface SubmitProductPageProps {
    onSubmit: (productData: Omit<Product, 'id' | 'reviews' | 'rating' | 'reviewCount' | 'upvotes' | 'status' | 'vendorId'>) => void;
}

const InputField: React.FC<{ id: string, label: string, type?: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, required?: boolean, placeholder?: string }> = 
({ id, label, type = 'text', value, onChange, required = false, placeholder = '' }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1">
            <input
                type={type}
                name={id}
                id={id}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="shadow-sm focus:ring-brand-teal focus:border-brand-teal block w-full sm:text-sm border-gray-300 rounded-md"
            />
        </div>
    </div>
);

const TextareaField: React.FC<{ id: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, rows?: number, required?: boolean, placeholder?: string }> = 
({ id, label, value, onChange, rows = 4, required = false, placeholder = '' }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1">
            <textarea
                id={id}
                name={id}
                rows={rows}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="shadow-sm focus:ring-brand-teal focus:border-brand-teal block w-full sm:text-sm border-gray-300 rounded-md"
            ></textarea>
        </div>
    </div>
);


const SubmitProductPage: React.FC<SubmitProductPageProps> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [tagline, setTagline] = useState('');
    const [description, setDescription] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [categories, setCategories] = useState('');
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [galleryUrls, setGalleryUrls] = useState('');
    
    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLogoFile(file);
            const previewUrl = URL.createObjectURL(file);
            setLogoPreview(previewUrl);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!logoFile) {
            alert('Please upload a product logo.');
            return;
        }

        const productData = {
            name,
            tagline,
            description,
            websiteUrl,
            logoUrl: logoPreview!, // In a real app, this would be the URL from storage
            categories: categories.split(',').map(c => c.trim()),
            gallery: galleryUrls.split(',').map(url => url.trim()).filter(url => url),
        };

        onSubmit(productData);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-brand-blue">Launch Your Product</h1>
                <p className="mt-2 text-lg text-gray-600">Join our curated platform and get discovered by thousands of software enthusiasts.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
                <InputField id="name" label="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <InputField id="tagline" label="Tagline / Short Description" value={tagline} onChange={(e) => setTagline(e.target.value)} required />
                <TextareaField id="description" label="Full Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={6} required />
                <InputField id="websiteUrl" label="Website URL" type="url" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} required />
                <InputField id="categories" label="Categories" value={categories} onChange={(e) => setCategories(e.target.value)} required placeholder="e.g., Productivity, Dev Tools" />
                
                <div>
                    <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700">Product Logo</label>
                    <div className="mt-1 flex items-center space-x-4">
                        {logoPreview && <img src={logoPreview} alt="Logo preview" className="w-20 h-20 rounded-lg object-cover" />}
                        <input
                            type="file"
                            name="logoUrl"
                            id="logoUrl"
                            accept="image/png, image/jpeg, image/gif"
                            onChange={handleLogoChange}
                            required
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-teal file:bg-opacity-10 file:text-brand-teal hover:file:bg-opacity-20"
                        />
                    </div>
                </div>

                <InputField id="galleryUrls" label="Gallery Image URLs (comma-separated)" type="text" value={galleryUrls} onChange={(e) => setGalleryUrls(e.target.value)} placeholder="https://.../image1.png, https://.../image2.png" />

                <div className="pt-4">
                     <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-brand-blue bg-brand-accent hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent transition-all">
                        Submit for Review
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SubmitProductPage;