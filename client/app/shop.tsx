import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Product } from "@/constants/types";
import { dummyProducts } from "@/assets/assets";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { COLORS } from "@/constants";
import ProductCard from "@/components/ProductCard";
const Shop = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  const fetchProducts = async (pageNumber = 1) => {
    if (pageNumber === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const start = (pageNumber - 1) * 10;
      const end = start + 10;
      const paginatedData = dummyProducts.slice(start, end);
      if (pageNumber === 1) {
        setProducts(paginatedData);
      } else {
        setProducts((prev) => [...prev, ...paginatedData]);
      }

      setHasMore(end < dummyProducts.length);
      setPage(pageNumber);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  React.useEffect(() => {
    fetchProducts(1);
  }, []);

  const loadMore = () => {
    if (!loadingMore && !loading && hasMore) {
      fetchProducts(page + 1);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <Header title="Shop" showBack showCart />

      <View className="flex-row gap-2 mb-3 mx-4 my-2">
        {/* Search Bar */}
        <View className="flex-1 flex-row items-center bg-white rounded-xl border border-gray-100">
          <Ionicons name="search" size={20} color="#666" className="ml-4" />
          <TextInput
            className="flex-1 ml-2 text-primary px-4 py-3"
            placeholder="Search Products...."
            returnKeyType="search"
          />
        </View>
        {/* filter icocn */}
        <TouchableOpacity className="bg-gray-800 w-12 h-12 items-center justify-center rounded-xl ">
          <Ionicons name="options-outline" size={24} color={"white"} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          numColumns={2}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          renderItem={({ item }) => <ProductCard product={item} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <View className="py-4">
                <ActivityIndicator size={"small"} color={COLORS.primary} />
              </View>
            ) : null
          }
          ListEmptyComponent={
            !loading && (
              <View className="flex-1 items-center justfiy-center py-20">
                <Text className="text-secondary">No Products Found!</Text>
              </View>
            )
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Shop;
