import type { Product, Subscription, Article, ForumCategory } from './types';

export const TODAY_LAUNCH_ID = 'craftnote';

export const PRODUCTS: Product[] = [
  {
    id: 'craftnote',
    name: 'CraftNote',
    tagline: 'The distraction-free, markdown-first notebook for builders.',
    description: 'CraftNote is a beautifully designed, minimalist writing application that focuses on what matters: your content. With full markdown support, a zen-like interface, and powerful organization features, it\'s the perfect tool for developers, writers, and thinkers who want to focus on their craft. Build your knowledge base, document your projects, or just jot down ideas without the clutter of traditional note-taking apps.',
    logoUrl: 'https://picsum.photos/id/1/200/200',
    websiteUrl: '#',
    categories: ['Productivity', 'Dev Tools', 'Writing Tools'],
    rating: 4.9,
    reviewCount: 102,
    upvotes: 256,
    status: 'approved',
    madeIn: 'India',
    deal: {
      title: 'Launch Week Special',
      description: 'Get 50% off your first year subscription, exclusively for Realpick users.',
      discount: '50% OFF',
      code: 'REALPICK50',
      expiry: 'Expires in 7 days',
    },
    gallery: [
      'https://picsum.photos/id/10/1280/720',
      'https://picsum.photos/id/11/1280/720',
      'https://picsum.photos/id/12/1280/720',
    ],
    reviews: [
      {
        id: 1,
        author: 'Sarah J.',
        avatarUrl: 'https://picsum.photos/id/237/48/48',
        rating: 5,
        title: 'Finally, the perfect notes app!',
        comment: 'I\'ve tried them all, and CraftNote is the one I\'m sticking with. The markdown support is flawless and the interface is just so clean. It helps me think better.',
        date: '2 days ago',
        isVerified: true,
      },
      {
        id: 2,
        author: 'Mike R.',
        avatarUrl: 'https://picsum.photos/id/238/48/48',
        rating: 5,
        title: 'A game-changer for my workflow.',
        comment: 'As a developer, I live in markdown. CraftNote makes documenting my projects a joy. The code block formatting is top-notch. Highly recommended.',
        date: '3 days ago',
        isVerified: true,
      },
    ],
  },
  {
    id: 'pixel-perfect',
    name: 'Pixel Perfect',
    tagline: 'Collaborative design feedback directly on your website.',
    description: 'Stop juggling screenshots and endless email chains. Pixel Perfect allows your team and clients to leave visual feedback and comments directly on live websites and web apps. It\'s the fastest way to iterate on design, fix bugs, and get approval, all in one place.',
    logoUrl: 'https://picsum.photos/id/2/200/200',
    websiteUrl: '#',
    categories: ['Design Tools', 'Utilities'],
    rating: 4.7,
    reviewCount: 245,
    upvotes: 189,
    status: 'approved',
    gallery: [
      'https://picsum.photos/id/20/1280/720',
      'https://picsum.photos/id/21/1280/720',
    ],
    reviews: [
      {
        id: 3,
        author: 'Emily C.',
        avatarUrl: 'https://picsum.photos/id/239/48/48',
        rating: 5,
        title: 'Saves our agency hours every week.',
        comment: 'This tool has streamlined our client feedback process completely. What used to take days of back-and-forth now happens in a few hours. A must-have for any web design agency.',
        date: '1 week ago',
        isVerified: true,
      },
    ],
  },
  {
    id: 'querymaster',
    name: 'QueryMaster',
    tagline: 'The ultimate SQL client for modern data teams.',
    description: 'QueryMaster is a powerful and intuitive SQL client designed for speed and collaboration. Featuring an intelligent autocomplete, query history, data visualization tools, and team sharing capabilities, it helps you write better queries, faster.',
    logoUrl: 'https://picsum.photos/id/3/200/200',
    websiteUrl: '#',
    categories: ['Dev Tools', 'Analytics & Data'],
    rating: 4.8,
    reviewCount: 88,
    upvotes: 215,
    status: 'approved',
    madeIn: 'India',
    deal: {
      title: 'Team Bundle',
      description: 'Get 3 seats for the price of 2 for your first year.',
      discount: '3-for-2',
      code: 'TEAMUP',
      expiry: 'Expires in 1 month',
    },
    gallery: [
      'https://picsum.photos/id/30/1280/720',
      'https://picsum.photos/id/31/1280/720',
    ],
    reviews: [
      {
        id: 4,
        author: 'David L.',
        avatarUrl: 'https://picsum.photos/id/240/48/48',
        rating: 5,
        title: 'The best SQL client I\'ve ever used.',
        comment: 'The autocomplete is smarter than any other tool, and the built-in charting saves me so much time. I can\'t imagine working without it now.',
        date: '2 weeks ago',
        isVerified: false,
      },
    ],
  },
  {
    id: 'flowstate',
    name: 'FlowState',
    tagline: 'Automate your workflows with a visual, no-code builder.',
    description: 'Connect your favorite apps and automate repetitive tasks with FlowState. Our intuitive drag-and-drop interface lets you build complex workflows without writing a single line of code. From marketing automation to data entry, reclaim your time and focus on what matters.',
    logoUrl: 'https://picsum.photos/id/4/200/200',
    websiteUrl: '#',
    categories: ['No-Code / Low-Code', 'Productivity', 'Utilities'],
    rating: 4.6,
    reviewCount: 310,
    upvotes: 142,
    status: 'approved',
    gallery: [
      'https://picsum.photos/id/40/1280/720',
      'https://picsum.photos/id/41/1280/720',
    ],
    reviews: [
      {
        id: 5,
        author: 'Jessica P.',
        avatarUrl: 'https://picsum.photos/id/241/48/48',
        rating: 4,
        title: 'Very powerful, with a slight learning curve.',
        comment: 'It can do almost anything you can think of! It took me a little while to get the hang of the more advanced features, but their documentation is excellent. Has saved me countless hours.',
        date: '3 weeks ago',
        isVerified: true,
      },
    ],
  },
];

