import { View, Text, ScrollView, Image, Dimensions, Touchable, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { BANNERS, dummyProducts } from '@/assets/assets'
import { useRouter } from 'expo-router'
import { CATEGORIES } from '@/constants'
import CategoryItem from '@/components/CategoryItem'
import ProductCard from '@/components/ProductCard'


const {width} = Dimensions.get('window');

const Home = () => {
  const router = useRouter();
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading , setLoading] = useState(true);

  const categrories = [{id: 'all', name: 'All', icon: 'grid'},...CATEGORIES];

  const fetchProducts = async () => {
    setProducts(dummyProducts);
    setLoading(false)
  }

  useEffect(()=>{
    fetchProducts();
  },[])

  return (
    <SafeAreaView className='flex-1' edges={['top']}>
      <Header title='Forever' showMenu showCart showLogo />

      <ScrollView className='flex-1 px-4' showsVerticalScrollIndicator={false}>
        {/* Banner Slide */}
        <View className='mb-6'>
<ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled className='w-full h-48 rounded-xl' scrollEventThrottle={16} onScroll={(e)=>{
          const slide = Math.ceil(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
          if(slide !== activeBannerIndex){
            setActiveBannerIndex(slide);
          }
        }}>
          {BANNERS.map((banner, index) => (
            <View key={index} className=' relative w-full h-48 bg-gray-200 rounded-xl overflow-hidden' style={{ width: width - 32 }}>
              <Image source={{ uri: banner.image }} style={{ width: "100%", height: "100%" }} resizeMode='cover' />

              <View className='absolute bottom-4 left-4 z-10'>
                <Text className=' text-white text-2xl font-semibold'>{banner.title}</Text>
                <Text className=' text-white text-sm'>{banner.subtitle}</Text>
                <TouchableOpacity className=' bg-white px-3 py-1 rounded-full self-start'>
                  <Text className='text-primary font-semibold text-xs'>Get Now</Text>
                </TouchableOpacity>
                  
              </View>
              <View className='absolute inset-0 bg-black/40' />
            </View>
          ))}


        </ScrollView>
        {/* pagination dott */}
        <View className='flex-row justify-center mt-3 gap-2'>
          {BANNERS.map((_, index) => (
            <View key={index} className={`h-2 rounded-full ${index === activeBannerIndex  ? 'w-6 bg-primary' : 'w-2 bg-gray-300'}`} />
          ))}

        </View>
        </View>

        {/* Categories */}
        <View className='mb-6'>
          <View className='flex-row justify-between items-center mb-4'>
            <Text className='text-lg font-semibold text-gray-800 mb-4'>Categories</Text>
          </View>
           <ScrollView horizontal showsHorizontalScrollIndicator={false}  contentContainerStyle={{gap: 16}}>
            {categrories.map((cat: any) => (
              <CategoryItem key={cat.id} item={cat} isSelected={false} onPress={()=> router.push({pathname: '/shop', params: {category: cat.id === 'all' ? '' : cat.name}})} />
            ))}
            </ScrollView>

          </View>

          {/* Products */}

          <View className='mb-8'>
             <View className='flex-row justify-between items-center mb-4'>
              <Text className='text-xl font-bold text-primary'>Popular</Text>
               <TouchableOpacity onPress={()=> router.push('/shop')}>

              <Text className='text-secondary'>See All</Text>
               </TouchableOpacity>
             </View>

             {loading ? (
              <ActivityIndicator size={'large'} />
             ) : (
              <View className='flex-row flex-wrap justify-between'>
                {products.slice(0,4).map((product) => (
                  <ProductCard key={product._id} product={product} />
                )
              )}
              </View>
             )}
          </View>

          {/* NewsLetter Cta */}
          <View className='bg-gray-100 p-6 rounded-2xl mb-20 items-center'>
            <Text className='text-2xl font-semibold text-gray-800 mb-2 text-center'>Join The Revolution</Text>
            <Text className='text-gray-600 mb-4 text-center'>Subscribe to our newsletter and be the first to know about new products and exclusive offers!</Text>
            <TouchableOpacity className='bg-primary w-4/5 py-3 rounded-full items-center'>
              <Text className='text-white font-medium text-base'>Subscribe Now</Text>
            </TouchableOpacity>
          </View>
        
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home