
export interface Product {
    id: string;
    name: string;
    description: string;
    details: string[];
    price: number;
    categories: string[];
    image_paths: string[];
    etsy_link: string;
    is_published: boolean;
    is_archieved: boolean;
    is_featured: boolean;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    icon: string;
}
