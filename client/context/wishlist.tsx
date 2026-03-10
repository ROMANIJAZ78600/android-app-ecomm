import { dummyWishlist } from "@/assets/assets";
import { Product, WishlistContextType } from "@/constants/types";
import React, { createContext, use, useEffect } from "react";




const WishslistContext = createContext<WishlistContextType | null>(undefined)

export function WishlistProvider({children} : {children: React.ReactNode}){
    const [wishlistItems, setWishlistItems] = React.useState<Product[]>([]); 
    const [loading, setLoading] = React.useState(false);

    const fetchWishlistItems = async () => {
        setLoading(true);
        // Simulate API call
        setWishlistItems(dummyWishlist);
        setLoading(false);
    }

    const toggleWishlistItem = async (product: Product) => {
      const exists = wishlistItems.find((item) => item._id === product._id);
      setWishlistItems((prevItems) => {
        if (exists) {
          return prevItems.filter((item) => item._id !== product._id);
        } 
          return [...prevItems, product];
        
    }
    );
    }
    const isInWishlistItem =  (productId: string) => {
     return wishlistItems.some((item) => item._id === productId);
    }
    useEffect(()=>{
        fetchWishlistItems();
        
    },[])
    return (
        <WishslistContext.Provider value={{ wishlistItems, isInWishlistItem, toggleWishlistItem, loading }}>
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