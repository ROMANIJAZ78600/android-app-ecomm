import { dummyWishlist } from "@/assets/assets";
import { Product, WishlistContextType } from "@/constants/types";
import React, { createContext, use, useEffect } from "react";




const WishslistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({children} : {children: React.ReactNode}){
    const [wishlist, setWishlist] = React.useState<Product[]>([]); 
    const [loading, setLoading] = React.useState(false);

    const fetchWishlistItems = async () => {
        setLoading(true);
        // Simulate API call
        setWishlist(dummyWishlist);
        setLoading(false);
    }

    const toggleWishlist = async (product: Product) => {
        setWishlist((prevItems) => {
            const exists = wishlist.find((item) => item._id === product._id);
        if (exists) {
          return prevItems.filter((item) => item._id !== product._id);
        } 
          return [...prevItems, product];
        
    }
    );
    }
    const isInWishlist =  (productId: string) => {
     return wishlist.some((item) => item._id === productId);
    }
    useEffect(()=>{
        fetchWishlistItems();
        
    },[])
    return (
        <WishslistContext.Provider value={{ wishlist, isInWishlist, toggleWishlist, loading }}>
            {children}
        </WishslistContext.Provider>
    );
}


export function useWishlist(){ 
    const context = React.useContext(WishslistContext);
    if(context === undefined){
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}