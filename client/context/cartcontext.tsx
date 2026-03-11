import { dummyCart, dummyWishlist } from "@/assets/assets";
import { Product, WishlistContextType } from "@/constants/types";
import React, { createContext, use, useEffect } from "react";


export type CartItem = {
    id: string;
    productId: string;
    product: Product;
    quantity: number;
    size?: string;
    price: number;
}
type CartContextType = {
    cartItems: CartItem[];
    addToCart: (product: Product, quantity?: number, size?: string) => void;
    removeFromCart: (cartItemId: string, size?:string) => void;
    updateQuantity: (cartItemId: string, size?:string, newQuantity?: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    itemCount: number;
    isloading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({children} : {children: React.ReactNode}){
    
const [isloading, setisloading] = React.useState(false);
const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
const [cartTotal, setCartTotal] = React.useState(0);


const fetchCartItems = async () => {
    setisloading(true);
    // Simulate API call
    const serverCart = dummyCart;
    const mappedItems: CartItem[] = serverCart.items.map((item: any) => ({
        id: item._id,
        productId: item.product._id,
        product: item.product,
        quantity: item.quantity,
        size: item?.size || 'M', // Default size if not provided
        price: item?.price,
    }));
    setCartItems(mappedItems);
    setCartTotal(mappedItems.reduce((total, item) => total + item.price * item.quantity, 0));
    setisloading(false);
}

const addtoCart = async (product: Product, quantity: number = 1, size: string = 'M') => { 
    // Simulate API call to add item to cart
}
const removeFromCart = async (cartItemId: string, size?:string) => {
    // Simulate API call to remove item from cart
}
const updateQuantity = async (cartItemId: string, size?:string, newQuantity: number = 1) => {
    // Simulate API call to update item quantity in cart
}
const clearCart = async () => {
}

const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

   
useEffect(()=>{
    fetchCartItems();
},[])

    return (
        <CartContext.Provider value={{ cartItems, addToCart: addtoCart, removeFromCart, updateQuantity, clearCart, getTotalPrice: () => cartTotal, itemCount, isloading }}>
            {children}
        </CartContext.Provider>
    );
}


export function useCart(){ 
    const context = React.useContext(CartContext);
    if(context === undefined){
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}