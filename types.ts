// FIX: Removed a self-import of the 'User' type that was causing a name conflict.

export interface User {
  name: string;
  email: string;
}

export interface Review {
  id: number;
  author: string;
  avatarUrl: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  isVerified: boolean;
}

export interface Deal {
  title:string;
  description: string;
  discount: string;
  code: string;
  expiry: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logoUrl: string;
  websiteUrl: string;
  categories: string[];
  reviews: Review[];
  rating: number;
  reviewCount: number;
  upvotes: number;
  deal?: Deal;
  gallery: string[];
}