// Mock data for user subscriptions
export const SUBSCRIPTIONS: Subscription[] = [
  {
    subscriptionId: 'sub_1',
    userId: 'jane@doe.com',
    productId: 'craftnote',
    purchaseDate: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
    expiryDate: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString(),
  },
  {
    subscriptionId: 'sub_2',
    userId: 'jane@doe.com',
    productId: 'pixel-perfect',
    purchaseDate: new Date(new Date().setDate(new Date().getDate() - 90)).toISOString(),
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
  },
  {
    subscriptionId: 'sub_3',
    userId: 'jane@doe.com',
    productId: 'flowstate',
    purchaseDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
    expiryDate: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
  }
];


export const ARTICLES: Article[] = [
  {
    id: 1,
    title: 'The Rise of the Indie Developer: How Small Teams are Building Big Things',
    excerpt: 'Explore the trend of solo developers and small teams creating successful software products that compete with industry giants. We look at the tools, strategies, and mindset that make it possible.',
    author: 'Alex Chen',
    date: '3 days ago',
    imageUrl: 'https://picsum.photos/id/101/800/600',
    category: 'Industry Trends',
  },
  {
    id: 2,
    title: '5 Marketing Tips for Your First SaaS Launch',
    excerpt: 'Launching your product is just the first step. Learn how to get your first 100 users with these actionable marketing strategies tailored for bootstrapped founders.',
    author: 'Brenda Smith',
    date: '1 week ago',
    imageUrl: 'https://picsum.photos/id/103/800/600',
    category: 'Marketing',
  },
  {
    id: 3,
    title: 'Designing for Focus: The minimalist approach to UI/UX',
    excerpt: 'In a world of digital noise, users crave simplicity. This article dives into the principles of minimalist design and how to apply them to create intuitive, user-friendly software.',
    author: 'Carlos Gomez',
    date: '2 weeks ago',
    imageUrl: 'https://picsum.photos/id/105/800/600',
    category: 'Design',
  },
];

export const FORUM_CATEGORIES: ForumCategory[] = [
  {
    id: 1,
    name: 'General Discussion',
    description: 'Talk about anything and everything related to indie software and startups.',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V10a2 2 0 012-2h8z" />`,
    topics: [
      { id: 1, title: 'What are you working on this week?', author: 'Admin', posts: 124, lastPost: '2 min ago' },
      { id: 2, title: 'Favorite productivity hacks?', author: 'Sarah J.', posts: 32, lastPost: '1 hour ago' },
    ]
  },
  {
    id: 2,
    name: 'Product Feedback',
    description: 'Get feedback on your product, landing page, or idea.',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-3-5v5m-3-8v8m-3-5v5m-3-8v8M4 4h16" />`,
    topics: [
      { id: 3, title: 'Feedback on my new landing page for "CraftNote"', author: 'Mike R.', posts: 15, lastPost: '5 hours ago' },
      { id: 4, title: 'Is this pricing model fair?', author: 'Jessica P.', posts: 45, lastPost: '1 day ago' },
    ]
  },
  {
    id: 3,
    name: 'Marketing & Growth',
    description: 'Discuss strategies for growing your user base and revenue.',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />`,
    topics: [
      { id: 5, title: 'How I got my first 100 customers', author: 'David L.', posts: 78, lastPost: '2 days ago' },
      { id: 6, title: 'SEO tips for SaaS websites', author: 'Emily C.', posts: 22, lastPost: '3 days ago' },
    ]
  }
];
