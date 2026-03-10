import { View, Text, Touchable, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { ProductCardProps } from '@/constants/types'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants'
import { useWishlist } from '@/context/wishlist'

const ProductCard = ({product} : ProductCardProps) => {

    const {toggleWishlistItem, isInWishlistItem} = useWishlist();

    const isLiked = isInWishlistItem(product._id);
  return (
   <Link href={`/product/${product._id}`} asChild>
<TouchableOpacity className='w-[48%] mb-4 bg-white rounded-lg overflow-hidden'>
    <View className='relative h-56 w-full bg-gray-100'>
        <Image source={{uri: product?.images?.[0] ?? ''}} className='w-full h-full' resizeMode='cover' />

        {/* Favourite Icon */}
        <TouchableOpacity className='absolute top-2 right-2 z-10 p-2 bg-white rounded-full'
        onPress={(e)=>{e.stopPropagation(); toggleWishlistItem(product)}}
        >

        <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={20} color={isLiked ? COLORS.accent : COLORS.primary} />

        </TouchableOpacity>

        {/* isFeatured  */}

        {product.isFeatured && (
            <View className='absolute top-2 left-2 z-10 px-2 py-1 bg-primary rounded'>
                <Text className='text-white text-xs font-semibold'>Featured</Text>
            </View>
        )}
    </View>

    {/* Product Info */}
    <View className='p-3'>
             <View className='flex-row items-center mb-1'>
                <Ionicons name='star' size={14} color='#ffd700' />
                <Text className='text-secondary text-xs ml-1'>4.6</Text>
             </View>
             <Text className='text-gray-800 font-semibold mb-1' numberOfLines={1}>{product.name}</Text>
             <View className='flex-row items-center'>

             <Text className='text-primary font-bold text-lg'>${product.price.toFixed(2)}</Text>
             </View>
    
        </View>


        {/* news Letter CTa */}
        
</TouchableOpacity>
   </Link>
  )
}

export default ProductCard