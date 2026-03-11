import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  Dimensions,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Product } from "@/constants/types";
import { useCart } from "@/context/cartcontext";
import { useWishlist } from "@/context/wishlist";
import { dummyProducts } from "@/assets/assets";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const { addToCart, cartItems, itemCount } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const fetchProduct = async () => {
    setProduct(dummyProducts.find((item) => item._id === id) as any);
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="font-semibold">Product not found</Text>
      </SafeAreaView>
    );
  }

  const isLiked = isInWishlist(product._id);

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      Toast.show({
        type: "info",
        text1: "Please select a size",
      });
      return;
    }
    addToCart(product, 1, selectedSize || undefined);
    Toast.show({
      type: "success",
      text1: "Added to cart",
    });
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Image Carousel */}
        <View className="relative h-[450px] bg-gray-100 mb-6">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={(e) => {
              const slide = Math.round(
                e.nativeEvent.contentOffset.x /
                  e.nativeEvent.layoutMeasurement.width,
              );
              setActiveImageIndex(slide);
            }}
          >
            {product?.images?.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={{ width: width, height: 450 }}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          {/* Header Actions */}
          <View className="absolute top-12 left-4 right-4 flex-row justify-between items-center z-10">
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2 bg-white rounded-full shadow"
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleWishlist(product)}
              className="p-2 bg-white rounded-full shadow"
            >
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={24}
                color={isLiked ? "red" : "gray"}
              />
            </TouchableOpacity>
          </View>

          {/* pagr dots */}
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center items-center space-x-2 z-10">
            {product.images?.map((_, index) => (
              <View
                key={index}
                className={`h-2 rounded-full ${index === activeImageIndex ? "bg-black" : "w-2 bg-gray-300"}`}
              />
            ))}
          </View>
        </View>

        {/* Product Info   */}
        <View className="px-5">
          <View className="flex-row font-bold text-primary flex-1 mr-4">
            <Text className="text-2xl font-bold mb-2">{product.name}</Text>

            <View className="flex-row justify-between items-start mb-2">
              <Ionicons name="star" size={14} color="gold" />
              <Text className="text-sm font-bold ml-1">4.6</Text>
              <Text className="text-sm font-bold ml-1">(85)</Text>
            </View>
          </View>

          {/* Price */}
          <Text className="text-2xl font-bold text-primary mb-6">
            $ {product.price.toFixed(2)}
          </Text>

          {/* size */}
          {product.sizes && product.sizes.length > 0 && (
            <>
              <Text className="text-base font-bold text-primary mb-3">
                Size
              </Text>
              <View className="flex-row gap-3 mb-6 flex-wrap">
                {product.sizes.map((size) => (
                  <TouchableOpacity
                    key={size}
                    onPress={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full items-center justify-center border ${selectedSize === size ? "bg-primary border-black" : "bg-white border-gray-300"}`}
                  >
                    <Text
                      className={`text-sm font-medium ${selectedSize === size ? "text-white" : "text-primary"}`}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
          {/* Desc */}
          <Text className="text-base font-bold text-primary mb-2">
            Description
          </Text>
          <Text className="text-secondary leading-6 mb-6">
            {product.description}
          </Text>
        </View>
      </ScrollView>

      {/* footer */}
      <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 flex-row justify-between items-center">
        <TouchableOpacity
          onPress={handleAddToCart}
          className="w-4/5 bg-primary py-4 rounded-full  shadow-lg flex-row justifiy-center items-center"
        >
          <Ionicons
            name="bag-outline"
            size={20}
            color="white"
            className="ml-20"
          />
          <Text className="text-white font-bold text-base ml-2">
            Add to Cart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/cart")}
          className="w-1/5 py-3 relative flex-row justifiy-center"
        >
          <Ionicons name="cart-outline" size={24} className="ml-4" />
          <View className="absolute top-2 right-6 size-4 z-10 bg-black rounded-full justify-center items-center">
            <Text className="text-white text-[10px]">{itemCount}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetails;
