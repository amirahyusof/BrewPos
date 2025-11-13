export type Product = {
id: string;
name: string;
price: number;
imageUrl?: string;
category: string;
};


export type ProductCardProps = {
product: Product;
addToCart: (product: Product) => void;
};