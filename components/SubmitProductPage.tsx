import React, { useState } from 'react';

const InputField: React.FC<{ id: string, label: string, type?: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, required?: boolean }> = 
({ id, label, type = 'text', value, onChange, required = false }) => (
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
                className="shadow-sm focus:ring-brand-teal focus:border-brand-teal block w-full sm:text-sm border-gray-300 rounded-md"
            />
        </div>
    </div>
);

const TextareaField: React.FC<{ id: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, rows?: number, required?: boolean }> = 
({ id, label, value, onChange, rows = 4, required = false }) => (
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
                className="shadow-sm focus:ring-brand-teal focus:border-brand-teal block w-full sm:text-sm border-gray-300 rounded-md"
            ></textarea>
        </div>
    </div>
);


const SubmitProductPage: React.FC = () => {
    const [formData, setFormData] = useState({
        productName: '',
        tagline: '',
        description: '',
        websiteUrl: '',
        categories: '',
        logoUrl: '',
        galleryUrls: '',
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Product Submission:', formData);
        alert('Thank you for your submission! Our team will review your product shortly.');
        setFormData({
            productName: '',
            tagline: '',
            description: '',
            websiteUrl: '',
            categories: '',
            logoUrl: '',
            galleryUrls: '',
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-brand-blue">Launch Your Product</h1>
                <p className="mt-2 text-lg text-gray-600">Join our curated platform and get discovered by thousands of software enthusiasts.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
                <InputField id="productName" label="Product Name" value={formData.productName} onChange={handleChange} required />
                <InputField id="tagline" label="Tagline / Short Description" value={formData.tagline} onChange={handleChange} required />
                <TextareaField id="description" label="Full Description" value={formData.description} onChange={handleChange} rows={6} required />
                <InputField id="websiteUrl" label="Website URL" type="url" value={formData.websiteUrl} onChange={handleChange} required />
                <InputField id="categories" label="Categories (comma-separated)" value={formData.categories} onChange={handleChange} required />
                <InputField id="logoUrl" label="Logo Image URL" type="url" value={formData.logoUrl} onChange={handleChange} required />
                <InputField id="galleryUrls" label="Gallery Image URLs (comma-separated)" type="url" value={formData.galleryUrls} onChange={handleChange} />

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
